process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = require("./config/config"),
    mongoose = require("./config/mongoose"),
    express = require("./config/express");

var db = mongoose(),
    app = express(); // we now have a running mongodb instance as well as express app

app.listen(config.port);
module.exports = app;
console.log(process.env.NODE_ENV + " server running at http://localhost: " + config.port);
