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

		select: function(start, offset, callback) {
			var conn = this.conn;
			conn.call("ZRANGE", this.table, start, offset, function(error, ids) {
				if (ids.length === 0) {
					return callback([]);
				}
				conn.call("MGET", ids, function(error, results) {
					callback(results.map(JSON.parse));
				});
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
