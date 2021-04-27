/* Schema or model of User data */

import { getDb } from "../helpers/database";
import {ObjectId } from'mongodb';


interface PassType  {
    iv: string,
    content: string
};


export default class Password{
    app:string;
    password:PassType;
    addedAt:number;
    userId:ObjectId;
    updatedAt:number;

    constructor(app:string,password:PassType,addedAt:number,updatedAt:number,userId:string){
        this.password = password;
        this.addedAt = addedAt;
        this.updatedAt = updatedAt;
        this.userId = new ObjectId(userId);
        this.app = app;
    } 

    save(){
        return getDb().collection('passwords').insertOne(this);
    }

    static getAll(uid:string){
        return getDb().collection('passwords').find({userId:new ObjectId(uid)}).toArray();
    }

    static findByApp(app:string,uid:string){
        return getDb().collection('passwords').findOne({app:app,userId:new ObjectId(uid)});
    }


    static findById(id:string){
        return getDb().collection('passwords').findOne({_id:new ObjectId(id)});
    }

    static updateByName(name:string,values:object){
        return getDb().collection('passwords').findOneAndUpdate({app:name},{$set:values},{returnOriginal:false});
    }

    static deleteByName(name:string){
        return getDb().collection('passwords').deleteOne({app:name});
    }
    
}