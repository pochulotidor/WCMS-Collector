import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MyProfile from '../screens/Profile';
import Schedule from '../screens/schedule';
import Activities from '../screens/history';
import Citi from '../screens/citizenReports';
import Area from '../screens/scheduleDetails';

export default function ProfileStack() {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator
            screenOptions={{ headerStyle: { backgroundColor: '#4CB963', }, headerTintColor: '#fff' }}
        >
            <Stack.Screen
                name="My Profile"
                component={MyProfile}
            />

            <Stack.Screen
                name="My schedule"
                component={Schedule}
            />

            <Stack.Screen
                name="Activity History"
                component={Activities}
            />

            <Stack.Screen
                name="Citizen reports history"
                component={Citi}
            />

            <Stack.Screen
                name="Area Location"
                component={Area}
            />


        </Stack.Navigator>
    )
}