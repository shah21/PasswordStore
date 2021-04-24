/* Schema or model of User data */

import { getDb } from "../helpers/database";
import {ObjectId } from'mongodb';


export default class User{
    email:string;
    password:string;
    signedAt:number;

    constructor(email:string,password:string,signedAt:number){
        this.email = email;
        this.password = password;
        this.signedAt = signedAt;
    } 

    save(){
        return getDb().collection('users').insertOne(this);
    }

    static findByEmail(email:string){
        return getDb().collection('users').findOne({email:email});
    }


    static findById(id:string){
        return getDb().collection('users').findOne({_id:new ObjectId(id)});
    }

    static updateById(id:string,values:object){
        return getDb().collection('users').findOneAndUpdate({_id:new ObjectId(id)},{$set:values},{returnOriginal:false});
    }

    static addToken(data:object){
        return getDb().collection("tokenBlackList").insertOne(data);
    }
    
    static checkToken(accessToken:string){
        return getDb().collection("tokenBlackList").findOne({accessToken:accessToken});
    }
    
}