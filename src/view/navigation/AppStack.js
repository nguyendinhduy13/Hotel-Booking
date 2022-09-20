import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import HomeScreen from "../screens/HomeScreen"
import DetailsScreen from "../screens/DetailsScreen"
import TabNavigator from "./TabNavigator";
import HotelPhotos from "../screens/HotelPhotos";
import Test from "../screens/Test";
import ListRoom from "../screens/ListRoom";
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
                </Stack.Navigator>
        )
}