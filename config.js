var _ = require("underscore");

var config = {
	"host" : "127.0.0.1",
	"port": 3000,
	"render-base": "/render",
	"events-path": "/callback",
	"redis-host": "127.0.0.1"
};

var CLIArgs = function(argv) {
	var self = this;
	this.argv = argv;
	this.args = {};

	var valid_args = Object.keys(config).map(function(arg) {
		return "--" + arg;
	});

	this.argv.forEach(function(arg, index) {
		var split = arg.split("=");
		var key = split[0];
		var val = split[1];

		if (valid_args.indexOf(key) > -1) {
			key = key.replace(/^--/, "");
			self.args[key] = val;
		}
	});
};

CLIArgs.prototype.get = function() {
	return this.args;
};

var cli = new CLIArgs(process.argv.slice(2));
module.exports = _.extend(config, cli.get());
