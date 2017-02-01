var config = require("./config"),
    express = require("express"),
    bodyParser = require("body-parser"),
    passport = require("passport"),
    flash = require("connect-flash"),
    session = require("express-session");

module.exports = function() {
    var app = express();

    // body-parser seems to help us interpret incoming http requests and adjusts them for req.body
    // re: http://stackoverflow.com/questions/38306569/what-does-body-parser-do-with-express-in-nodejs
    // in this case, we care about URL encoded data and JSON
    // use() mounts specified middleware at "/" path or for every request
    // needs to be called before everything else
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json());

    // the ordering of session, followed by passport's initialization is important
    // re: http://stackoverflow.com/questions/16434893/node-express-passport-req-user-undefined
    // using express-session for creating sessions
    // re: https://github.com/expressjs/session#example
    // should read more about how to store sessions, like collecting page views
    // re: https://blog.xervo.io/nodejs-and-express-sessions, http://expressjs-book.com/index.html%3Fp=128.html
    app.use(session({saveUninitialized: true, resave: true, secret: 'keyboard cat'}));

    // using passport
    app.use(passport.initialize());
    app.use(passport.session()); // for persistent login sessions
    // re: http://passportjs.org/docs

    // using connect-flash for presenting error messages
    app.use(flash());

    app.set("views", "./app/views"); // setting local variables
    app.set("view engine", "ejs");

    var routes = require("../app/routes/index.server.routes.js");
    routes(app);
    var user_routes = require("../app/routes/users.server.routes.js");
    user_routes(app);
    var exercise_routes = require("../app/routes/exercises.server.routes.js");
    exercise_routes(app);

    app.use(express.static('./public')) // serving static files
    return app;
}
