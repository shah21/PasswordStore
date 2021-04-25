import axios from '../axios/config';
import endpoints from '../axios/endpoints';
import pkg from '../../package.json';
import ConfigStore from 'configstore';

export default class KeyManager{
    conf:ConfigStore;
    constructor(){
        this.conf = new ConfigStore(pkg.name);
    }
    
    

    async login(email:string,password:string){
        try {
            const res = await axios.post(endpoints.login,{email:email,password:password});
            if(res){
                this.conf.set('accessToken',res.data.user.accessToken);
                this.conf.set('refreshToken',res.data.user.refreshToken);
                this.conf.set('userId',res.data.user.userId);
                return res.data;
            }
        } catch (error) {
            handleError(error);
        }
    }

}

function handleError(err:any){
    console.log(err);
    if(err.response.status === 401){
        throw new Error('Unauthorized access');
    }else if(err.response.status === 404){
        throw new Error(err.response.data.message);
    }else if(err.response.status === 422){
        throw new Error(err.response.data.message);
    }else{
        throw new Error('Something went wrong!');
    }
}