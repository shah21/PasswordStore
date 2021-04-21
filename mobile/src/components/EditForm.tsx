import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button, Colors, TextInput } from 'react-native-paper';
import App from '../models/app';


const theme={ 
    colors: { 
        primary: Colors.black,
        underlineColor:'transparent',
    }
}

type TypeProps = {
    item:App,
    handleEdit:(id:string,values:App)=>void
}


export default function EditForm({item,handleEdit}:TypeProps) {
    return (
        <View style={styles.container}>
            {/* <Text style={styles.header}>Edit App</Text> */}
            <TextInput
                mode="outlined"
                theme={theme}
                value={item.app}
                label="App"/>

            <TextInput
                mode="outlined"
                theme={theme}
                value={item.password}
                style={styles.input}
                label="Password"/>    

            <Button mode="contained" theme={theme} style={styles.btn} >Save</Button>    
        </View>
    )
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