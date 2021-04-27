import program from 'commander';
import user from "./commands/user";


program
    .command('login')
    .description('Add new app to Password Store')
    .action(user.login);


program
    .command('stats')
    .description('Get current user details')
    .action(user.getUser);    




program.parse(process.argv);       