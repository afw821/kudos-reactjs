const Kudo = require("../models/Kudo.js");
const User = require("../models/User.js");

module.exports = function (app) {
    app.get('/api/users', function (req, res) {           // * A GET route that retrieves all Users from the database.
        User.find({})
            .then(function (dbusers) {
                res.json(dbusers);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    app.post('/api/users', function (req, res) {        
        User.create(req.body)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    app.get('/api/kudos', function (req, res) {
        Kudo.find({})
            .populate('to')
            .populate('from')
            .then(function (data) {                         // * A GET route that retrieves all Kudos from the database.
            res.json(data);
            })
            .catch(function (err) {
                res.json(err);
            });
    });
    app.post('/api/kudos', function (req, res) {
        const newEntry= {
            title: req.body.title,
            message: req.body.message,
            to: req.body.to,
            from: req.body.from
        }
        Kudo.create(newEntry)                              // * A POST route to handle creating new Kudos.
            .then(function (data) {
                res.json(data);
            })
            .catch(function (err) {
                res.json(err);
            });
    });
}