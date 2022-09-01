import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

import { globalStyle } from '../styles/GlobalStyles';

export default function Button({ btnName, ...rest }) {
    return (
        <TouchableOpacity
            style={globalStyle.buttonStyle}
            {...rest}
        >
            <Text style={globalStyle.buttonText}>
                {btnName}
            </Text>
        </TouchableOpacity>
    )
}
