var express = require('express');
var bodyparser = require("body-parser");
var config = require("./config");
var routes = require("./lib/routes");
var publisher = require("./lib/publisher");
var db = require("./lib/db");

var app = express();

app.use(bodyparser.json());

app.set('view engine', 'jade');
app.set("views", "./views");
app.set("config", config);
app.set("db", db.redis(config));
app.set("publisher", publisher(app.get("db")));

// build out all routes
routes.build(app, config);

var server = app.listen(config.port, function() {
	console.log("Listening on port %d", server.address().port);
});
