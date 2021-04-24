import { createContext } from "react";


export default createContext({
    signIn:(authObject:AuthObjectType)=>{},
    signOut:()=>{},
    signUp:()=>{},
    token:{
      accessToken: undefined!,
      refreshToken: undefined!,
      userId: undefined!,
    } as UserToken,
  });