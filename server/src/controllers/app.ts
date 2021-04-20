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
        res.status(201).json({messge:'Success',passwords:decryptedPasswords});
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
        const password = await App.findByApp(appName);
        const decryptPass = decrypt(password.password);
        const newObj =  {...password,password:decryptPass};
        res.status(201).json({messge:'Success',password:newObj});
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
        const newPassword = new App(appName,hashedPass,Date.now());

        /* Save user to db */
        await newPassword.save();
        res.status(201).json({messge:'password stored successfully'});
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
            error.statusCode = 402;
            throw error;    
        }

        /* Delete app */
        await App.deleteByName(appName);
        res.status(201).json({messge:'Deleted Successfully!'});
    }catch(err){
         /* If no error code avaiable then assign 500 */
        if(!err.statusCode){
            err.statusCode = 500;
        }
        //Pass to custom error handler
        next(err);
    }

}