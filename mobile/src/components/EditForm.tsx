import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button, Colors, TextInput } from 'react-native-paper';
import MaterialIcon from "react-native-vector-icons/MaterialIcons";



const theme={ 
    colors: { 
        primary: Colors.black,
        underlineColor:'transparent',
    }
}

type TypeProps = {
    item:AppProps,
    handleEdit:(name:string,values:AppProps)=>void,
    type:string,
}


const formReducer = (state: object, event: any) => {
    return {
        ...state,
        ...event as AppProps
    }
}



export default function EditForm({item,handleEdit,type}:TypeProps) {
  const [formData, setFormData] = React.useReducer(formReducer, {
      app:item.app,
      password:item.password
  } as AppProps);
  const [errors, setErrors] = useState<{app: string; password: string}>({
    app: null!,
    password: null!,
  });
  const [isDisabled, setDisabled] = useState<boolean>(true);

  const handleTextChange = (val: string, fieldName: string) => {
    setErrors({
      app: fieldName === 'app' ? '' : errors.app,
      password: fieldName === 'password' ? '' : errors.password,
    });

    if (val !== item.app) {
        setDisabled(false);
    }else {
        setDisabled(true);
    }
    
    setFormData({
      [fieldName]: val,
    });
  };

  /* Handle validation of form */
  const handleValidation = () => {
    
    let formIsValid = true;
    const newErrors = {
      app: '',
      password: '',
    };

    //app
    if (!formData.app) {
      formIsValid = false;
      newErrors['app'] = 'App name cannot be empty';
    }
    

    //password
    if (!formData.password) {
      formIsValid = false;
      newErrors['password'] = 'App password cannot be empty';
    }

    setErrors({
      ...errors,
      ...newErrors,
    });

    return formIsValid;
  };

  const handleSave = () => {
    if (handleValidation()) {
        setErrors({app: null!, password: null!});
        const app = {app:formData.app,password:formData.password}
        if (type === 'edit') {
            if (app.app === item.app) {
                app.app = null!;
            }
            if (app.password === item.password) {
                app.password = null!;
            }
        }
        handleEdit(item.app, app);
    }
  };




  return (
    <View style={styles.container}>
    
    
      <TextInput
        mode="outlined"
        theme={theme}
        error={errors.app ? true : false}
        value={formData.app}
        onChangeText={(text)=>handleTextChange(text.trim(),'app')}
        label="App"
      />
    
      <TextInput
        mode="outlined"
        theme={theme}
        error={errors.password ? true : false}
        value={formData.password}
        onChangeText={(text)=>handleTextChange(text.trim(),'password')}
        style={styles.input}
        label="Password"
      />

      <Button
        disabled={isDisabled}
        mode="contained"
        theme={theme}
        style={styles.btn}
        onPress={handleSave}>
        Save
      </Button>
    </View>
  );
}


const styles = StyleSheet.create({
    container:{
        marginHorizontal:10,
        marginVertical:5,
    },
    header:{
        fontSize:20,
        fontWeight:'700',
    },
    input:{
        marginVertical:15,
    },
    btn:{}
});