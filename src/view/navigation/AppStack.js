import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import HomeScreen from "../screens/HomeScreen"
import DetailsScreen from "../screens/DetailsScreen"
import TabNavigator from "./TabNavigator";
const Stack=createNativeStackNavigator()

export default function AppStack(){
        return(
                <Stack.Navigator>

                        <Stack.Screen
                        name="TabNavigator"
                        component={TabNavigator}
                        options={{
                                headerShown:false
                        }}
                        
                        
                        />
                        <Stack.Screen
                        name="HomeScreen"
                        component={HomeScreen}
                        options={{
                                headerShown:false
                        }}
                        />
                        <Stack.Screen
                        name="DetailsScreen"
                        component={DetailsScreen}
                        options={{
                                headerShown:false
                        }}
                        />
                        
                </Stack.Navigator>
        )
}