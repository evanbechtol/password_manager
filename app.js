var storage = require('node-persist');
storage.initSync();

var argv = require('yargs')
    .command('create', 'Create an account', function (yargs) {
        yargs.options({
            name: {
                demand: true,
                alias: 'n',
                description: 'Name of account e.g.) Facebook',
                type: 'string'
            },
            username: {
                demand: true,
                alias: 'u',
                description: 'Username that is associated with the account',
                type: 'string'
            },
            password: {
                demand: true,
                alias: 'p',
                description: 'Password that is used for the given account and username',
                type: 'string'
            }
        });
    })
    .command('get', 'Retrieve an account', function (yargs) {
        yargs.options({
            name: {
                demand: true,
                alias: 'n',
                description: 'Name of account to retrieve',
                type: 'string'
            }
        });
    })
    .help('help')
    .argv;
var command = argv._[0];

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

if (command === 'create') {
    var createdAccount = createAccount({
        name: argv.name,
        username: argv.username,
        password: argv.password
    });
    console.log('Created account: \n' + JSON.stringify(createdAccount));
} else if (command === 'get') {
    var retrievedAccount = getAccount(argv.name);

    if (typeof retrievedAccount === 'undefined') {
        console.log('Account not found with that name');
    } else {
        console.log('Account found: \n' + JSON.stringify(retrievedAccount));
    }
}