import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

const ActivityCard = () => {
    return (

        <TouchableOpacity
            style={styles.cardContainer}
        >
            <View
                style={styles.header}
            >
                <View
                    style={styles.upper}
                >
                    <View
                        atyle={styles.imageHolder}
                    >
                        <Text>sad</Text>
                    </View>
                    <Text> ffdsfsd</Text>
                </View>

                <View
                    style={styles.lower}
                >

                </View>



            </View>

            <View
                style={styles.mapHolder}
            >



            </View>


        </TouchableOpacity>

    );
}

export default ActivityCard;

const styles = StyleSheet.create({

    cardContainer: {
        width: '100%',
        height: height / 2,
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',

    },

    header: {
        height: '25%',
        width: '100%',
        backgroundColor: 'green',
        justifyContent: 'center',

    },

    mapHolder: {
        height: '75%',
        width: '100%',
        backgroundColor: 'yellow'
    },

    unameText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#121212',

    },

    upper: {
        width: '100%',
        height: '100%',
        backgroundColor: 'pink',
        alignItems: 'center',
        flexDirection: 'row'

    },

    lower: {
        width: '100%',
        height: '100%',
        backgroundColor: 'blue'

    },

    imageHolder: {
        height: 60,
        width: 60,
        borderRadius: 180,
        backgroundColor: '#000',
        marginLeft: 5
    }


})