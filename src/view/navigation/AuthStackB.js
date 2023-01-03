import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import SignInScreenTT from '../screens/AuthScreens/SignInScreenTT';
import SignUpScreen from '../screens/AuthScreens/SignUpScreen';
export default function AuthStackB() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
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
