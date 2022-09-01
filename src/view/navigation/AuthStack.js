import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import SignInWelcomeScreen from "../screens/AuthScreens/SignInWelcomeScreen";
import SignInScreen from "../screens/AuthScreens/SignInScreen";
import SignUpScreen from "../screens/AuthScreens/SignUpScreen";
import SignInScreenTT from "../screens/AuthScreens/SignInScreenTT";

export default function AuthStack(){
  const Stack=createNativeStackNavigator();
  return(
    <Stack.Navigator>
        <Stack.Screen
        name="SignInWelcomeScreen"
        component={SignInWelcomeScreen}
        options={{
                headerShown:false
        }}
        />
        <Stack.Screen
        name="SignInScreen"
        component={SignInScreen}
        options={{
                headerShown:false
        }}
        />
        <Stack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={{
                headerShown:false
        }}
        />
        <Stack.Screen
        name="SignInScreenTT"
        component={SignInScreenTT}
        options={{
                headerShown:false
        }}
        />

    </Stack.Navigator>
  )
}