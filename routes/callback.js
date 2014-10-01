(function() {

	var CallbackRoute = function(app) {
		this.app = app;
	};

	CallbackRoute.prototype.process = function(req, res, next) {
		try {
			var resp = this.app.get("publisher").process(req.body);
			res.status(200).send(resp);
		} catch ( err ) {
			console.error("server error");
			console.trace();
			res.status(500).send(err);
		}
	};

	module.exports = CallbackRoute;

})();
