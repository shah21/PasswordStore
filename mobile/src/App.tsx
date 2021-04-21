import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import RNBootSplash from "react-native-bootsplash";
import HomeStack from './routes/HomeStack';
import {DefaultTheme, Provider} from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
  },
};

export default function App() {


  useEffect(() => {
    RNBootSplash.hide();
  }, []);

  return (
    <Provider theme={theme}>
    <NavigationContainer>
      <HomeStack/>
    </NavigationContainer>
    </Provider>
  )
}
