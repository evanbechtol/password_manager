/*
    Title: Password Manager program
    Author: Evan Bechtol (ecb120030@utdallas.edu)
    Last revision date: 10/24/2016

    Steps to run:
        1) run 'npm install'  to download and install all dependencies
        2) run the program with: node app.js <command> -n <account name> -u <account user name> -p <account password> -m <encryption key>
        3) exit the program by hitting ctrl + c in terminal

    Description: This program will store encrypted accounts with their related username and password pairing, with
        AES encryption. The accounts can be retrieved by using the get command with the master password that was used
        when the account was created. If the master password does not match, the account cannot be decrypted for viewing.

    Commands:
        create: Facilitates account creation and storage. Must include the following arguments:
            --name or -n
            --username or -u
            --password or -p
            --masterPassword or -m

            usage example: node app.js create -n Facebook -u email@gmail.com -p pw123 -m secret123

        get   : Retrieves account by the account name. Must include the following arguments:
            --name or -n
            --masterPassword or -m

            usage example: node app.js get -n Facebook  -m secret123
 */

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