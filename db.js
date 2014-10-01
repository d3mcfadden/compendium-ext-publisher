(function() {

	var RedisClient = require("node-redis-client");

	var RedisWrapper = function(redis) {
		this.redis = redis;
	};

	RedisWrapper.prototype.get = function(id, callback) {
		this.redis.call("GET", id, function(error, results) {
			callback(error, JSON.parse(results));
		});
	};

	RedisWrapper.prototype.mget = function(ids, callback) {
		this.redis.call("MGET", ids, callback);
	};

	RedisWrapper.prototype.set = function(key, val, callback) {
		this.redis.call("SET", key, JSON.stringify(val), callback);
	};

	RedisWrapper.prototype.zadd = function(key, score, member, callback) {
		this.redis.call("ZADD", key, score, JSON.stringify(member), callback);
	};

	RedisWrapper.prototype.zrem = function(key, member, callback) {
		this.redis.call("ZREM", key, member, callback);
	};

	RedisWrapper.prototype.zrange = function(key, start, end, callback) {
		this.redis.call("ZRANGE", key, start, end, callback);
	};

	RedisWrapper.prototype._call = function() {
		this.redis.call.apply(this, arguments);
	};

	module.exports = {
		redis: function(config) {
			var client = new RedisClient({
				host: config["redis-host"]
			});
			return new RedisWrapper(client);
		}
	};

})();
