import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "../screens/Profile";
import TabNavigation from "./TabNavigation";
import AddItem from "../screens/AddItem";


const Stack=createNativeStackNavigator()

export default function AdminHotelStack(){
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
                        name="ListRoom"
                        component={AddItem}
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