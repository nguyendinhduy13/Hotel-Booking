import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "../screens/Profile";
import TabNavigation from "./TabNavigation";
import AddItem from "../screens/AddItem";
import ItemInfo from "../screens/ItemInfo";


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
                        name="AddItem"
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
                        <Stack.Screen
                        name="ItemInfo"
                        component={ItemInfo}
                        options={{
                                headerShown:false
                        }}
                        />
                </Stack.Navigator>
        )
}