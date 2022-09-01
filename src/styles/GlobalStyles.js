import { StyleSheet } from 'react-native';
import { height,width } from '../utils/dimensions';

export const globalStyle = StyleSheet.create({

    globalContainer: {

        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },

    buttonStyle: {

        alignItems: 'center',
        justifyContent: 'center',
        width: width / 2,
        height: height / 20,
        borderRadius: 15,
        marginTop: 15,
        backgroundColor: '#4CB963',

    },

    buttonText: {
        fontSize: 15,
        color: '#fff'
    },

    loginLogo: {
        height: 90,
        width: 90,

    },

    Logintext: {
        textAlign: 'center',
        color: '#4CB963',
        fontSize: 20,
        margin: 5
    },
})