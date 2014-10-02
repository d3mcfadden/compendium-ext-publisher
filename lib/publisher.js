(function() {

	var _ = require("underscore");
	var _payload = require("./payload");

	var PUBLISHED_TABLE = "PUB:TAB";

	var Publiser = function(db) {
		this.db = db;
	};

	_.extend(Publiser.prototype, {

		process: function(payload, callback) {
			payload = _payload(payload);
			var content = payload.content,
				state = payload.state;

			if(typeof error == "undefined") {
				switch(state) {
					case "edit":
					case "edited":
						this._edit(content);
					break;

					case "publish":
					case "published":
						this._publish(content, function(error, results) {
							if(_.isFunction(callback)) {
								callback({
									id: content.id,
									url: "http://127.0.0.1:3000/render/" + content.id
								});
							}
						});
					break;

					case "unpublish":
					case "unpublished":
						this._unpublish(content);
					break;

					default:
						console.error("Invalid state: " + state);
						break;
				}
			}
		},

		/**
		 * read a page of published content
		 */
		index: function(page, callback) {
			page = (page < 1) ? 1 : page;
			var start = (page-1)*10;
			var offset = 10;

			this.db.use(PUBLISHED_TABLE).select(start, offset, callback);
		},

		/**
		 * @internal API
		 */

		_edit: function(payload) {
			console.log("Edit of content with id: " + payload.id);
		},

		_publish: function(payload, callback) {
			console.log("Publishing content with id: " + payload.id);
			this.db.use(PUBLISHED_TABLE).insert(payload.id, payload, payload.score(), callback);
		},

		_unpublish: function(payload) {
			console.log("Unpublish of content with id: " + payload.id);
			this.db.use(PUBLISHED_TABLE).remove(payload.id);
		}

	});

	module.exports = function(db) {
		return new Publiser(db);
	};
})();
