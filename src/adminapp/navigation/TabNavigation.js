import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AddHotel from "../screens/AddHotel";
import Icon from "react-native-vector-icons/MaterialIcons";
import Profile from "../screens/Profile";
import Icon1 from "react-native-vector-icons/Ionicons"
import COLORS from "../../consts/colors";
const Tab = createBottomTabNavigator();

export default function TabNavigation() {
        return (
              <Tab.Navigator 
              screenOptions={{
                headerShown:false,
                tabBarActiveTintColor:COLORS.primary
        }}
              >
                <Tab.Screen 
                name="AddHotel" 
                component={AddHotel}
                options={{
                        tabBarLabel:"Add Hotel",
                        tabBarIcon:({size,color})=>(
                                <Icon 
                                name="add-circle-outline"
                                size={size}
                                color={color}
                                />
                        )
                }} 
                />
                <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                        tabBarLabel:"Profile",
                        tabBarIcon:({size,color})=>(
                                <Icon1
                                name="person-outline"
                                size={size}
                                color={color}
                                />
                        ) 
                }}
                />
              </Tab.Navigator>  
        )
}