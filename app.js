var express = require('express');
var bodyparser = require("body-parser");
var config = require("./config");
var routes = require("./routes");
var publisher = require("./publisher");
var db = require("./db");

var app = express();
var redis = db.redis(config);
app.use(bodyparser.json());
app.set("config", config);
app.set("publisher", publisher(redis));
app.set("db", redis);

// build out all routes
routes.build(app, config);

var server = app.listen(config.port, function() {
	console.log("Listening on port %d", server.address().port);
});
