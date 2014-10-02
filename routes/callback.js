(function() {

	var CallbackRoute = function(app) {
		this.app = app;
	};

	CallbackRoute.prototype.process = function(req, res, next) {
		try {
			this.app.get("publisher").process(req.body, function(response) {
				res.status(200).send(response);
			});
		} catch (err) {
			console.trace(err);
			next();
		}
	};

	module.exports = CallbackRoute;

})();
