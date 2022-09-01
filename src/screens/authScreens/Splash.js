import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

import { globalStyle } from '../../styles/GlobalStyles';
import * as Animatable from 'react-native-animatable';

export default function Splash({ navigation }) {

    setTimeout(() => {
        navigation.replace('LoginScreen')
    }, 5000
    );

    return (


        <View style={globalStyle.globalContainer}>

            <Animatable.View 
            style={styles.logoContainer}
            animation='bounceIn'
            >
                <Image
                    style={styles.logo}
                    source={require('../../assets/logoG.png')}
                    resizeMode='stretch'
                />
                <Text style={styles.splashText}>
                    Waste Collection Monitoring System
                </Text>
            </Animatable.View>

        </View>

    )
}

const styles = StyleSheet.create({

    logo: {
        width: 115,
        height: 115
    },

    logoContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    splashText: {
        fontSize: 16,
        color: '#4CB963',
        textAlign: 'center',
        margin: 2

    },

})