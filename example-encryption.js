var crypto = require('crypto-js');

var data = {
    name: 'John Doe',
    username: 'jdoe123',
    password: 'pw123'
};
var key = '123abc';

/*
    Data is an object. we must convert it to a string
    before we can generate the ciphertext.
 */
var plaintxt = JSON.stringify(data);
var ciphertxt = crypto.AES.encrypt(plaintxt, key);
console.log('Encrypted: ' + ciphertxt);

/*
    Because the decryption process returns a byte string,
    we first store the bytes, and then encode as UTF-8.
 */
var encoding = crypto.enc.Utf8;
var bytes = crypto.AES.decrypt(ciphertxt, key).toString(encoding);
//var decrypted = bytes.toString(encoding);

/*
    Data was originally stored as JSON, be sure to
    convert it back to JSON for application use.
 */
var decryptedObj = JSON.parse(bytes);
console.log('\nDecrypted: ' + JSON.stringify(decryptedObj));
