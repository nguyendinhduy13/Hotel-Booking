import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import TabNavigation from './TabNavigation';

import MapHotel from '../../view/screens/MapHotel';
import AddHotel from '../screens/AddHotel';
import HomeScreen from '../screens/HomeScreen';
import InfoHotel from '../screens/InfoHotel';
import Profile from '../screens/Profile';

const Stack = createNativeStackNavigator();

export default function AdminAppStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TabNavigation"
        component={TabNavigation}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AddHotel"
        component={AddHotel}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="InfoHotel"
        component={InfoHotel}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MapHotel"
        component={MapHotel}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
