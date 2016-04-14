// set up
var bodyParser = require('body-parser');
var express = require('express');
var mongoose = require('mongoose');
var database = require('./config/database');
var app = express();
var port = process.env.PORT || 8080;

// config
mongoose.connect(database.url);
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// routes
require('./app/routes.js')(app);

// listen
app.listen(port);
console.log("App listening on port " + port);
