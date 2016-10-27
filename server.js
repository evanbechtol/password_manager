/**
 * Created by eevabec on 9/12/2016.
 */
const PORT = process.env.PORT || 3000;
var express = require('express');
var db = require('./server/db.js');
var path = require('path');
var bodyParser = require('body-parser');
var _ = require('underscore');
var extend = require('extend');
var middleware = require(__dirname + '/server/middleware.js')(db);
var app = express();

app.use(express.static(path.join(__dirname, 'client')));
app.use(bodyParser.json());
//require(__dirname + '/server/routes.js')(app, _, middleware, db, bodyParser);

app.get('/', function (req, res) {
    res.sendFile('index.html', {root: __dirname});
});

/* POST users */
app.post('/users', function (req, res) {
    var body = _.pick(req.body, 'email', 'password');
    console.log(body);
    db.user.create(body).then(function (user) {
        res.json(user.toPublicJSON());
    }).catch(function (err) {
        res.status(400).json(err);
    });
});

/* POST login users */
app.post('/users/login', function (req, res) {
    var body = _.pick(req.body, 'email', 'password');
    db.user.authenticate(body).then(function(user) {
        var token = user.generateToken('authentication');
        console.log(token);
        if (!_.isNull(token)) {
            res.header('Auth', token).json(user.toPublicJSON());
        } else {
            res.status(401).send('Null token');
        }

    }, function (err) {
        console.log('error: ' + err);
        res.status(401).send(err);
    });
});

app.listen(PORT, function () {
    console.log('Express listening on port: ' + PORT);
    db.sequelize.sync().then(function () {
        console.log('Database synced');
    });
});