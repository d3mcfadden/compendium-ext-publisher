(function() {

	var _ = require("underscore");

	var PUBLISHED_LIST = "PUB:SET";
	var CONTENT_LIST   = "ALL:SET";

	var Publiser = function(db) {
		this.db = db;
	};

	_.extend(Publiser.prototype, {

		process: function(payload) {
			var self = this;

			this._validate_payload(payload);
			var content = payload.content;
			var state = payload.state;

			this.db.set(content.id, content, function(error, results) {
				if(typeof error == "undefined") {
					switch(state) {
						case "edit":
							self._edit(content);
							break;
						case "publish":
							self._publish(content);
							break;
						case "unpublish":
							self._unpublish(content);
							break;
					}
				}
			});
		},

		/**
		 * read a page of published content
		 */
		read_page: function(page, callback) {
			page = (page < 1) ? 1 : page;
			var start = (page-1)*10;
			var offset = 10;
			var self = this;

			this.db.zrange(PUBLISHED_LIST, start, offset, function(error, ids) {
				ids = ids.map(JSON.parse);
				self.db.mget(ids, function(error, results) {
					callback(results.map(JSON.parse));
				});
			});
		},

		_validate_payload: function(payload) {
			if(typeof payload.state != "string") {
				throw "invalid payload, no state";
			}
			if(typeof payload.content != "object") {
				throw "invalid payload";
			}
			if(typeof payload.content.id != "string") {
				throw "invalid payload: no id";
			}
		},

		/**
		 * @internal API
		 */

		_edit: function(payload) {
			console.log("publisher edit");
		},

		_publish: function(payload) {
			console.log("publisher publish");
			var self = this;
			var score = 10;

			this.db.zadd(PUBLISHED_LIST, score, payload.id, function(error, results) {
				self.db.set(payload.id, payload, function() {

				});
			});
		},

		_unpublish: function(payload) {
			console.log("publisher unpublish");
			this.db.zrem(PUBLISHED_LIST, payload.id, function(error, results) {
				console.log(results);
				console.log(error);
			});
		}

	});

	module.exports = function(db) {
		return new Publiser(db);
	};
})();
