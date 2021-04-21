import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Card, IconButton } from 'react-native-paper'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import App from '../models/app'
import Theme from '../res/styles/theme.main';

type TypeProps = {
    item:App,
    onClick:(item:App)=>void
}

export default function SingleApp({item,onClick}:TypeProps) {
    return (
        <Card style={styles.card} onPress={()=>onClick(item)}>
            <Card.Content style={styles.content}>
                <View style={styles.data}>
                <Text style={styles.cardTitle}>{item.app}</Text>
                <Text style={styles.cardSubTitle}>{item.signedAt}</Text>
                </View>

                <View style={styles.actions}>
                    <IconButton 
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

    }
})
