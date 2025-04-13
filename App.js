
import React, { useEffect } from 'react';
import {
  StatusBar,
  Text,
  View,
  SafeAreaView
} from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import UserDetail from './src/screens/UserDetail';
import { requestPermission } from './src/notification/Notification';
const Stack = createStackNavigator()
const AppContainer = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'HomeScreen'}
        screenOptions={() => ({
          headerShown: false,
          gestureEnabled: true,

        })}>
        <Stack.Screen 
        name='HomeScreen' 
        component={HomeScreen} />
        <Stack.Screen 
        name='UserDetail' 
        options={{ headerShown: true }}
        component={UserDetail} />

      </Stack.Navigator>
    </NavigationContainer>
  )
}


function App() {
  useEffect(()=>{
    requestPermission()
  },[])
  return (
      <SafeAreaView style={{flex:1}}>
          <StatusBar />
        <AppContainer />
      </SafeAreaView>

  );
}


export default App;
