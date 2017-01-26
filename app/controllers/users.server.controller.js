var User = require("mongoose").model('User'),
    passport = require("passport");

var getErrorMessage = function(err) {
    var msg = '';
    if (err.code) {
        switch (err.code) {
                // highly suspect these codes are deprecated for 2.6 and after,  but if not:
                // re: http://search.cpan.org/dist/MongoDB/lib/MongoDB/Error.pm#ERROR_CODES
            case 11000:
            case 11001:
                msg = "Username already exists";
                break;
            default:
                msg = "Something went horribly wrong!";
        }
    } else {
        for (var errName in err.errors) {
            if (err.errors[errName].message) {
                msg = err.errors[errName].message;
            }
        }
    }
    return msg;
};

exports.renderLogin = function(req, res, next) {
    // I think you check for req.user because once the user logs in,
    // the cookie session is created and every request contains req.user property
    if (!req.user) {
        // recall: render() renders a view, sends HTML string to client
        // 'login' corresponds to login.ejs
        res.render("login", {
            title: "Login Form",
            //The Connect-Flash module stores temporary messages in a session object called flash.
            // Messages stored in the flash object will be cleared once they are presented to the user.
            messages: req.flash("error") || req.flash("info")
        });
    } else {
        return res.redirect("/");
    }
};

exports.renderRegister = function(req, res, next) {
    if (!req.user) {
        res.render("register", {
            title: "Register Form",
            messages: req.flash("error")
        })
    } else {
        return res.redirect("/");
    }
};

// we attempt to register into mongodb, but may encounter errors, else you login
exports.register = function(req, res, next) {
    if (!req.user) {
        var user = new User(req.body);
        var message = null;
        user.provider = "local";
        user.save(function(err) {
            if (err) {
                var message = getErrorMessage(err);
                req.flash("error", message);
                return res.redirect("/register");
            }

            // this login() method is exposed by Passport, not Express
            // passport.authenticate() invokes req.login automatically,
            // but this is called manually for newly-registered users
            req.login(user, function(err) {
                if (err) {
                    return next(err);
                }
                return res.redirect("/");
            });
        });
    } else {
        return res.redirect("/");
    }
}

exports.logout = function(req, res, next) {
    req.logout(); // parallels with req.login() in Passport module
    res.redirect("/");
}

// write methods for CRUD actions and return json format for each req
exports.create = function(req, res, next) {
    var user = new User(req.body);
    user.save(function(err) {
        if (err) {
            return next(err);
        } else {
            res.json(user); // sends a response in json form
        }
    })
};

exports.list = function(req, res, next) {
    //find() is a MongoDB call -- check mongodb docs
    User.find({}, function(err, users) {
        if (err) {
            return next(err);
        } else {
            res.json(users);
        }
    })
};

exports.read = function(req, res) {
    res.json(req.user);
};

exports.userByID = function(req, res, next, id) {
    // re: https://expressjs.com/en/api.html#app.param
    User.findOne({
        _id: id
    }, function(err, user) {
        if (err) {
            return next(err);
        } else {
            req.user = user;
            next();
        }
    })
};

exports.update = function(req, res, next) {
    User.findByIdAndUpdate(req.user.id, req.body, function(err, user) {
        if (err) {
            return next(err);
        } else {
            res.json(user);
        }
    })
};

exports.delete = function(req, res, next) {
    req.user.remove(function(err) {
        if (err) {
            return next(err);
        } else {
            req.json(req.user);
        }
    })
};
