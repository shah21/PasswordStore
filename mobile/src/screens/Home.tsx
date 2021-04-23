import React, { useEffect, useState } from 'react'
import { View, Text, Button,ToastAndroid, TouchableOpacity,Alert, RefreshControl, StyleSheet } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import SingleApp from '../components/SingleApp'
import AppManager from '../lib/AppManager'
import App from '../models/app'
import EditForm from '../components/EditForm'
import RBSheet from "react-native-raw-bottom-sheet";
import { StackNavigationProp } from '@react-navigation/stack'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Theme from "../res/styles/theme.style";
import Clipboard from '@react-native-community/clipboard';
import { Colors } from 'react-native-paper'

type SplashNavigationProps = StackNavigationProp<
    StackProps,
    "HomeScreen"
>;

type TypeProps = {
    navigation: SplashNavigationProps,
}

const showToast = (msg:string) => {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
};

export default function Home({navigation}:TypeProps) {
    const [apps,setApps] = useState<App[]>([]);
    const [isRefreshing,setRefreshing] = useState<boolean>(false);
    const [showEmptyMsg,setShowEmptyMsg] = useState<boolean>(false);
    const sheetRef = React.useRef<RBSheet>(null);
    const addSheetRef = React.useRef<RBSheet>(null);
    const [currentApp,setApp] = React.useState<App>(null!);


    const updateStatusBar = () => {
        navigation.setOptions({
            headerRight:()=>(
                <TouchableOpacity>
                <MaterialIcons
                    onPress={()=>addSheetRef.current?.open()}
                    style={{padding:10}} 
                    name="add"
                    color={Theme.BLACK}
                    size={25}/>
                </TouchableOpacity>    
            )
        })
    }




    const getApps =async()=>{
        setRefreshing(true);
        try{
            const appsArray = await AppManager.getApps() as App[];
            appsArray.length == 0 ? setShowEmptyMsg(true) : setShowEmptyMsg(false);
            setApps(appsArray);
        }catch(err){
            showToast(err.message);
        }    
        setRefreshing(false);
    }

    useEffect(()=>{
        getApps();
        updateStatusBar();
    },[]);


    const onClick = (item:App) => {
        sheetRef.current?.open();
        setApp(item);
    }
    
    const handleAdd = async (app:string,values:AppProps) => {
        if(values.app   && values.password){
            const res = await AppManager.addApp(values);
            if(res){
                showToast('App added');
                addSheetRef.current?.close();
                getApps();
            }
        }
    }
    
    

    const handleEdit = async (name:string,values:AppProps) => {
        if(values.app   || values.password){
            try {
              const res = await AppManager.updateApp(name, values);
              if (res) {
                showToast('App updated');
                sheetRef.current?.close();
                getApps();
              }
            } catch (err) {}
        }
    }

    const handleDelete = async (name: string) => {
      Alert.alert(
        'Delete App',
        'Are you sure, Do you really want to delete this app ?',
        [
          {
            text: 'Cancel',
            onPress: () => {},
            style: 'cancel',
          },
          {
            text: 'Delete',
            onPress: async () => {
              try {
                const res = await AppManager.deleteApp(name);
                if (res) {
                  showToast('App deleted');
                  setApps(prev => {
                      const newApps = prev.filter(app => app.app !== name);
                      newApps.length === 0 && setShowEmptyMsg(true);
                      return newApps; 
                    });
                }
              } catch (error) {}
            },
          },
        ],
      );
    };


    
    
    const handleCopy = (password:string) => {
        Clipboard.setString(password);
        showToast('Password copied');
    }
    
    const onRefresh = () => {
        setRefreshing(true);
        getApps();
    }
    
    

    return (
      <View>
        <View>
          <FlatList
            refreshControl={
                <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
            }
            renderItem={({item, index, separators}) => (
              <SingleApp onCopy={handleCopy} onDelete={handleDelete} item={item} onClick={onClick} />
            )}
            keyExtractor={(item, index) => index.toString()}
            data={apps}
          />
        </View>

        <RBSheet
          ref={sheetRef}
          closeOnDragDown={true}
          closeOnPressMask={false}
          customStyles={{
            wrapper: {
              backgroundColor: 'transparent',
            },
            draggableIcon: {
              backgroundColor: '#000',
            },
          }}>
          <EditForm type="edit" item={currentApp} handleEdit={handleEdit}/>
        </RBSheet>


        <RBSheet
          ref={addSheetRef}
          closeOnDragDown={true}
          closeOnPressMask={false}
          customStyles={{
            wrapper: {
              backgroundColor: 'transparent',
            },
            draggableIcon: {
              backgroundColor: '#000',
            },
          }}>
          <EditForm type="add" item={{app:'',password:''}} handleEdit={handleAdd}/>
        </RBSheet>
        
        {showEmptyMsg && (<View style={styles.emptyContainer}>
            <Text style={styles.text1}>No Apps Available!</Text>
            <TouchableOpacity onPress={()=>addSheetRef.current?.open()}>
                <Text style={styles.actionText}>Create One</Text>
            </TouchableOpacity>
        </View>) }
      </View>
    );
}

const styles = StyleSheet.create({
    emptyContainer:{
        justifyContent:'center',
        alignItems:'center',
        marginTop:100,
    },
    text1:{
        fontSize:18,
    },
    actionText:{
        fontSize:16,
        marginTop:10,
        color:Colors.blue600,
        textDecorationLine:'underline',
    }
});
