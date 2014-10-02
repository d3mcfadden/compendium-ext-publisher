(function() {

	var _ = require("underscore");
	var hmac = require("./hmac_middleware");
	var Callback = require("./routes/callback");
	var render = require("./routes/render");

	var build = function(app, config) {
		var render_base = config["render-base"];

		app.get(render_base, function(req, res, next) {
			app.get("publisher").index(1, function(content_items) {
				res.render("index", {
					title: config.title || "hello world",
					content: content_items,
					url_base: render_base
				});
			});
		});

		app.get(render_base+"/:id", function(req, res, next) {
			app.get("publisher").item(req.params.id, function(item) {
				if(item === null) {
					res.status(404).send("not found :(");
				} else {
					// render the item
					res.render("item", {
						title: config.title || "hello world",
						item: item,
						url_base: render_base
					});
				}
			});
		});

		var handler = new Callback(app);
		app.post(config["events-path"], [hmac], _.bind(handler.process, handler));
	};

	module.exports = {
		build: build
	};

})();
