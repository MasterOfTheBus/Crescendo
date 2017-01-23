var config = require("./config"),
    express = require("express"),
    bodyParser = require("body-parser");

module.exports = function() {
    var app = express();

    // body-parser seems to help us interpret incoming http requests and adjusts them for req.body
    // re: http://stackoverflow.com/questions/38306569/what-does-body-parser-do-with-express-in-nodejs
    // in this case, we care about URL encoded data and JSON
    // use() mounts specified middleware at "/" path or for every request
    app.use(bodyParser.urlencoded({extended: true}))

    app.use(bodyParser.json());

    app.set("views", "./app/views"); // setting local variables
    app.set("view engine", "ejs");

    var routes = require("../app/routes/index.server.routes.js");
    routes(app);
    var user_routes = require("../app/routes/users.server.routes.js");
    user_routes(app);

    app.use(express.static('./public')) // serving static files
    return app;
}
