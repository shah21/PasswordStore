import React from 'react'
import { View, Text, StyleSheet,TextInput } from 'react-native'
import { Colors } from 'react-native-paper';
import MaterialIcon from "react-native-vector-icons/MaterialIcons";


interface PropsType{
    handleChange:(val:string,fieldName:string)=>void;
    errorText:string,
    label:string,
    name:string,
    icon:string,
}


export default function InputField({handleChange,errorText,label,name,icon}:PropsType) {
    return (
      <View>
        <View style={{...styles.inputContainer,borderColor:errorText ? Colors.red400 : Colors.grey700}}>
          <MaterialIcon style={styles.inputIcon} size={25} name={icon} />
          <TextInput
            secureTextEntry={name === "password"||name === "confirm_password" ? true : false}
            style={styles.inputField}
            onChangeText={text => handleChange(text, name)}
            placeholder={label}
            
          />
        </View>
        {errorText != '' && (<Text style={styles.errorText}>{errorText}</Text>)}
      </View>
    );
}


const styles = StyleSheet.create({
    inputContainer:{
        width:'100%',
        marginVertical:5,
        height:50,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        borderColor: Colors.grey700,
        borderWidth:1,
        borderRadius:5,
    },
    inputIcon:{
        color:Colors.black,
        marginHorizontal:5,
    },
    inputField:{
        flex:1,
        fontSize:16,
    },
    errorText:{
        color:Colors.red400,
        fontSize:12,
    }
});
