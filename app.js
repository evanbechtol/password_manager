/*
    Title: Password Manager program
    Author: Evan Bechtol (ecb120030@utdallas.edu)
    Last revision date: 10/25/2016

    Steps to run:
        1) run 'npm install'  to download and install all dependencies
        2) run the program with: node app.js <command> -n <account name> -u <account user name> -p <account password> -m <encryption key> -c <cipher method>
        3) exit the program by hitting ctrl + c in terminal

    Description: This program will store encrypted accounts with their related username and password pairing, with
        AES encryption. The accounts can be retrieved by using the get command with the master password that was used
        when the account was created. If the master password does not match, the account cannot be decrypted for viewing.

    Special Note: The file can only have 1 encryption type at a time. In other words, you cannot create an account using AES,
        and then create  another account using DES. If you wish to use a new cipher algorithm, then you must create a new file.

    Cipher methods available:
        - AES
        - DES
        - TripleDES
        - Rabbit
        - RC4
        - RC4Drop

    Commands:
        create: Facilitates account creation and storage. Must include the following arguments:
            --name or -n
            --username or -u
            --password or -p
            --masterPassword or -m
            --cipher or -c

            usage example: node app.js create -n Facebook -u email@gmail.com -p pw123 -m secret123 -c aes

        get   : Retrieves account by the account name. Must include the following arguments:
            --name or -n
            --masterPassword or -m
            --cipher or -c
            usage example: node app.js get -n Facebook  -m secret123 -c aes

        deletes : Deletes account by the account name. Must include the following arguments:
             --name or -n
             --masterPassword or -m
             --cipher or -c
             usage example: node app.js delete -n Facebook  -m secret123 -c aes
 */

var storage = require('node-persist');
var ciphers = require(__dirname + '/util/ciphers.js');
var commands = require(__dirname + '/util/commands.js');
var _ = require('underscore');
var argv = commands.argv;

storage.initSync();
console.log('Starting password manager');
main();


function main () {
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
            if (_.size(retrievedAccount) === 0) {
                console.log('Account not found with that name');
            } else {
                printResults(retrievedAccount, 'Retrieved');
            }
        } catch (e) {
            console.log('Unable to retrieve account: \n' + e);
        }
    } else if (commands.command === 'delete') {
        try {
            var accounts = getAccount(argv.name, argv.masterPassword);
            if (_.size(accounts) === 0) {
                console.log('Account not found with that name');
            } else {
                deleteAccount(argv.name, argv.masterPassword);
            }
        } catch (e) {

        }
    } else if (commands.command === 'update') {
        try {

        } catch (e) {

        }
    }
}


function updateAccount (accountName, masterPassword, newAcct)  {
    var accounts = getAccounts(masterPassword);
    accounts.forEach(function (account) {
        if (account.name.toLowerCase() === accountName.toLowerCase()) {
            if (_.hasOwnProperty('name')) {
                account.name = newAcct
            }
            saveAccounts(accounts, masterPassword);
            printResults(account, 'Deleted');
        }
    });
}


function deleteAccount (accountName, masterPassword) {
    var accounts = getAccounts(masterPassword);
    accounts.forEach(function (account) {
        if (account.name.toLowerCase() === accountName.toLowerCase()) {
            accounts.splice(accounts.indexOf(account), 1);
            saveAccounts(accounts, masterPassword);
            printResults(account, 'Deleted');
        }
    });
}


function getAccount (accountName, masterPassword) {
    var accounts = getAccounts(masterPassword);
    var matchedAccounts = [];
    accounts.forEach(function (account) {
       if (account.name.toLowerCase() === accountName.toLowerCase()) {
           matchedAccounts.push(account);
       }
    });
    return matchedAccounts;
}


function getAccounts (masterPassword) {
    var cipherText = storage.getItemSync('accounts');
    var accounts = [];

    if (typeof cipherText !== 'undefined') {
        accounts = ciphers.cipher(argv.cipher, 'decrypt', cipherText, masterPassword);
    }
    return accounts;
}


function createAccount (account, masterPassword) {
    var accounts = getAccounts(masterPassword);

    accounts.push(account);
    saveAccounts(accounts, masterPassword);
    return account;
}


function saveAccounts (accounts, masterPassword) {
    var cipherText = ciphers.cipher(argv.cipher, 'encrypt', accounts, masterPassword);
    storage.setItemSync('accounts', cipherText.toString());
    return accounts;
}


function printResults (account, action) {
    console.log('\n-----------------\n' + action +' account\n-----------------' +
        '\nAccount name: ' + account.name +
        '\nUser name   : ' + account.username +
        '\nPassword    : ' + account.password);
}