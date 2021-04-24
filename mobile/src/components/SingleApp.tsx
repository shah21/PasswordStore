import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Card, IconButton } from 'react-native-paper'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import App from '../models/app'
import Theme from '../res/styles/theme.style';


type TypeProps = {
    item:App,
    onClick:(item:App)=>void,
    onDelete:(app:string)=>void,
    onCopy:(pass:string)=>void
}

const formateDate = (timeStamp:number) => {
    return new Date(timeStamp).toISOString().split('T')[0];
}


export default function SingleApp({item,onClick,onDelete,onCopy}:TypeProps) {

    

    return (
        <Card style={styles.card} onPress={()=>onClick(item)}>
            <Card.Content style={styles.content}>
                <View style={styles.data}>
                <Text style={styles.cardTitle}>{item.app}</Text>
                <Text style={styles.cardSubTitle}>{
                    item.updatedAt ? `Updated at ${formateDate(item.updatedAt)}`
                    : `Added at ${formateDate(item.addedAt)}`
                }</Text>
                </View>

                <View style={styles.actions}>
                    <IconButton 
                        onPress={()=>onCopy(item.password)}
                        icon={()=>(
                        <MaterialIcon 
                            size={20}
                            color={Theme.BLACK}
                            name="content-copy"/>
                    )}/>
                    <IconButton 
                        onPress={()=>onDelete(item.app)}
                        icon={()=>(
                        <MaterialIcon 
                            size={20}
                            color={Theme.ERROR}
                            name="delete"/>
                    )}/>
                </View>
            </Card.Content>
        </Card>
    )
}

const styles = StyleSheet.create({
    card:{
        marginHorizontal:10,
        marginVertical:5,
    },
    cardTitle:{
        fontSize:18,
        textTransform:'capitalize',
    },
    cardSubTitle:{
        fontSize:12,
    },
    content:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
    },
    data:{

    },
    actions:{
        flexDirection:'row',
    }
})
