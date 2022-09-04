import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddInfo from "../screens/AddInfo";
import Profile from "../screens/Profile";
import TabNavigation from "./TabNavigation";


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
                        name="AddInfo"
                        component={AddInfo}
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