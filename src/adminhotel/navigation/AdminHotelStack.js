import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import AddItem from '../screens/AddItem';
import EditBenefit from '../screens/EditBenefit';
import EditHotel from '../screens/EditHotel';
import EditImage from '../screens/EditImage';
import EditRoom from '../screens/EditRoom';
import ItemInfo from '../screens/ItemInfo';
import Profile from '../screens/Profile';
import TabNavigation from './TabNavigation';

const Stack = createNativeStackNavigator();

export default function AdminHotelStack() {
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
        name="AddItem"
        component={AddItem}
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
        name="ItemInfo"
        component={ItemInfo}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EditRoom"
        component={EditRoom}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EditImage"
        component={EditImage}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EditBenefit"
        component={EditBenefit}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EditHotel"
        component={EditHotel}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
