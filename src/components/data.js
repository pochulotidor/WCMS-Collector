import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';


const { height, width } = Dimensions.get('window');

export default function DataComponent() {

    const collector = auth().currentUser;
    const [userdata, setUserData] = useState()
    const [loading, setLoading] = useState(false)
    const formatNumber = number => `0${number % 60}`.slice(-2);
    const getRemainingSec = (time) => {
        const hour = Math.floor(time / 3600);
        const mins = Math.floor(time / 60);
        const sec = time - mins * 60;
        return { hour: formatNumber(hour),mins: formatNumber(mins), sec: formatNumber(sec) }
    }
   

    useEffect(() => {

        const subscriber = firestore()
            .collection('activity')
            .where('collector', '==', collector.uid)
            .onSnapshot(querySnapshot => {
                const data = [];

                querySnapshot.forEach(documentSnapshot => {
                    data.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id,
                    });
                });


                setUserData(data);
                setLoading(false);
            });

        // Unsubscribe from events when no longer in use
        return () => subscriber();


    }, []);

    if (loading) {
        return (
            <View
                style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}
            >
                <ActivityIndicator size="large" color="#4CB963" />
            </View>
        )
    }


    return (
        <View
            style={styles.container}
        >
            <View
                style={styles.wrapper}
            >
                <Text>
                    Total distance
                </Text>
                <Text
                    style={{
                        fontSize: 25,
                        fontWeight: 'bold'
                    }}
                >
                    { parseFloat(userdata && userdata.reduce((total, currentvalue) => total = total + currentvalue.distance,0)).toFixed(2)}km
                </Text>

            </View>

            <View
                style={styles.wrapper}
            >
                <Text>
                    Total time
                </Text>

                <Text
                    style={{
                        fontSize: 25,
                        fontWeight: 'bold'
                    }}
                >
                    {getRemainingSec(userdata && userdata.time).hour} : {getRemainingSec(userdata && userdata.time).mins} : {getRemainingSec(userdata && userdata.time).sec}
                </Text>

            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 5,
        marginTop: 5

    },

    wrapper: {
        height: height / 6,
        width: width / 3,
        borderRadius: 15,
        marginLeft: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        backgroundColor: '#4CB963',
        alignItems: 'center',
        justifyContent: 'center'

    }
})