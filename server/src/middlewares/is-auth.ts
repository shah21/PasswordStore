import jwt from 'jsonwebtoken'
import { Request,Response,NextFunction } from "express";
import HttpException from '../utils/HttpException';
import User from '../models/user';


interface MyToken {
    userId: string;
    email: string;
    // whatever else is in the JWT.
  }

export default async (req:any,res:Response,next:NextFunction) => {
    
    let decodedToken:MyToken;
    try{
        const headers = req.get('Authorization');
        if(!headers){
            const error = new HttpException('Not authenticated')
            error.statusCode = 401;
            throw error;
        }
        const token = headers.split(' ')[1];

        const isAvailable = await User.checkToken(token);
        if (isAvailable) {
          const error = new HttpException("Not authorized");
          error.statusCode = 401;
          throw error;
        }
        
        const secret_key = process.env.JWT_SECRET_KEY;
        decodedToken = jwt.verify(token,secret_key as string) as MyToken;
        req.userId = decodedToken.userId;
        next();

    }catch(err){
        err.message = "Token is not valid"
        err.statusCode = 401;
        next(err);
    }

    
}
   
