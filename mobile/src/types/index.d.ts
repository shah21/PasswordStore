

type AppProps = {
    app:string,
    password:string,
}


type StackProps = {
    SignUpScreen:undefined,
    LoginScreen:undefined,
    RootStack:undefined,
    HomeScreen:undefined,
    HomeStack:undefined,
}


type AuthObjectType = {
    accessToken:string,
    refreshToken:string,
    userId:string,
}


interface UserToken{
    accessToken:string,
    refreshToken:string,
    userId:string,
  }