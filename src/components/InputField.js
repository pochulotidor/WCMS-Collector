import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { height, width } from '../utils/dimensions';

export default function Inputfield({ placeholder, value, ...rest }) {

    return (

        <TextInput
            style={styles.input}
            {...rest}
            placeholder={placeholder}
            value={value}

        />

    )

}

const styles = StyleSheet.create({
    input: {
        height: height / 20,
        width: width / 1.3,
        borderBottomWidth: 1,
        borderBottomColor: '#4CB963'
    }

})