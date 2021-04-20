import chalk from "chalk";
import inquirer from "inquirer";
import AppManager from "../lib/AppManager";
import { isRequired } from "../utils/validation";
import Table from 'cli-table';


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
        
        const res = await AppManager.addApp(input.appName,input.appPass);
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
                const data = await AppManager.getApp(cmd.app);
                if(data){
                    apps.push(data.app)
                }
            }else{
                const data = await AppManager.getApps();
                if (data) {
                    apps = data.apps;
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
          const data = await AppManager.deleteApp(cmd.app);
          if (data) {
            console.log(chalk.yellow(data.message));
          }
        } catch (err) {
          console.log(chalk.red(err.message));
        }
    }
}