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
            },
            masterPassword: {
                demand: true,
                alias: 'm',
                description: 'Master password user to create accounts for user',
                type: 'string'
            },
            cipher: {
                demand: true,
                alias: 'c',
                description: 'Cipher method for encryption: AES, DES, TripleDES, Rabbit, RC4, RC4Drop. The cipher method chosen will be used for decryption.',
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
            },
            masterPassword: {
                demand: true,
                alias: 'm',
                description: 'Master password user to create accounts for user',
                type: 'string'
            },
            cipher: {
                demand: true,
                alias: 'c',
                description: 'Cipher method for encryption: AES, DES, TripleDES, Rabbit, RC4, RC4Drop. Cipher type must match the type that was used for encryption',
                type: 'string'
            }
        });
    })
    .command('delete', 'Remove an account', function (yargs) {
        yargs.options({
            name: {
                demand: true,
                alias: 'n',
                description: 'Name of account to retrieve',
                type: 'string'
            },
            masterPassword: {
                demand: true,
                alias: 'm',
                description: 'Master password user to create accounts for user',
                type: 'string'
            },
            cipher: {
                demand: true,
                alias: 'c',
                description: 'Cipher method for encryption: AES, DES, TripleDES, Rabbit, RC4, RC4Drop. Cipher type must match the type that was used for encryption',
                type: 'string'
            }
        });
    })
    .help('help')
    .argv;
var command = argv._[0];

module.exports = {
    argv: argv,
    command: command
};