(function() {

	var _ = require("underscore");
	var hmac = require("./hmac_middleware");
	var callback = require("./routes/callback");

	var build = function(app, config) {

		app.get(config["render-base"]+"*", function(req, res, next) {
			app.get("publisher").read_page(1, function(content_items) {
				res.render("index", {title: "hello world", content: content_items});
			});
		});

		var handler = new callback(app);
		app.post(config["events-path"], [hmac], _.bind(handler.process, handler));
	};

	module.exports = {
		build: build
	};

})();
