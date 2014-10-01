(function() {

	var _ = require("underscore");
	var hmac = require("./hmac_middleware");
	var callback = require("./routes/callback");

	var build = function(app, config) {

		app.get(config["render-base"]+"*", function(req, res, next) {
			app.get("publisher").readPage(1, function(error, results) {
				var content_ids = results.map(function(id) {
					return JSON.parse(id);
				});
				app.get("db").mget(content_ids, function(error, results) {
					res.send(results);
				});
			});
		});

		var handler = new callback(app);
		app.post(config["events-path"], [hmac], _.bind(handler.process, handler));
	};

	module.exports = {
		build: build
	};

})();
