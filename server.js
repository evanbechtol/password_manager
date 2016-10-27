/**
 * Created by eevabec on 9/12/2016.
 */
const PORT = process.env.PORT || 3000;
var express = require('express');
//var db = require('./server/db.js');
var path = require('path');
var bodyParser = require('body-parser');
var _ = require('underscore');
var extend = require('extend');
//var middleware = require(__dirname + '/server/middleware.js')(db);
var app = express();

app.use(express.static(path.join(__dirname, 'client')));
app.use(bodyParser.json());
//require(__dirname + '/server/routes.js')(app, _, middleware, db, bodyParser);

app.get('/', function (req, res) {
    res.sendFile('index.html', {root: __dirname});
});

app.listen(PORT, function () {
    console.log('Express listening on port: ' + PORT);
    /*  db.sequelize.sync().then(function () {

     });*/
});