var bcrypt = require('bcryptjs');
var _ = require('underscore');
var cryptojs = require('crypto-js');
var jwt = require('jsonwebtoken');

module.exports = function (sequlize, DataTypes) {
    var user = sequlize.define('user', {
        "email": {
            "type": DataTypes.STRING
            , "allowNull": false
            , "unique": true
            , "validate": {
                "isEmail": true
            }
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
                "len": [7, 100]
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
                return _.pick(json, 'id', 'email', 'createdAt', 'updatedAt');
            }
            , "generateToken": function (type) {
                if (_.isString(type)) {
                    try {
                        var stringData = JSON.stringify({
                            "id": this.get('id')
                            , "type": type
                        });
                        var encryptedData = cryptojs.AES.encrypt(stringData, 'abc123!@#$').toString();
                        var token = jwt.sign({
                            "token": encryptedData
                        }, 'qwerty098');
                        return token;
                    } catch (err) {
                        return undefined;
                    }
                } else {
                    return undefined;
                }
            }
        }
        , "classMethods": {
            authenticate: function (body) {
                return new Promise(function (resolve, reject) {
                    if (typeof body.email === 'string' && typeof body.password === 'string') {
                        user.findOne({
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
            , findByToken: function (token) {
                return new Promise(function (resolve, reject) {
                    try {
                        // Make sure the token is valid
                        var decodedJWT = jwt.verify(token, 'qwerty098');
                        // Create the byte string
                        var bytes = cryptojs.AES.decrypt(decodedJWT.token, 'abc123!@#$');
                        // Get the JSON object
                        var tokenData = JSON.parse(bytes.toString(cryptojs.enc.Utf8));

                        user.findById(tokenData.id).then(function (user) {
                            if (!_.isNull(user)) {
                                resolve(user);
                            } else {
                                reject();
                            }
                        }, function (err) {

                        });
                    } catch (err) {
                        reject();
                    }
                });
            }
        }
    });

    return user;
};