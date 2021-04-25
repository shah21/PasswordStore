import chalk from 'chalk';
import program from 'commander';
import inquirer from 'inquirer';
import app from "./commands/app";
import AuthManager from './lib/AuthManager';
import { isRequired,isEmail } from './utils/validation';


async function login(){
    try{
        const input = await inquirer.prompt([
            {
              type: 'input',
              name: 'email',
              message: chalk.green('Enter Email'),
              validate: isEmail
            },
            {
              type: 'input',
              name: 'password',
              message: chalk.green('Enter Password'),
              validate: isRequired
            },
        ]);
        const authManager = new AuthManager();
        const res = await authManager.login(input.email,input.password);
        if(res){
            console.log(chalk.yellow(res.message));
        }
        }catch(err){
            
            console.log(chalk.red(err.message));
        } 
}  

login();

program.parse(process.argv);       