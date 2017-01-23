var express = require("express");
module.exports = function() {
    var app = express();
    app.set("views", "./app/views"); // setting local variables
    app.set("view engine", "ejs");
    var routes = require("../app/routes/index.server.routes.js");
    routes(app);
    app.use(express.static('./public')) // serving static files
    return app;
}
