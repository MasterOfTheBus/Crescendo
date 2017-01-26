var passport = require("passport"),
    mongoose = require("mongoose");

module.exports = function() {
    var User = mongoose.model("User");

    // for handling user serialization
    // when user authenticated, save its id
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // when user obj needed, use id to find and return all fields exc. password
    passport.deserializeUser(function(id, done) {
        User.findOne({
            _id: id
        }, "-password", function(err, user) {
            done(err, user);
        });

    });

    require("./strategies/local.js")();
}
