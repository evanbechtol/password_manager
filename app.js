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
            var accounts = getAccount(argv.name, argv.masterPassword);
            if (_.size(accounts) === 0) {
                console.log('Account not found with that name');
            } else {
                var account = updateAccount(argv.name, argv.masterPassword, argv.password);
                printResults(account, 'Updated');
            }
        } catch (e) {

        }
    }
}


function updateAccount (accountName, masterPassword, newPassword)  {
    var accounts = getAccounts(masterPassword);
    var updatedAccount = undefined;
    accounts.forEach(function (account) {
        if (account.name.toLowerCase() === accountName.toLowerCase()) {
            account.password = newPassword;
            saveAccounts(accounts, masterPassword);
            updatedAccount = account;
        }
    });
    return updatedAccount;
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
           matchedAccounts = account;
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