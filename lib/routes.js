(function() {

	var _ = require("underscore");
	var hmac = require("./hmac_middleware");
	var callback = require("./routes/callback");
	var render = require("./routes/render");

	var build = function(app, config) {

		var render_base = config["render-base"];

		app.get(render_base+"*", function(req, res, next) {
			var path = req.path;
			var index = true;
			if (index) {
				app.get("publisher").index(1, function(content_items) {
					res.render("index", {
						title: config.title || "hello world",
						content: content_items,
						url_base: render_base
					});
				});
			} else {
				// get item
			}
		});

		var handler = new callback(app);
		app.post(config["events-path"], [hmac], _.bind(handler.process, handler));
	};

	module.exports = {
		build: build
	};

})();
