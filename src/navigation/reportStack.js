import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Reports from '../screens/reports';
import Loc from '../screens/location';

export default function ReportStack() {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator
        screenOptions={{ headerStyle: { backgroundColor: '#4CB963',  } , headerTintColor: '#fff'}}
        >

            <Stack.Screen
                name='report'
                options={{ title: "Report" }}
                component={Reports}
            />

            <Stack.Screen
                name='Location'
                options={{ title: "Location" }}
                component={Loc}
            />

        </Stack.Navigator>
    )
}