exports.render = function(req, res) {
    res.render('index', {
        title: "Crescendo",
        user: req.user
            ? req.user.username
            : ''
    });
    // res.status(200).send({title: "Bonjour World!"});
};
