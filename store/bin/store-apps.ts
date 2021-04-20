import program from 'commander';
import app from "./commands/app";

program
    .command('add')
    .description('Add new app to Password Store')
    .action(app.add);

program
    .command('show')
    .description('Get all apps from Password Store')
    .option(
        '--app <name>',
        'Get specific app'
    )
    .action(cmd=> app.getApps(cmd));   

program
    .command('delete')
    .description('Delete specific app from Password Store')
    .option(
        '--app <name>',
        'Delete specific app'
    )
    .action(cmd=> app.deleteApp(cmd));       


program.parse(process.argv);       