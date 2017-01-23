exports.render = function(req, res) {
    res.render('index', {title: "Bonjour World!"})
    // res.status(200).send({title: "Bonjour World!"});
}
