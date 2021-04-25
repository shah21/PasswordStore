import chalk from "chalk";
import inquirer from "inquirer";
import AppManager from "../lib/AppManager";
import { isRequired } from "../utils/validation";
import Table from 'cli-table';

const appManager = new AppManager();

export default {
    async add(){

        try{
        const input = await inquirer.prompt([
            {
              type: 'input',
              name: 'appName',
              message: chalk.green('Enter App name'),
              validate: isRequired
            },
            {
              type: 'input',
              name: 'appPass',
              message: chalk.green('Enter App password'),
              validate: isRequired
            },
        ]);
        
        const res = await appManager.addApp({app:input.appName,password:input.appPass});
        if(res){
            console.log(chalk.yellow(res.message));
        }
        }catch(err){
            
            console.log(chalk.red(err.message));
        }
    },

    async getApps(cmd:any){
        try {
            let apps = [];
            if(cmd && cmd.app){
                const data = await appManager.getApp(cmd.app);
                if(data){
                    apps.push(data.app)
                }
            }else{
                const resApps = await appManager.getApps();
                if (resApps) {
                    apps = resApps;
                }
            }  

            const table = new Table({
                head:[chalk.yellow('App'),chalk.yellow('Password')],
                colWidths:[30,30]
            });

            apps.forEach((app:any) => {
                table.push([chalk.cyan(app.app),app.password]);
            });

            console.log(table.toString());
        } catch (err) {
          console.log(chalk.red(err.message));
        }
    },

    async deleteApp(cmd:any){
        try {
          if (!cmd || !cmd.app) {
            console.log(`${chalk.red('Specify app name!')}  ${chalk.yellow('example \'store apps delete --app=fb\'')}`);
            return;
          }
          const data = await appManager.deleteApp(cmd.app);
          if (data) {
            console.log(chalk.yellow(data.message));
          }
        } catch (err) {
          console.log(chalk.red(err.message));
        }
    },

    async updateApp(cmd:any){
      try {
        if (!cmd || !cmd.app) {
          console.log(`${chalk.red('Specify app name!')}  ${chalk.yellow('example \'store apps delete --app=fb\'')}`);
          return;
        }

        const input = await inquirer.prompt([
          {
            type: 'input',
            name: 'appName',
            message: chalk.green('Enter New App name'),
          },
          {
            type: 'input',
            name: 'appPass',
            message: chalk.green('Enter New App password'),
          },
      ]);

        if (input.appName || input.appPass) {
          const data = await appManager.updateApp(cmd.app, {
            app: input.appName ? input.appName : undefined!,
            password: input.appPass ? input.appPass : undefined!,
          });
          if (data) {
            console.log(chalk.yellow(data.message));
          }
        }else{
          console.log(chalk.redBright('Please fill either one or more fields for updation!'));
        }
      } catch (err) {
        console.log(chalk.red(err.message));
      }
  }
}