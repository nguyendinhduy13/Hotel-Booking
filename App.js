import React from 'react'
import "react-native-gesture-handler"
import { StatusBar } from 'react-native'
import {NavigationContainer} from "@react-navigation/native"
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import HomeScreen from './src/view/screens/HomeScreen'
import DetailsScreen from './src/view/screens/DetailsScreen'
import COLORS from './src/consts/colors'

const Stack=createNativeStackNavigator();

export default function App(){
  return(
    <NavigationContainer>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content"/>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="DetailsScreen" component={DetailsScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}