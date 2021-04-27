import React, { useState } from 'react'
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native'
import { Colors, TextInput } from 'react-native-paper';
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import * as Progress from "react-native-progress";



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
    isSaving:boolean,
}


const formReducer = (state: object, event: any) => {
    return {
        ...state,
        ...event as AppProps
    }
}



export default function EditForm({item,handleEdit,type,isSaving}:TypeProps) {
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
        onChangeText={text => handleTextChange(text.trim(), 'app')}
        label="App"
      />

      <TextInput
        mode="outlined"
        theme={theme}
        error={errors.password ? true : false}
        value={formData.password}
        onChangeText={text => handleTextChange(text.trim(), 'password')}
        style={styles.input}
        label="Password"
      />

      <TouchableOpacity
        onPress={handleSave}
        disabled={isDisabled}
        activeOpacity={0.6}
        style={[
          styles.signIn,
          {
            backgroundColor: Colors.black,
            borderWidth: 1,
            marginTop: 15,
          },
        ]}>
        <Text
          style={[
            styles.textSign,
            {
              color: Colors.white,
            },
          ]}>
          Save
        </Text>
        {isSaving && (
            <Progress.Circle
              size={20}
              borderWidth={5}
              borderColor="#fff"
              indeterminate={true}
            />
          )}
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginVertical: 5,
  },
  header: {
    fontSize: 20,
    fontWeight: '700',
  },
  input: {
    marginVertical: 15,
  },
  btn: {},
  signIn: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    paddingHorizontal: 5,
    fontWeight: 'bold',
  },
});