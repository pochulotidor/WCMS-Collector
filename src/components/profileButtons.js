import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get('screen');

export default function ProfileButtons({ btnName, icon, ...rest }) {

    return (
        <TouchableOpacity
            style={styles.btn}
        >

            <Text
                style={styles.text}
            >
                {btnName}
            </Text>

        </TouchableOpacity>
    )

}

const styles = StyleSheet.create({
    btn: {
        width: width / 4,
        height: height / 10,
        borderRadius: 15,
        backgroundColor: '#4CB963',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5

    },

    text: {
        fontSize: 15,
        color: '#fff'
    }
})