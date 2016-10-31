var bcrypt = require('bcryptjs');
var _ = require('underscore');
var cryptojs = require('crypto-js');
var jwt = require('jsonwebtoken');

module.exports = function (sequelize, DataTypes) {
    var account = sequelize.define('account', {
        "name": {
            "type": DataTypes.STRING
            , "allowNull": false
            , "unique": true
        }
        , "username": {
            "type": DataTypes.STRING
            , "allowNull": false
            , "unique": false
        }
        , "salt": {
            "type": DataTypes.STRING
        }
        , "password_hash": {
            "type": DataTypes.STRING
        }
        , "password": {
            "type": DataTypes.VIRTUAL
            , "allowNull": false
            , "validate": {
                "len": [6, 100]
            }
            , "set": function (value) {
                var salt = bcrypt.genSaltSync(10);
                var hashedPassword = bcrypt.hashSync(value, salt);

                this.setDataValue('password', value);
                this.setDataValue('salt', salt);
                this.setDataValue('password_hash', hashedPassword);
            }
        }
    }, {
        "hooks": {
            "beforeValidate": function (user, options) {
                if (typeof user.email === 'string') {
                    user.email = user.email.toLowerCase();
                }
            }
        }
        , "instanceMethods": {
            toPublicJSON: function () {
                var json = this.toJSON();
                return _.pick(json, 'name', 'username', 'password');
            }
        }
        , "classMethods": {
            authenticate: function (body) {
                return new Promise(function (resolve, reject) {
                    if (typeof body.name === 'string' && typeof body.password === 'string') {
                        account.findOne({
                            "where": {
                                "email": body.email
                            }
                        }).then(function (user) {
                            if (_.isNull(user) || !bcrypt.compareSync(body.password, user.get('password_hash'))) {
                                return reject();
                            } else {
                                resolve(user);
                            }

                        }, function (err) {
                            reject();
                        });
                    } else {
                        return reject();
                    }
                });
            }
        }
    });

    return account;
};