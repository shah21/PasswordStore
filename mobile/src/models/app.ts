/* Schema or model of App data */
export default class App{
    _id:string;
    app:string;
    password:string;
    signedAt:number;

    constructor(_id:string,app:string,password:string,signedAt:number){
        this._id = _id;
        this.password = password;
        this.signedAt = signedAt;
        this.app = app;
    }     
}