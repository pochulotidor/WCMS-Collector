import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';

export default function Record({ btnTitle, distance , act}) {
    return (

        <View
            style={styles.wrapper}
        >

            <TouchableOpacity
               
            >

                <Text
                    style={styles.text}
                >
                    {btnTitle}
                </Text>

              

            </TouchableOpacity>



        </View>
    )
}

const styles = StyleSheet.create({

    wrapper: {
        flexDirection: 'row',
        margin: 5
    },

    text: {
        fontSize: 25,
        color: '#fff',
        fontWeight: 'bold'
    }
})