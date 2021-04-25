import axios from '../axios/config';
import endpoints from '../axios/endpoints';
import isAuth from '../utils/isAuth';
import pkg from '../../package.json';
import ConfigStore from 'configstore';


type AppType = {
    app:string,
    password:string
}

type AppProps = {
    app:string,
    password:string,
}   

interface UserToken{
    accessToken:string,
    refreshToken:string,
    userId:string,
  }

export default class AppManager {
    conf:ConfigStore;
    token:UserToken;
    constructor(){
        this.conf = new ConfigStore(pkg.name);
        this.token = {
            accessToken:this.conf.get('accessToken'),
            refreshToken:this.conf.get('refreshToken'),
            userId:this.conf.get('userId'),
        }
    }

    async addApp(app: AppProps) {
    try {
      const isAuthourized = await isAuth(this.token.accessToken, this.token.refreshToken);
      if (isAuthourized && isAuthourized.isVerified) {
        const res = await axios.post(endpoints.createApp, app, {
          headers: {
            Authorization: `Bearer ${isAuthourized.accessToken}`,
          },
        });
        if (res) {
          return res.data;
        }
      }
    } catch (error) {
      handleError(error);
    }
  }

    async getApps() {
    try {
      const isAuthourized = await isAuth(this.token.accessToken, this.token.refreshToken);
      if (isAuthourized && isAuthourized.isVerified) {
        const res = await axios.get(endpoints.getApps, {
          headers: {
            Authorization: `Bearer ${isAuthourized.accessToken}`,
          },
        });
        if (res) {   
          return res.data.apps;
        }
      }
    } catch (error) {
      handleError(error);
    }
  }

    async getApp(appName: string) {
    try {
      const isAuthourized = await isAuth(this.token.accessToken, this.token.refreshToken);
      if (isAuthourized && isAuthourized.isVerified) {
        const res = await axios.get(`${endpoints.getApps}/${appName}`, {
          headers: {
            Authorization: `Bearer ${isAuthourized.accessToken}`,
          },
        });
        if (res) {
          return res.data;
        }
      }
    } catch (error) {
      handleError(error);
    }
  }

   async deleteApp(appName: string) {
    try {
      const isAuthourized = await isAuth(this.token.accessToken, this.token.refreshToken);
      if (isAuthourized && isAuthourized.isVerified) {
        const res = await axios.delete(`${endpoints.deleteApp}/${appName}`, {
          headers: {
            Authorization: `Bearer ${isAuthourized.accessToken}`,
          },
        });
        if (res) {
          return res.data;
        }
      }
    } catch (error) {
      handleError(error);
    }
  }

   async updateApp(appName: string, values: AppType) {
    try {
      const isAuthourized = await isAuth(this.token.accessToken, this.token.refreshToken);
      if (isAuthourized && isAuthourized.isVerified) {
        const res = await axios.patch(
          `${endpoints.updateApp}/${appName}`,
          values,
          {
            headers: {
              Authorization: `Bearer ${isAuthourized.accessToken}`,
            },
          },
        );
        if (res) {
          return res.data;
        }
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