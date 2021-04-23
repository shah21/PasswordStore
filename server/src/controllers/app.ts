/* Controllers/Middleware functions of passwords apis */

import {Request,Response,NextFunction} from "express";
import { validationResult } from "express-validator";

import { encrypt,decrypt } from "../helpers/crypto_lib";
import HttpException from "../utils/HttpException";
import App from "../models/app";


/* Get all passs */
export const getApps = async (req:Request,res:Response,next:NextFunction)=>{

    try{
        /* Decrypt passwords */
        const passwords = await App.getAll();
        const decryptedPasswords = passwords.map((password:App)=>{
            const decryptPass = decrypt(password.password);
            return {...password,password:decryptPass};
        })
        res.status(201).json({message:'Success',apps:decryptedPasswords});
    }catch(err){
         /* If no error code avaiable then assign 500 */
        if(!err.statusCode){
            err.statusCode = 500;
        }
        //Pass to custom error handler
        next(err);
    }

}

/* Hash new Pass */
export const getApp = async (req:Request,res:Response,next:NextFunction)=>{
    const appName = req.params.appName;

    try{
        /* Decrypt password */
        const app = await App.findByApp(appName);
        if(!app){
            const error = new HttpException('App not found');
            error.statusCode = 404;
            throw error;    
        }
        const decryptPass = decrypt(app.password);
        const newObj =  {...app,password:decryptPass};
        res.status(201).json({message:'Success',app:newObj});
    }catch(err){
         /* If no error code avaiable then assign 500 */
        if(!err.statusCode){
            err.statusCode = 500;
        }
        //Pass to custom error handler
        next(err);
    }

}


/* Hash new Pass */
export const postCreatApp = async (req:Request,res:Response,next:NextFunction)=>{
    const appName = req.body.app;
    const password = req.body.password;
    const errors = validationResult(req).array();

    try{
        if(errors.length > 0){
            const error = new HttpException("Invalid data");
            error.message = errors[0].msg;
            error.statusCode = 422;
            error.data = errors;
            throw error;    
        }
        /* Hash password */
        const hashedPass = await encrypt(password);
        const newPassword = new App(appName,hashedPass,Date.now(),null!);

        /* Save user to db */
        await newPassword.save();
        res.status(201).json({message:'App added successfully'});
    }catch(err){
         /* If no error code avaiable then assign 500 */
        if(!err.statusCode){
            err.statusCode = 500;
        }
        //Pass to custom error handler
        next(err);
    }

}

/* Hash new Pass */
export const deleteApp = async (req:Request,res:Response,next:NextFunction)=>{
    const appName = req.params.appName;

    try{
        const app = await App.findByApp(appName);
        
        if(!app){
            const error = new HttpException('App not found');
            error.statusCode = 404;
            throw error;    
        }

        /* Delete app */
        await App.deleteByName(appName);
        res.status(201).json({message:'Deleted Successfully!'});
    }catch(err){
         /* If no error code avaiable then assign 500 */
        if(!err.statusCode){
            err.statusCode = 500;
        }
        //Pass to custom error handler
        next(err);
    }

}

interface PassType  {
    iv: string,
    content: string
};


/* Update Pass */
export const updateApp = async (req:Request,res:Response,next:NextFunction)=>{
    const appName = req.params.appName;
    const newName = req.body.app;
    const password = req.body.password;
    const errors = validationResult(req).array();

    try{
        if(errors.length > 0){
            const error = new HttpException("Invalid data");
            error.message = errors[0].msg;
            error.statusCode = 422;
            error.data = errors;
            throw error;    
        }

        const app = await App.findByApp(appName);
        if(!app){
            const error = new HttpException('App not found');
            error.statusCode = 404;
            throw error;    
        }

        const values:{app?:string,password?:PassType,updatedAt?:number}={};

        /* Create values obj with changed values  */
        if(newName !== ''){
            values.app = newName;
        }
        if(password !== null){
            const hashedPass = await encrypt(password);
            values['password'] = hashedPass;
        }
        values['updatedAt'] = Date.now();
        

        const updatedValues = await App.updateByName(appName,values);
        const decryptPass = decrypt(updatedValues.value.password);
        const newObj =  {...updatedValues.value,password:decryptPass};
        res.status(200).json({message:'Updated successfully!',user:newObj});
    }catch(err){
         /* If no error code avaiable then assign 500 */
         console.log(err);
        if(!err.statusCode){
            err.statusCode = 500;
        }
        //Pass to custom error handler
        next(err);
    }

}
