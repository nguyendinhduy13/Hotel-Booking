import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Icon2 from 'react-native-vector-icons/AntDesign';
import Icon3 from 'react-native-vector-icons/Fontisto';
import Icon1 from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../consts/colors';
import AddItem from '../screens/AddItem';
import ConfirmBooking from '../screens/ConfirmBooking';
import Profile from '../screens/Profile';
import Revenue from '../screens/Revenue';
const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
      }}
    >
      <Tab.Screen
        name="ListRoom"
        component={AddItem}
        options={{
          tabBarLabel: 'List Room',
          tabBarIcon: ({ size, color }) => (
            <Icon name="add-circle-outline" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="ConfirmBooking"
        component={ConfirmBooking}
        options={{
          tabBarLabel: 'Confirm Booking',
          tabBarIcon: ({ size, color }) => (
            <Icon3 name="hotel" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Revenue"
        component={Revenue}
        options={{
          tabBarLabel: 'Revenue',
          tabBarIcon: ({ size, color }) => (
            <Icon2 name="barschart" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ size, color }) => (
            <Icon1 name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
