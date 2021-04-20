/* Database helper func for connect and get db instance */

import { Db, MongoClient } from "mongodb";

/* Databae URL */
export const DB_URI:string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.7qkan.mongodb.net/${process.env.MONGO_DEFAULT_DB}?retryWrites=true&w=majority`;

let _db:Db;

/* Connect client with db */
const connectDb = (callback: () => void) =>{
    MongoClient.connect(DB_URI, { useUnifiedTopology: true },(err,client)=>{
        if(err){
            console.log(err);
            throw new Error(err.message);
        }
        _db = client.db(); 
        callback();
    });
}

/* Get connected db instance */
const getDb = ():Db=>{
    if(!_db){
        throw new Error('No database found.');
    }
    return _db;
}

export {connectDb,getDb}
