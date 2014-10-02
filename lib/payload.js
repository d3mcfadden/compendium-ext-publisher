(function() {

	var _ = require("underscore");

	module.exports = function(payload) {
		if (!_.isObject(payload)) {
			throw "invalid payload";
		}
		if(!_.isString(payload.state)) {
			throw "invalid payload, no state";
		}
		if(!_.isObject(payload.content)) {
			throw "invalid payload";
		}
		if(!_.isString(payload.content.id)) {
			throw "invalid payload: no id";
		}

		/**
		 * compute a score (for ordering purposes) based on the content publish date
		 */
		payload.content.score = function() {
			var publish_date = this.publish_date;
			if (publish_date !== null) {
				var epoch = Date.parse(publish_date);
				if(!_.isNaN(epoch)) {
					return epoch;
				}
			}
			return 0;
		};

		return payload;
	};

})();
