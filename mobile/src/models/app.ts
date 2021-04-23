/* Schema or model of App data */
export default class App{
    _id:string;
    app:string;
    password:string;
    addedAt:number;
    updatedAt:number;

    constructor(_id:string,app:string,password:string,addedAt:number,updatedAt:number){
        this._id = _id;
        this.password = password;
        this.addedAt = addedAt;
        this.updatedAt = updatedAt;
        this.app = app;
    }     
}