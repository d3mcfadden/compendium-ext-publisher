(function() {

	var RedisClient = require("node-redis-client");
	var _ = require("underscore");

	var _callback = function() { };

	PublisherDB = function(conn) {
		this.conn = conn;
		this.table = null;
	};

	_.extend(PublisherDB.prototype, {

		use: function(table) {
			this.table = table;
			return this;
		},

		/**
		 * Insert a doc key into a sorted set, then, if succesful insert the
		 * complete document using that key
		 *
		 * @param id
		 * @param doc
		 * @param score
		 * @param callback
		 */
		insert: function(id, doc, score, callback) {
			var conn = this.conn;
			conn.call("ZADD", this.table, score, id,
						function(error, results) {
							if(!error) {
								conn.call("SET", id, JSON.stringify(doc), function() {
									if(_.isFunction(callback)) {
										callback.apply(this, arguments);
									}
								});
							}
						});
		},

		remove: function(id, callback) {
			this.conn.call("ZREM", this.table, id, (callback || function(error, results) {

			}));
		},

		update: function(id, payload) {

		},

		selectOne: function(key, callback) {
			this.conn.call("GET", key, function(error, results) {
				if(typeof results != "undefined") {
					return callback(JSON.parse(results));
				}
				throw "failure to get: " + key;
			});
		},

		/**
		 * check if key exists in set by getting its rank
		 *
		 * if member does not exist nil will be returned
		 */
		zContains: function(key, callbacks) {
			if(!_.isObject(callbacks)) {
				console.error("zContains needs callback object with yes/no keys");
				callbacks = {};
			}

			this.conn.call("ZRANK", this.table, key, function(error, results) {
				if (results === null) {
					if(_.isFunction(callbacks.no)) {
						callbacks.no(arguments);
					}
				} else {
					callbacks.yes(arguments);
				}
			});
		},

		select: function(start, stop, callback) {
			var now = (new Date()).valueOf();
			var conn = this.conn;
			conn.call("ZREVRANGEBYSCORE", this.table, now, 0, "LIMIT", start, (stop-start), function(error, ids) {
				if (ids.length === 0) {
					return callback([]);
				}

				var args = Array.prototype.concat.call("MGET", ids, function(error, results) {
					callback(results.map(JSON.parse));
				});
				conn.call.apply(conn, args);
			});
		}

	});


	module.exports = {

		PublisherDB: PublisherDB,

		redis: function(config) {
			var client = new RedisClient({
				host: config["redis-host"]
			});
			return new PublisherDB(client);
		}
	};

})();
