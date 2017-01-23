// best practice to store env variables here
var port = 1337;
var mongoURL = 'mongodb://localhost/todos';

module.exports = {
    port: port,
    db: mongoURL
}
