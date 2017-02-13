// 'mongoose' is the MongoDB object modeling tool (http://mongoosejs.com/docs/2.7.x/index.html)
// 'crypto' allows us to create password hash (https://nodejs.org/api/crypto.html#crypto_crypto)
// we need the mongoose.Schema object to create our own schema objects => inheritance pattern.

var mongoose = require("mongoose"),
    crypto = require("crypto"),
    Schema = mongoose.Schema;

// Define schema for User model
// re: http://mongoosejs.com/docs/2.7.x/docs/schematypes.html
var UserSchema = new Schema({
    name: String,
    email: {
        type: String,
        index: true
    },
    username: {
        type: String,
        trim: true,
        unique: true
    },
    exercises: {},
    password: String,
    provider: String,
    providerId: String,
    providerData: {},
    todos: {} // will be used in next tutorial to store todos
});

/*
  Mongoose has pre and post middlewares
  We can hash passwords before we save them!
*/
UserSchema.pre('save', function(next) {
    if (this.password) {

        /*
        we don't want to save passwords in plain text, so we use md5 algorithm
        to generate a hash, then update the hash with our sensitive data,
        then calculates the digest in 'hex' encoding among other encodings ('latin1', 'base64')
        re: https://nodejs.org/api/crypto.html#crypto_hash_update_data_input_encoding
        */

        var md5 = crypto.createHash('md5');
        this.password = md5.update(this.password).digest('hex');
    }
    next();
});

/*
  You can define methods for your schema objects like below
  re: http://mongoosejs.com/docs/2.7.x/docs/methods-statics.html
  this.password: stored password with md5 hash and hex encoding
  password: user input that needs authentication
*/
UserSchema.methods.authenticate = function(password) {
    var md5 = crypto.createHash('md5');
    md5 = md5.update(password).digest('hex');
    return this.password == md5;
}

/*
  Statics are pretty much the same as methods
  but allow for defining functions that exist directly on your Model.
  I think we are writing an outer method for pre-existing findUniqueUsername()
  to handle args before actually calling it inside.
  I don't know what these callback funcs are supposed to do..
*/
UserSchema.statics.findUniqueUsername = function(username, suffix, callback) {
    var _this = this;
    var possibleUsername = username + (suffix || '');

    _this.findOne({
        username: possibleUsername
    }, function(err, user) {
        if (!err) {
            if (!user) {
                // no username taken!
                callback(possibleUsername);
            } else {
                // username taken; find new username with appended suffix
                return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
            }
        } else {
            callback(null);
        }
    });

}
mongoose.model('User', UserSchema);
