import ConfigStore from 'configstore';
import pkg from '../../package.json';
import axiosInstance from "../axios/config";
import endpoints from "../axios/endpoints";



const isAuth = async (accessToken:string,refreshToken:string):Promise<{isVerified:boolean,accessToken:string}> =>{  
    const conf = new ConfigStore(pkg.name);
    try{
        const authResponse =  await axiosInstance.post(endpoints.verifyAccessToken,{accessToken:accessToken});
        if(!authResponse){}
        return {isVerified:true,accessToken:accessToken}
    }catch(err){
        if (err.response && err.response.status === 401) {
          if (!refreshToken) {
            return { isVerified: false, accessToken: accessToken };
          }
          const response = await axiosInstance.post(endpoints.refreshToken, {
            refreshToken: refreshToken,
          });
          if (response && response.data.accessToken) {
            const newToken = response.data.accessToken;
            conf.set("accessToken",newToken);
            
            return { isVerified: true, accessToken: newToken };
          }
        }
        //handle error
        
        return {isVerified:false,accessToken:accessToken}
    }
}

export default isAuth;

