import React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import {View} from "react-native"
import HomeScreen from "../screens/HomeScreen";
import Icon  from "react-native-vector-icons/FontAwesome";
import Icon1 from "react-native-vector-icons/Ionicons"
import Icon2 from "react-native-vector-icons/AntDesign"
import Profile from "../screens/Profile";
import COLORS from "../../consts/colors";
import Booking from "../screens/Booking";
const Tab=createBottomTabNavigator();
export default function TabNavigator(){
        return (
                <Tab.Navigator screenOptions={{
                        headerShown:false,
                        tabBarActiveTintColor:COLORS.primary
                }}>
                        <Tab.Screen
                         name="HomeScreen" 
                         component={HomeScreen}
                         options={{
                              tabBarLabel:"Home",  
                              tabBarIcon:({size,color})=>(
                                <Icon name="home"
                                size={size}
                                color={color}
                                />
                              )
                         }}
                         />
                         
                         <Tab.Screen
                         name="Booking"
                         component={Booking}
                         options={{
                                tabBarLabel:"Booking",
                                tabBarIcon:({size,color})=>(
                                        <Icon2 name="book"
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
                                        <Icon1 name="person"
                                        size={size}
                                        color={color}
                                        />
                                )
                         }}
                         />
                        
                </Tab.Navigator>
        )
}