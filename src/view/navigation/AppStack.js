import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import HomeScreen from "../screens/HomeScreen"
import DetailsScreen from "../screens/DetailsScreen"
import TabNavigator from "./TabNavigator";
import HotelPhotos from "../screens/HotelPhotos";
import Test from "../screens/Test";
import ListRoom from "../screens/ListRoom";
import Booked from "../screens/Booked";
import BookedFinal from "../screens/BookedFinal";
import Map from "../screens/Map";
import InfoProfile from "../screens/InfoProfile";
import MapHotel from "../screens/MapHotel";
import TestCalendar from "../screens/TestCalendar";
const Stack = createNativeStackNavigator()

export default function AppStack() {
        return (
                <Stack.Navigator>
                        <Stack.Screen
                                name="TabNavigator"
                                component={TabNavigator}
                                options={{
                                        headerShown: false
                                }}
                        />
                        <Stack.Screen
                                name="HomeScreen"
                                component={HomeScreen}
                                options={{
                                        headerShown: false
                                }}
                        />
                        <Stack.Screen
                                name="DetailsScreen"
                                component={DetailsScreen}
                                options={{
                                        headerShown: false
                                }}
                        />
                        <Stack.Screen
                                name="HotelPhotos"
                                component={HotelPhotos}
                                options={{
                                        headerShown: false
                                }}
                        />
                        <Stack.Screen
                                name="Test"
                                component={Test}
                                options={{
                                        headerShown: false
                                }}
                        />
                        <Stack.Screen
                                name="ListRoom"
                                component={ListRoom}
                                options={{
                                        headerShown: false
                                }}
                        />
                        <Stack.Screen
                                name="Booked"
                                component={Booked}
                                options={{
                                        headerShown: false
                                }}
                        />

                        <Stack.Screen
                                name="BookedFinal"
                                component={BookedFinal}
                                options={{
                                        headerShown: false
                                }}
                        />
                        <Stack.Screen
                                name="Map"
                                component={Map}
                                options={{
                                        headerShown: false
                                }}
                        />
                        <Stack.Screen
                                name="InfoProfile"
                                component={InfoProfile}
                                options={{
                                        headerShown: false
                                }}
                        />
                        <Stack.Screen
                                name="MapHotel"
                                component={MapHotel}
                                options={{
                                        headerShown: false
                                }}
                        />
                        <Stack.Screen
                                name="TestCalendar"
                                component={TestCalendar}
                                options={{
                                        headerShown: false
                                }}
                        />
                </Stack.Navigator>
        )
}