/*
    This file contains all of the methods required for encryption
    or decryption using cipher algorithms.

    Available cipher algorithms include both an encrypt and decrypt
    method.
        -AES
        -DES
        -TripleDES
        -Rabbit
        -RC4
        -RC4Drop
 */

var crypto = require('crypto-js');

var ciphers = {
    aes: {
        encrypt: function (plaintext, masterPassword) {
            return crypto.AES.encrypt(JSON.stringify(plaintext), masterPassword);
        },
        decrypt: function (cipherText, masterPassword) {
            var bytes = crypto.AES.decrypt(cipherText, masterPassword);
            return JSON.parse(bytes.toString(crypto.enc.Utf8));
        }
    },
    des: {
        encrypt: function (plaintext, masterPassword) {
            return crypto.DES.encrypt(JSON.stringify(plaintext), masterPassword);
        },
        decrypt: function (cipherText, masterPassword) {
            var bytes = crypto.DES.decrypt(cipherText, masterPassword);
            return JSON.parse(bytes.toString(crypto.enc.Utf8));
        }
    },
    tripledes: {
        encrypt: function (plaintext, masterPassword) {
            return crypto.TripleDES.encrypt(JSON.stringify(plaintext), masterPassword);
        },
        decrypt: function (plaintext, masterPassword) {
            var bytes = crypto.TripleDES.decrypt(plaintext, masterPassword);
            return JSON.parse(bytes.toString(crypto.enc.Utf8));
        }
    },
    rabbit: {
        encrypt: function (plaintext, masterPassword) {
            return crypto.Rabbit.encrypt(JSON.stringify(plaintext), masterPassword);
        },
        decrypt: function (cipherText, masterPassword) {
            var bytes = crypto.Rabbit.decrypt(cipherText, masterPassword);
            return JSON.parse(bytes.toString(crypto.enc.Utf8));
        }
    },
    rc4: {
        encrypt: function (plaintext, masterPassword) {
            return crypto.RC4.encrypt(JSON.stringify(plaintext), masterPassword);
        },
        decrypt: function (cipherText, masterPassword) {
            var bytes = crypto.RC4.decrypt(cipherText, masterPassword);
            return JSON.parse(bytes.toString(crypto.enc.Utf8));
        }
    },
    rc4Drop: {
        encrypt: function (plaintext, masterPassword) {
            return crypto.RC4Drop.encrypt(JSON.stringify(plaintext), masterPassword, { drop: 3072/4 });
        },
        decrypt: function (cipherText, masterPassword) {
            var bytes = crypto.RC4Drop.decrypt(cipherText, masterPassword, { drop: 3072/4 });
            return JSON.parse(bytes.toString(crypto.enc.Utf8));
        }
    },
    cipher: function (cipher, action, data, masterPassword) {
        cipher = cipher.toLowerCase();

        switch (cipher) {
            case 'aes':
                if (action === 'encrypt') {
                    return this.aes.encrypt(data, masterPassword);
                } else if (action === 'decrypt') {
                    return this.aes.decrypt(data, masterPassword);
                }
                break;

            case 'des':
                if (action === 'encrypt') {
                    return this.des.encrypt(data, masterPassword);
                } else if (action === 'decrypt') {
                    return this.des.decrypt(data, masterPassword);
                }
                break;

            case 'tripledes':
                if (action === 'encrypt') {
                    return this.tripledes.encrypt(data, masterPassword);
                } else if (action === 'decrypt') {
                    return this.tripledes.decrypt(data, masterPassword);
                }
                break;

            case 'rabbit':
                if (action === 'encrypt') {
                    return this.rabbit.encrypt(data, masterPassword);
                } else if (action === 'decrypt') {
                    return this.rabbit.decrypt(data, masterPassword);
                }
                break;

            case 'rc4':
                if (action === 'encrypt') {
                    return this.rc4.encrypt(data, masterPassword);
                } else if (action === 'decrypt') {
                    return this.rc4.decrypt(data, masterPassword);
                }
                break;

            case 'rc4drop':
                if (action === 'encrypt') {
                    return this.rc4Drop.encrypt(data, masterPassword);
                } else if (action === 'decrypt') {
                    return this.rc4Drop.decrypt(data, masterPassword);
                }
                break;

            default:
                return console.log('Invalid cipher method. Please use one of the following: AES, DES, TripleDES, Rabbit, RC4, RC4Drop.');
                break;
        }
    }
};

module.exports = ciphers;