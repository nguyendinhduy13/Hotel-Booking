import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import SignInScreenTT from '../screens/AuthScreens/SignInScreenTT';
import SignInWelcomeScreen from '../screens/AuthScreens/SignInWelcomeScreen';
import SignUpScreen from '../screens/AuthScreens/SignUpScreen';
export default function AuthStack() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SignInWelcomeScreen"
        component={SignInWelcomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SignInScreenTT"
        component={SignInScreenTT}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
