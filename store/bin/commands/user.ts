import chalk from 'chalk';
import inquirer from 'inquirer';
import AuthManager from '../lib/AuthManager';
import { isRequired,isEmail } from '../utils/validation';


export default {
    async login(){
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
    }  ,

    async getUser(){
        try{
            const authManager = new AuthManager();
            const data = await authManager.getUser();
            if(data){
                console.log(chalk.yellow(data.user.email));
            }
            }catch(err){
                console.log(chalk.red(err.message));
            } 
    }  
    
}