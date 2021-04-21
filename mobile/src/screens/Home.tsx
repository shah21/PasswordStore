import React, { useEffect, useState } from 'react'
import { View, Text, Button } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import SingleApp from '../components/SingleApp'
import AppManager from '../lib/AppManager'
import App from '../models/app'
import EditForm from '../components/EditForm'
import RBSheet from "react-native-raw-bottom-sheet";

export default function Home() {
    const [apps,setApps] = useState<App[]>([]);
    const [openSheet,setOpenSheet] = useState<App[]>([]);
    const sheetRef = React.useRef<RBSheet>(null);
    const [currentApp,setApp] = React.useState<App>(null!);

    useEffect(()=>{
        const getApps =async()=>{
            setApps(await AppManager.getApps() as App[]);
        }

        getApps();
    },[]);


    const onClick = (item:App) => {
        sheetRef.current?.open();
        setApp(item);
    }

    const handleEdit = (id:string,values:App) => {
        
    }
    
    

    return (
      <View>
        <View>
          <FlatList
            renderItem={({item, index, separators}) => (
              <SingleApp item={item} onClick={onClick} />
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
          <EditForm item={currentApp} handleEdit={handleEdit}/>
        </RBSheet>
      </View>
    );
}
