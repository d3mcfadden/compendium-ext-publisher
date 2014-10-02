(function() {

	/**
	 * HMAC validation middleware
	 */
	var hmac_validator = function(req, res, next) {
		var hmac = req.headers["request-signature"];
		if(typeof hmac === "undefined" || hmac === null || hmac.length === 0) {
			res.status(400).send('No Request Signature!');
			return;
		}

		// TODO: actually validate the HMAC
		next();
	};

	module.exports = hmac_validator;

})();
