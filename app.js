var storage = require('node-persist');
storage.initSync();
var commands = require(__dirname + '/commands.js');

console.log('Starting password manager');

function createAccount (account) {
    var accounts = storage.getItemSync('accounts');

    if (typeof (accounts) === 'undefined') {
        accounts = [];
    }

    accounts.push(account);
    storage.setItemSync('accounts', accounts);

    return account;
}

function getAccount (accountName) {
    var accounts = storage.getItemSync('accounts');
    var matchedAccount;

    accounts.forEach(function (account) {
        if (account.name === accountName) {
            matchedAccount = account;
        }
    });

    return matchedAccount;
}

if (commands.command === 'create') {
    var createdAccount = createAccount({
        name: commands.argv.name,
        username: commands.argv.username,
        password: commands.argv.password
    });
    console.log('Created account: \n' + JSON.stringify(createdAccount));
} else if (commands.command === 'get') {
    var retrievedAccount = getAccount(commands.argv.name);

    if (typeof retrievedAccount === 'undefined') {
        console.log('Account not found with that name');
    } else {
        console.log('Account found: \n' + JSON.stringify(retrievedAccount));
    }
}