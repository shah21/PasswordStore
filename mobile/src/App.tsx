import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import RNBootSplash from "react-native-bootsplash";
import HomeStack from './routes/HomeStack';
import {Colors, DefaultTheme, Provider} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContext from './contexts/AuthContext';
import RootStack from './routes/Rootstack';
import { StatusBar } from 'react-native';
import isAuth from './utils/isAuth';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
  },
  
};

type State = {
  isLoading:boolean,
  userId:string,
  accessToken:string,
  refreshToken:string,
}

type Action =
 | { type: 'RETRIEVE_TOKEN',authObject:AuthObjectType }
 | { type: 'LOGIN',authObject:AuthObjectType }
 | { type: 'LOGOUT' }

 const loginReducer = (prevState:State, action:Action):State => {
  switch( action.type ) {
    case 'RETRIEVE_TOKEN': 
      return {
        ...prevState,
        accessToken: action.authObject.accessToken,
        refreshToken:action.authObject.refreshToken,
        isLoading: false,
      };
    case 'LOGIN': 
      return {
        ...prevState,
        userId:action.authObject.userId,
        accessToken: action.authObject.accessToken,
        refreshToken:action.authObject.refreshToken,
        isLoading: false,
      };
    case 'LOGOUT': 
      return {
        ...prevState,
        userId: null!,
        accessToken: null!,
        isLoading: false,
        refreshToken:null!,
      };
  }
}; 

const initialLoginState = {
  isLoading:true,
  userId:null!,
  accessToken:null!,
  refreshToken:null!,
} as State;



export default function App() {

  const [token,setToken] = React.useState<UserToken>(null!);
  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);


  
  

  const authContext = React.useMemo(()=>({
    signIn: async (authObject:AuthObjectType)=>{
      try {
        await AsyncStorage.setItem('accessToken',authObject.accessToken);
        await AsyncStorage.setItem('refreshToken',authObject.refreshToken);
        await AsyncStorage.setItem('userId',authObject.userId);

        setToken({
          accessToken:authObject.accessToken,
          refreshToken:authObject.refreshToken,
          userId:authObject.userId,
        });

      } catch (error) {
        console.log(error);
      }
      dispatch({type:'LOGIN',authObject:authObject});
    },
    signOut:async()=>{
      try {
        await AsyncStorage.removeItem('accessToken');
        await AsyncStorage.removeItem('refreshToken');
        await AsyncStorage.removeItem('userId');

        setToken({
          accessToken:null!,
          refreshToken:null!,
          userId:null!,
        });

      } catch (error) {
        console.log(error);
      }
      
      dispatch({type:'LOGOUT'});
    },
    signUp:()=>{}
  }),[])

  React.useEffect(() => {
    async function getFromStorage(){
      try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        const refreshToken  = await AsyncStorage.getItem('refreshToken');
        const userId = await AsyncStorage.getItem('userId');
        if(accessToken && refreshToken){
          const isValid = await isAuth(accessToken!,refreshToken!);
          if(isValid.isVerified){
            const tokenObj =  { accessToken: accessToken!, refreshToken: refreshToken!, userId: userId! };
            setToken(tokenObj);
            dispatch({ type: 'RETRIEVE_TOKEN', authObject:tokenObj });
          }
        }
        
      
        RNBootSplash.hide();
      } catch (error) {
        console.log(error);
      }
    }

    getFromStorage();
  }, [])


  return (
    <Provider theme={theme}>
    <AuthContext.Provider value={{...authContext,token}}>
    <NavigationContainer>
      <StatusBar backgroundColor={Colors.grey400} barStyle="light-content"/>
      {loginState.accessToken !=null ? (
        <HomeStack/>
      ):(
        <RootStack/>
      )}
      
    </NavigationContainer>
    </AuthContext.Provider>
    </Provider>
  )
}
