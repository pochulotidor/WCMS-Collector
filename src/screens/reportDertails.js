import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const { height, width } = Dimensions.get('window');

export default function ReportDetails({ route, navigation }) {

    const collector = auth().currentUser;

    const { Img, latitude, longitude, Id, time, reporter } = route.params;

    const Collect = async id => {
        firestore()
            .collection('citizen_reports')
            .doc(id)
            .update({
                complete: true,
                collectedby: collector.uid,
                dateCollected: firestore.Timestamp.fromDate(new Date())
            })

            .then(() => {
                console.log('updated!');
                Alert.alert('Garbage successully picked up.');
            })

            .catch(error => {
                console.log(
                    'Something went wrong with added post to firestore.',
                    error,
                );
                Alert.alert('Something went wrong please try again.');
            });
    };

    const garbage = () => {
        Alert.alert(
            'Collect garbage',
            'Are you sure you will collect the garbage?',
            [
                { text: 'Cancel' },
                { text: 'Ok', onPress: () => { Collect(Id); navigation.goBack(); }}
            ],
            {cancelable: true}
        )
    }

    return (
        <View
            style={styles.container}
        >

            <View
                style={styles.imgContainer}
            >
                <Image
                    style={styles.imgContainer}
                    source={{ uri: Img }}
                />

            </View>

            <Text>
                Report ID : {Id}
            </Text>


            <Text>
                Latitude: {latitude} Longitude: {longitude}
            </Text>


            <Text>
                Report time : {time.toDate().toDateString()}
            </Text>


            <Text>
                Reported by : {reporter}
            </Text>

            <TouchableOpacity
                style={styles.btn}
                onPress={garbage}
            >
                <Text
                style={styles.btnText}
                >
                    Collect
                </Text>
            </TouchableOpacity>


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },

    imgContainer: {
        height: height / 2,
        width: width,
        
    },

    btn: {
        height: height / 18,
        width: width / 3,
        backgroundColor: '#4CB963',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12
    },

    btnText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#ffffff'
    }
})
