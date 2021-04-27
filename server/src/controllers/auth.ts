/* Controllers/Middleware functions of auth apis */

import {Request,Response,NextFunction} from "express";
import { validationResult } from "express-validator";
import bcryptjs from "bcryptjs";
import crypto from 'crypto';
import HttpException from "../utils/HttpException";
import { generateAccessToken, generateRefreshToken, verifyAccessToken, verifyRefreshToken } from "../helpers/jwt_helper";

import User from "../models/user";



export const getUser = async (req:Request,res:Response,next:NextFunction)=>{
    const userId:string = req.userId!;
    try{
        const user = await User.findById(userId);
        if (!user) {
          const error = new HttpException("User not found");
          error.statusCode = 422;
          throw error;
        }

        const userObj = {
            _id:user._id,
            email:user.email,
            signedAt:user.signedAt,
        }

        res.status(200).json({messge:'success',user:userObj});
    }catch(err){
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }
};


/* Login user */
export const postLogin = async (req:Request,res:Response,next:NextFunction)=>{
    const email = req.body.email;
    const password = req.body.password;
    const errors = validationResult(req).array();

    try{
        /* Check if user is existed or not */
        const user = await User.findByEmail(email);
        if (!user) {
          const error = new HttpException("Incorrect Email");
          error.statusCode = 404;
          error.data =  errors;
          throw error;
        }

        /* Compare passwords are equal or not */
        const isPasswordsEqual = await bcryptjs.compare(password,user.password);
        if(!isPasswordsEqual){
            const error = new HttpException('Incorrect Password');
            error.statusCode = 401;
            error.data = errors;
            throw error;    
        }
        
        /* Create accesstoken from payload */
        const payload = {userId:user._id};
        const accessToken = await generateAccessToken(payload);
        const refreshToken = await generateRefreshToken(payload);



        res.status(200).json({message:'login successfull.',user:{accessToken:accessToken,refreshToken:refreshToken, userId:user._id}});
    }catch(err){
         /* If no error code avaiable then assign 500 */
        if(!err.statusCode){
            err.statusCode = 500;
        }
        //Pass to custom error handler
        next(err);
    }

}


/* Register user */
export const postSignup = async (req:Request,res:Response,next:NextFunction)=>{

    const email = req.body.email;
    const password = req.body.password;

    //Get errors from validator
    const errors = validationResult(req).array();


    try{
        /* Erros from express-validator */
        if(errors.length > 0){
            const error = new HttpException("Invalid data");
            error.message = errors[0].msg;
            error.statusCode = 422;
            error.data = errors;
            throw error;    
        }

        /* Hash password */
        const hashedPass = await bcryptjs.hash(password,12);
        const newUser = new User(email,hashedPass,Date.now());

        /* Save user to db */
        await newUser.save();
        res.status(201).json({messge:'user created successfully'});
    }catch(err){
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }

}

export const postLogout = async (req:Request,res:Response,next:NextFunction) => {
    const {refreshToken,accessToken} = req.body;
    
    try{
        const tokenPayload:any = await verifyAccessToken(accessToken);
        if(tokenPayload){
            const refreshPayload = await verifyRefreshToken(refreshToken);
            if(refreshPayload){
                //upload to black list token
                const data = {accessToken:accessToken,refreshToken:refreshToken,expiresIn:new Date(tokenPayload.exp *1000)};
                await User.addToken(data);
                res.json({message:'logout successfull'});
            }
        }
    }catch(err){
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);   
    }
}

export const postVerifyToken = async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const { accessToken } = req.body;

        !accessToken && new HttpException('Bad request');

        const payload:any = await verifyAccessToken(accessToken);
        
        if(payload){
            res.status(200).json({isVerified:true});
        }
    }catch(err){
        if(err.message === "Not authorized"){
            err.statusCode = 401;
        }
        else if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }
};



export const postRefreshToken = async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const { refreshToken } = req.body;

        !refreshToken && new HttpException('Bad request');
        const result:any = await verifyRefreshToken(refreshToken);
        
        const payload = {userId:result.userId};
        const accessToken = await generateAccessToken(payload);

        res.status(200).json({accessToken:accessToken});
    }catch(err){
        console.log(err);
        if(err.message === "Not authorized"){
            err.statusCode = 401;
        }else if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }
};


