(function() {

	var url = require("url");
	var _ = require("underscore");
	var _payload = require("./payload");

	var PUBLISHED_TABLE = "PUB:TAB";

	var Publiser = function(db, config) {
		this.db = db;
		this.config = config;
	};

	_.extend(Publiser.prototype, {

		process: function(payload, callback) {
			payload = _payload(payload);
			var self = this,
				content = payload.content,
				state = payload.state;

			var wrappedCallback = function(error, result) {
				if(_.isFunction(callback)) {
					callback({
						id: content.id,
						url: self._getUrl(content.id)
					});
				}
			};

			if(typeof error == "undefined") {
				switch(state) {
					case "edit":
					case "edited":
						this._edit(content, wrappedCallback);
					break;

					case "publish":
					case "published":
						this._publish(content, wrappedCallback);
					break;

					case "unpublish":
					case "unpublished":
						this._unpublish(content, wrappedCallback);
					break;

					default:
						throw "Invalid state: " + state;
				}
			}
		},

		/**
		 * read a page of published content
		 */
		index: function(page, callback) {
			page = (page < 1) ? 1 : page;
			var start = (--page)*10,
				stop = start+9;

			this.db.use(PUBLISHED_TABLE).select(start, stop, callback);
		},

		item: function(id, callback) {
			this.db.selectOne(id, callback);
		},

		/**
		 * @internal API
		 */

		_edit: function(payload, callback) {
			console.log("Edit of content with id: " + payload.id);
		},

		_publish: function(payload, callback) {
			console.log("Publishing of content with id: " + payload.id);
			this.db.use(PUBLISHED_TABLE).insert(payload.id, payload, payload.score(), callback);
		},

		_unpublish: function(payload, callback) {
			console.log("Unpublish of content with id: " + payload.id);
			this.db.use(PUBLISHED_TABLE).remove(payload.id, callback);
		},

		_getUrl: function(id) {
			var url_config = {
				protocol: "http",
				host: this.config.host + ":" + this.config.port,
				pathname: this.config["render-base"] + "/" + id
			};
			return url.format(url_config);
		}

	});

	module.exports = Publiser;
})();
