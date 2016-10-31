/**
 * Created by eevabec on 9/12/2016.
 */
var Sequelize = require('sequelize');
var env = process.env.NODE_ENV || 'development';

if (env === 'production') {
    sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres'
    });

    sequelize.authenticate().then(function () {
        console.log('Connected to database');
    }).catch(function (err) {
        console.log('Unable to connect to the Database:', err);
    });
} else {
    sequelize = new Sequelize(undefined, undefined, undefined, {
        dialect: 'sqlite'
        , storage: __dirname + '/data/pwmgr.sqlite'
    });
}

var db = {};

/* Models */
db.user = sequelize.import(__dirname + '/models/user.js');
db.account = sequelize.import(__dirname + '/models/account.js');
db.user.hasMany(db.account);

db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;
