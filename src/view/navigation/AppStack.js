import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import About from '../screens/About';
import Booked from '../screens/Booked';
import ChangeLanguage from '../screens/ChangeLanguage';
import ChangePassword from '../screens/ChangePassword';
import DetailInfoBooking from '../screens/DetailInfoBooking';
import DetailsScreen from '../screens/DetailsScreen';
import EditUserBooking from '../screens/EditUserBooking';
import HomeScreen from '../screens/HomeScreen';
import HotelPhotos from '../screens/HotelPhotos';
import InfoBooking from '../screens/InfoBooking';
import InfoProfile from '../screens/InfoProfile';
import ListPlace from '../screens/ListPlace';
import ListRoom from '../screens/ListRoom';
import Map from '../screens/Map';
import MapHotel from '../screens/MapHotel';
import PlaceHotel from '../screens/PlaceHotel';
import Terms from '../screens/Terms';
import Test from '../screens/Test';
import TestCalendar from '../screens/TestCalendar';
import TabNavigator from './TabNavigator';
const Stack = createNativeStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TabNavigator"
        component={TabNavigator}
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
        name="DetailsScreen"
        component={DetailsScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="HotelPhotos"
        component={HotelPhotos}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Test"
        component={Test}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ListRoom"
        component={ListRoom}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PlaceHotel"
        component={PlaceHotel}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ListPlace"
        component={ListPlace}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Booked"
        component={Booked}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Map"
        component={Map}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Change Password"
        component={ChangePassword}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Ch???n th??ng tin ?????t ph??ng"
        component={DetailInfoBooking}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Ch???nh s???a th??ng tin"
        component={EditUserBooking}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="InfoProfile"
        component={InfoProfile}
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
      <Stack.Screen
        name="TestCalendar"
        component={TestCalendar}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ChangeLanguage"
        component={ChangeLanguage}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="InfoBooking"
        component={InfoBooking}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="About"
        component={About}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Terms"
        component={Terms}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
