import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Booked from '../screens/Booked';
import ChangePassword from '../screens/ChangePassword';
import DetailInfoBooking from '../screens/DetailInfoBooking';
import DetailsScreen from '../screens/DetailsScreen';
import EditUserBooking from '../screens/EditUserBooking';
import HomeScreen from '../screens/HomeScreen';
import HotelPhotos from '../screens/HotelPhotos';
import InfoProfile from '../screens/InfoProfile';
import ListPlace from '../screens/ListPlace';
import ListRoom from '../screens/ListRoom';
import Map from '../screens/Map';
import MapHotel from '../screens/MapHotel';
import PlaceHotel from '../screens/PlaceHotel';
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
      <Stack.Screen name="Booked" component={Booked} />

      <Stack.Screen
        name="Map"
        component={Map}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="Change Password" component={ChangePassword} />

      <Stack.Screen
        name="Chọn thông tin đặt phòng"
        component={DetailInfoBooking}
      />
      <Stack.Screen name="Chỉnh sửa thông tin" component={EditUserBooking} />
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
    </Stack.Navigator>
  );
}
