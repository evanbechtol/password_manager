var argv = require('yargs')
    .command('hello', 'Greets the user', function (yargs) {
        yargs.options({
            name: {
                demand: true,
                alias: 'n',
                description: 'Your first name',
                type: 'string'
            },
            lastname: {
                demand: true,
                alias: 'l',
                description: 'Your last name',
                type: 'string'
            }
        });
    })
    .help('help')
    .argv;
var command = argv._[0];
console.log(argv);



if (argv._[0] === 'hello') {
    console.log('hello world');
}