import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Splash from '../screens/authScreens/Splash';
import Login from '../screens//authScreens/Login';
import ForgotPass from '../screens/authScreens/ForgotPass';

const Stack = createStackNavigator();

export default function AuthStack() {

    return (

        <Stack.Navigator
        screenOptions={{
            headerShown: false
        }}
        >

            <Stack.Screen
                name='SplashScreen'
                component={Splash}
            />

            <Stack.Screen
                name='LoginScreen'
                component={Login}
            />

            <Stack.Screen
                name='ForgotPassword'
                component={ForgotPass}
            />

        </Stack.Navigator>

    )
}