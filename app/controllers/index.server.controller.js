exports.render = function(req, res) {
    res.render('index', {
        title: "Crescendo",
        user: req.user
            ? req.user.username
            : '',
        id: req.user
            ? req.user._id
            : ''
    });
    // res.status(200).send({title: "Bonjour World!"});
};
