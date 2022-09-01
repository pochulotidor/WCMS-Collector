import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import Home from '../screens/Home';
import Maps from '../navigation/mapStack';
import Reports from '../navigation/reportStack';
import Profile from '../navigation/profileStack';


import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Tab = createMaterialBottomTabNavigator();

export default function AppNav() {

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, size, color }) => {
                    let iconName;
                    if (route.name == 'Home') {
                        iconName = 'home'
                        size = focused ? 21 : 18
                    } else if (route.name == 'Maps') {
                        iconName = 'map-marked-alt'
                        size = focused ? 21 : 18
                    } else if (route.name == 'Reports') {
                        iconName = 'exclamation-circle'
                        size = focused ? 21 : 18
                    } else if (route.name == 'Profile') {
                        iconName = 'user'
                        size = focused ? 21 : 18

                    }

                    return (
                        <FontAwesome5
                            size={size}
                            name={iconName}
                            color={color}
                        />
                    )


                }
            })}

            activeColor='#fff'
            inactiveColor='#fff'
            barStyle={{ backgroundColor: '#4CB963', borderTopWidth: 1, borderTopColor: '#4CB963' }}

        >

            <Tab.Screen
                name='Home'
                component={Home}
            />

            <Tab.Screen
                name='Maps'
                component={Maps}
            />

            <Tab.Screen
                name='Reports'
                component={Reports}
            />

            <Tab.Screen
                name='Profile'
                component={Profile}
            />


        </Tab.Navigator>
    )

}