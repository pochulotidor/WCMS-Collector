import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Maps from '../screens/Maps';
import Details from '../screens/reportDertails';



export default function MapStack() {

    const Stack = createStackNavigator();

    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: '#4CB963', }, headerTintColor: '#fff'
            }}

        >

            <Stack.Screen
                name='Map'
                component={Maps}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name='ReportDetails'
                component={Details}
            />


        </Stack.Navigator>
    )
}