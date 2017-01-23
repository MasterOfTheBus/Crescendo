var config = require("./config"),
    mongoose = require("mongoose");

module.exports = function() {
    var db = mongoose.connect(config.db);
    // connect to mongodb and return db object
    require("../app/models/user.server.model");
    return db;
}
