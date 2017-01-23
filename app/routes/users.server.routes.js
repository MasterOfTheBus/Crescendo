var users = require("../../app/controllers/users.server.controller");

module.exports = function(app) {
    app.route("/users").post(users.create).get(users.list); //remember: you can concatenate req to same route

    app.route("/users/:userId").get(users.read).put(users.update).delete(users.delete);

    app.param("userId", users.userByID);
}
