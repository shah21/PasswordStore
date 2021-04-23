import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';

// home stack navigator screens
const HomeStack = createStackNavigator();

export default ()=>(
    <HomeStack.Navigator>
        <HomeStack.Screen name="Password Store"
            
            component={Home}/>
    </HomeStack.Navigator>
);