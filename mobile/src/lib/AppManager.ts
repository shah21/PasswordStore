import axios from '../axios/config';
import endpoints from '../axios/endpoints';


type AppType = {
    app:string,
    password:string
}

export default class AppManager{
    constructor(){}
    
    static async addApp(app:AppProps){
        try {
            const res = await axios.post(endpoints.createApp,app);
            if(res){
                return res.data;
            }
        } catch (error) {
            handleError(error);
        }
    }

    static async getApps(){
        try {
            const res = await axios.get(endpoints.getApps);
            if(res){
                return res.data.apps;
            }
        } catch (error) {
            handleError(error);
        }
    }


    static async getApp(appName:string){
        try {
            const res = await axios.get(`${endpoints.getApps}/${appName}`);
            if(res){
                return res.data;
            }
        } catch (error) {
            handleError(error);
        }
    }


    static async deleteApp(appName:string){
        try {
            const res = await axios.delete(`${endpoints.deleteApp}/${appName}`);
            if(res){
                return res.data;
            }
        } catch (error) {
            handleError(error);
        }
    }


    static async updateApp(appName:string,values:AppType){
        try {
            const res = await axios.patch(`${endpoints.updateApp}/${appName}`,values);
            if(res){
                return res.data;
            }
        } catch (error) {
            handleError(error);
        }
    }


}

function handleError(err:any){
    if(err.message === "Network Error"){
        throw new Error('Network Error');
    }else if(err.response.status === 401){
        throw new Error('Unauthorized access');
    }else if(err.response.status === 404){
        throw new Error(err.response.data.message);
    }else if(err.response.status === 422){
        throw new Error(err.response.data.message);
    }else{
        console.log(err.message);
        throw new Error('Something went wrong!');
    }
}