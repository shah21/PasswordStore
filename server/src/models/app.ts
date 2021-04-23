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
    updatedAt:number;

    constructor(app:string,password:PassType,addedAt:number,updatedAt:number){
        this.password = password;
        this.addedAt = addedAt;
        this.updatedAt = updatedAt;
        this.app = app;
    } 

    save(){
        return getDb().collection('passwords').insertOne(this);
    }

    static getAll(){
        return getDb().collection('passwords').find().toArray();
    }

    static findByApp(app:string){
        return getDb().collection('passwords').findOne({app:app});
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