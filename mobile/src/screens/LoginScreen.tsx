import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { Button, Colors } from 'react-native-paper';
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import axios from "../axios/config";
import endpoints from '../axios/endpoints';
import InputField from '../components/InputField';
import AuthContext from '../contexts/AuthContext';
import { showToast } from '../utils/general';
import AuthStyles from './AuthStyles';
import * as Progress from "react-native-progress";

const themeLogin={ 
    colors: { 
        primary: Colors.blue700,
        underlineColor:'transparent',
    }
}

type SplashNavigationProps = StackNavigationProp<
    StackProps,
    "LoginScreen"
>;

type TypeProps = {
    navigation: SplashNavigationProps
}

const loginUser = async (credentails: object) => {

    try {
        const response = await axios.post(endpoints.login, JSON.stringify(credentails), {
            headers: {
                "Content-Type": "application/json"
            },
        });
        return response.data;
    } catch (err) {
        throw err
    }
}

const formReducer = (state: object, event: any) => {
    return {
        ...state,
        ...event
    }
}

export default function LoginScreen({navigation}:TypeProps) {
    const styles = AuthStyles;
    const [formData, setFormData] = React.useReducer(formReducer, {});
    const [errors, setErrors] = React.useState({
        email:'',
        password:''
      });
    const [loading,setLoading] = React.useState<boolean>(false);  
    const {signIn} = React.useContext(AuthContext);

    
    const handleTextChange = (val:string,fieldName:string) => {
        setErrors({
            email:fieldName === 'email' ? '' : errors.email,
            password:fieldName === 'password' ? '' : errors.password
        });
        setFormData({
            [fieldName]:val,
        });
    }

    /* Handle validation of form */
    const handleValidation = () => {
        let formIsValid = true;
        const newErrors = {
            email: '',
            password: ''
        };

        //Email
        if (!formData.email) {
            
            formIsValid = false;
            newErrors['email'] = "Cannot be empty";
        }

        if (typeof formData.email !== "undefined") {
            let lastAtPos = formData.email.lastIndexOf('@');
            let lastDotPos = formData.email.lastIndexOf('.');

            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && formData.email.indexOf('@@') === -1 && lastDotPos > 2 && (formData.email.length - lastDotPos) > 2)) {
                formIsValid = false;
                newErrors["email"] = "Email is not valid";
            }
        }


        //password
        if (!formData.password) {
            formIsValid = false;
            newErrors["password"] = "Cannot be empty";
        }



        setErrors({
            ...errors,
            ...newErrors,
        });

        return formIsValid;
    }


    /* Handle login */
    const loginHandler = async () =>{
        if(handleValidation()){
          setErrors({  
            email:'',
            password:''
          });

          if(!loading){
            setLoading(true);
          }

          try{
            const response:any = await loginUser({email:formData.email,password:formData.password});
            if(response){
                // setFlash({ message : response.message, type: 'success' });
                showToast(response.message)
                signIn(response.user);
            }
            setLoading(false);
          }catch (err) {
            setLoading(false);
            if (err.response) {
                const errResponseData = err.response.data;
                showToast(errResponseData.message ? errResponseData.message : 'Something went wrong!');
              //   setFlash({ message: errResponseData.message ? errResponseData.message : 'Something went wrong!', type: 'error' });
            }else{
              // setFlash({ message : 'Something went wrong!', type: 'error' });
              showToast('Something went wrong!');
            }
          }
      }
    }
    


    return (
      <View style={styles.loginContainer}>
        <Image
          style={styles.icon}
          source={require('../assets/password-manager-icon.jpg')}
        />
        <Text style={styles.textHeader}>Password Store</Text>
        <InputField
          handleChange={handleTextChange}
          name="email"
          label="Email"
          icon="email"
          errorText={errors.email}
        />

        <InputField
          handleChange={handleTextChange}
          name="password"
          label="Password"
          icon="lock"
          errorText={errors.password}
        />

        {loading && (
          <Progress.Circle
            size={30}
            borderWidth={5}
            borderColor={Colors.blue700}
            indeterminate={true}
          />
        )}

        <Button
          onPress={loginHandler}
          theme={themeLogin}
          style={styles.btnLogin}
          mode="contained">
          Login
        </Button>

        <View style={styles.navContainer}>
          <Text style={styles.text2}>I don't have an account</Text>

          <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
            <Text style={styles.signupText}>Signup</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
}



