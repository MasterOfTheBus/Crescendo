var users = require("../../app/controllers/users.server.controller");
var passport = require("passport");

module.exports = function(app) {
    app.route("/users").post(users.create).get(users.list); //remember: you can concatenate req to same route

    app.route("/users/:userId").get(users.read).put(users.update).delete(users.delete);

    app.route("/users/:userId/dashboard").get(users.renderDashboard);

    app.route('/users/:userId/exercises').post(users.createExercise).get(users.listExercises);

    app.route('/users/:userId/exercises/:exerciseId').get(users.readExercise).put(users.updateExercise).delete(users.deleteExercise);

    app.param("userId", users.userByID);

    app.route("/register").get(users.renderRegister).post(users.register);

    // re: http://passportjs.org/docs/overview
    app.route("/login").get(users.renderLogin).post(passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    }));

    app.get('/logout', users.logout);
}
