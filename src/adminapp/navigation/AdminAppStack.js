import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddHotel from "../screens/AddHotel";
import Profile from "../screens/Profile";
import TabNavigation from "./TabNavigation";


const Stack=createNativeStackNavigator()

export default function AdminAppStack(){
        return(
                <Stack.Navigator>
                        <Stack.Screen
                        name="TabNavigation"
                        component={TabNavigation}
                        options={{
                                headerShown:false
                        }}
                        />
                        <Stack.Screen
                        name="AddHotel"
                        component={AddHotel}
                        options={{
                                headerShown:false
                        }}
                        />
                        <Stack.Screen
                        name="Profile"
                        component={Profile}
                        options={{
                                headerShown:false
                        }}
                        />
                </Stack.Navigator>
        )
}