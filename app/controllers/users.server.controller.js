var User = require("mongoose").model('User');

exports.create = function(req, res, next) {
    var user = new User(req.body);
    user.save(function(err) {
        if (err) {
            return next(err);
        } else {
            res.json(user); // sends a response in json form
        }
    })
}

exports.list = function(req, res, next) {
    //find() is a MongoDB call -- check mongodb docs
    User.find({}, function(err, users) {
        if (err) {
            return next(err);
        } else {
            res.json(users);
        }
    })
}

exports.read = function(req, res) {
    res.json(req.user);
}

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
}

exports.update = function(req, res, next) {
    User.findByIdAndUpdate(req.user.id, req.body, function(err, user) {
        if (err) {
            return next(err);
        } else {
            res.json(user);
        }
    })
}

exports.delete = function(req, res, next) {
    req.user.remove(function(err) {
        if (err) {
            return next(err);
        } else {
            req.json(req.user);
        }
    })
}
