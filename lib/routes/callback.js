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
			res.status(400).send({error: err});
		}
	};

	module.exports = CallbackRoute;

})();
