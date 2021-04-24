import React from 'react';

import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';

import SignUpScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen';


const Stack = createStackNavigator();

const RootStack = () => (
    <Stack.Navigator headerMode="none"
    screenOptions={{
      headerShown: false,
    }}>

    <Stack.Screen name="LoginScreen"
      component={LoginScreen}
    />  
  
    <Stack.Screen name="SignUpScreen"
      component={SignUpScreen}
    />
    </Stack.Navigator>
);

export default RootStack;