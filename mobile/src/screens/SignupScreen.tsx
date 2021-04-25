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
import * as Progress from "react-native-progress";
import { showToast } from '../utils/general';
import AuthStyles from './AuthStyles';

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

//register user
const registerUser = async (credentails:object)=>{
    
    try {
      const response = await axios.post(endpoints.signup, JSON.stringify(credentails), {
        headers: {
          "Content-Type": "application/json"
        },
      });
      const status: number = response.status;
      return { ...response.data, status: status };
    } catch (err) {
      throw err;
    }
  
  };

const formReducer = (state: object, event: any) => {
    return {
        ...state,
        ...event
    }
}

export default function SignupScreen({navigation}:TypeProps) {
    const styles = AuthStyles;
    const [formData, setFormData] = React.useReducer(formReducer, {});
    const [errors, setErrors] = React.useState({
        email:'',
        password:'',
        confirm_password:'',
      });
    const [loading,setLoading] = React.useState<boolean>(false);  


    const handleTextChange = (val:string,fieldName:string) => {
        setErrors({
            email:fieldName === 'email' ? '' : errors.email,
            password:fieldName === 'password' ? '' : errors.password,
            confirm_password:fieldName === 'confirm_password' ? '' : errors.confirm_password,
        });
        setFormData({
            [fieldName]:val,
        });
    }


    
    /* Handle validation of form */
    const handleValidation = () =>{

        let formDataObject = formData;
        let errorsObject = { email: '', password: '', confirm_password: '' };
        let formIsValid = true;
    
    
    
        //Email
        if(!formDataObject.email){
           formIsValid = false;
           errorsObject['email'] = "Cannot be empty";
        }
    
        if(typeof formDataObject.email !== "undefined"){
           let lastAtPos = formDataObject.email.lastIndexOf('@');
           let lastDotPos = formDataObject.email.lastIndexOf('.');
    
           if (!(lastAtPos < lastDotPos && lastAtPos > 0 && formDataObject.email.indexOf('@@') === -1 && lastDotPos > 2 && (formDataObject.email.length - lastDotPos) > 2)) {
              formIsValid = false;
              errorsObject["email"] = "Email is not valid";
            }
        }  
    
    
       //password
       if (!formDataObject.password) {
         formIsValid = false;
         errorsObject["password"] = "Cannot be empty";
       }else if (formDataObject.password.length < 6) {
         formIsValid = false;
         errorsObject["password"] = "Password must have atleast 6 characters";
       }
    
       //confirm password
        if (!formDataObject.confirm_password) {
          formIsValid = false;
          errorsObject['confirm_password'] = "Cannot be empty";
        }else{
          if (formDataObject.password !== formDataObject.confirm_password) {
            formIsValid = false;
            errorsObject["confirm_password"] = "Passwords must be same";
          }
        }
    
    
       setErrors(errorsObject);
        
       return formIsValid;
    }  

    /* Handle Signup */
    const signupHandler = async () => {

        if (handleValidation()) {

          if(!loading){
            setLoading(true);
          }

          try {
            const response = await registerUser(formData);
            if (response.status !== 201) {
              const errors = response.errors;
            //   setFlash({ message: errors.length > 0 ? errors[0].msg : response.message, type: 'error' });
              return;
            }
            setLoading(false);
            // addMessageToSession('Account created successfully', 'success');
                // setFlash({ message: 'Account created successfully', type: 'success' });
                showToast('Account created successfully');
                navigation.navigate('LoginScreen');
          } catch (err) {
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

        <InputField
          handleChange={handleTextChange}
          name="confirm_password"
          label="Confirm Password"
          icon="lock"
          errorText={errors.confirm_password}
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
          onPress={signupHandler}
          theme={themeLogin}
          style={styles.btnLogin}
          mode="contained">
          Signup
        </Button>

        <View style={styles.navContainer}>
          <Text style={styles.text2}>I don't have an account</Text>

          <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
            <Text style={styles.signupText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
}


