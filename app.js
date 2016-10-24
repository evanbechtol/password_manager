var storage = require('node-persist');
var crypto = require('crypto-js');
var _ = require('underscore');
var commands = require(__dirname + '/commands.js');
var argv = commands.argv;

storage.initSync();
console.log('Starting password manager');


if (commands.command === 'create') {
    try {
        var account = {
            name: argv.name,
            username: argv.username,
            password: argv.password
        };
        var createdAccount = createAccount(account, argv.masterPassword);
        printResults(createdAccount, 'Created');
    } catch (e) {
        console.log('Unable to create account: ' + e);
    }


} else if (commands.command === 'get') {
    try {
        var retrievedAccount = getAccount(argv.name, argv.masterPassword);

        if (typeof retrievedAccount === 'undefined') {
            console.log('Account not found with that name');
        } else {
            printResults(retrievedAccount, 'Retrieved');
        }
    } catch (e) {
        console.log('Unable to retrieve account: \n' + e);
    }
}


function getAccounts (masterPassword) {
    var cipherText = storage.getItemSync('accounts');
    var accounts = [];

    if (typeof cipherText !== 'undefined') {
        var bytes = crypto.AES.decrypt(cipherText, masterPassword);
        accounts = JSON.parse(bytes.toString(crypto.enc.Utf8));
    }
    return accounts;
}


function saveAccounts (accounts, masterPassword) {
    var cipherText = crypto.AES
        .encrypt(JSON.stringify(accounts), masterPassword);
    storage.setItemSync('accounts', cipherText.toString());
    return accounts;
}


function createAccount (account, masterPassword) {
    var accounts = getAccounts(masterPassword);

    accounts.push(account);
    saveAccounts(accounts, masterPassword);
    return account;
}


function getAccount (accountName, masterPassword) {
    var accounts = getAccounts(masterPassword);
    return _.findWhere(accounts, {name: accountName});
}


function printResults (account, action) {
    console.log('\n-----------------\n' + action +' account\n-----------------' +
        '\nAccount name: ' + account.name +
        '\nUser name   : ' + account.username +
        '\nPassword    : ' + account.password);
}