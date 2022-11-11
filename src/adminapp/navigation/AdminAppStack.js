import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigation from './TabNavigation';

import HomeScreen from '../screens/HomeScreen';
import AddHotel from '../screens/AddHotel';
import Profile from '../screens/Profile';
import InfoHotel from '../screens/InfoHotel';

const Stack = createNativeStackNavigator();

export default function AdminAppStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="TabNavigation"
                component={TabNavigation}
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
                name="AddHotel"
                component={AddHotel}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="Profile"
                component={Profile}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="InfoHotel"
                component={InfoHotel}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    );
}
