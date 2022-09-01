import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import MapView, { PROVIDER_GOOGLE, Polyline, Marker } from "react-native-maps";
import { customStyleMap } from '../global/index';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';



export default function History() {

    const collector = auth().currentUser;
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true)
    const formatNumber = number => `0${number % 60}`.slice(-2);
    const getRemainingSec = (time) => {
        const hour = Math.floor(time / 3600);
        const mins = Math.floor(time / 60);
        const sec = time - mins * 60;
        return { hour: formatNumber(hour), mins: formatNumber(mins), sec: formatNumber(sec) }
    }

    useEffect(() => {

        const subscriber = firestore()
            .collection('activity')
            .where('collector', '==', collector.uid)
            //.orderBy('date', 'desc')
           //.limitToLast(5)
            .onSnapshot(querySnapshot => {
                const data = [];


                querySnapshot.forEach(documentSnapshot => {
                    data.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id,
                    });

                });

                setHistory(data);
                setLoading(false);
            });



        // Unsubscribe from events when no longer in use
        return () => subscriber();


    }, []);

    if (loading) {
        return (
            <View
                style={{
                    alignItems: 'center', justifyContent: 'center', flex: 1
                }}
            >
                <ActivityIndicator size="large" color="#4CB963" />
            </View>
        )
    }

    return (
        <View>
            <FlatList
                data={history}
                renderItem={({ item }) => (
                    <View
                        style={{ flex: 1, backgroundColor: '#ffffff', alignItems: 'center', justifyContent: 'center' }}
                    >

                        <View
                            style={styles.reportCard}
                        >
                            <View
                                style={styles.cardHeader}
                            >

                                <Text
                                    style={styles.cardText}
                                >
                                    Activity ID: {item.key}
                                </Text>

                                <Text
                                    style={styles.cardText}
                                >
                                    {[item.date.toDate().toDateString()]}
                                </Text>

                            </View>

                            <MapView
                                pitchEnabled={false}
                                rotateEnabled={false}
                                customMapStyle={customStyleMap}
                                style={styles.map}
                                provider={PROVIDER_GOOGLE}
                                zoomEnabled={false}
                                maxZoomLevel={17.5} // 👈
                                loadingEnabled={true} // 👈
                                region={{
                                    latitude: item.startingPoint.latitude,
                                    longitude: item.startingPoint.longitude,
                                    latitudeDelta: 0.0922,
                                    longitudeDelta: 0.0421
                                }}
                            >

                                <Polyline
                                    coordinates={item.track}
                                    strokeWidth={5}
                                    strokeColor={'#4CB963'}
                                />

                                <Marker
                                    coordinate={item.startingPoint}
                                >
                                    <FontAwesome5Icon
                                        name='flag-checkered'
                                        size={20}
                                        color={'#fff'}
                                    />
                                </Marker>




                            </MapView>
                            <View
                                style={styles.cardFooter}
                            >
                                <View >
                                    <Text
                                        style={styles.cardText}
                                    >
                                        Distance


                                    </Text>

                                    <Text
                                        style={{
                                            fontSize: 20,
                                            color: '#232323',
                                            marginLeft: 8,
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        {parseFloat(item.distance).toFixed(2)} km
                                    </Text>
                                </View>

                                <View
                                    style={{
                                        marginLeft: 8,
                                        borderLeftWidth: 0.3
                                    }}
                                >
                                    <Text
                                        style={styles.cardText}
                                    >
                                        Time


                                    </Text>

                                    <Text
                                        style={{
                                            fontSize: 20,
                                            color: '#232323',
                                            marginLeft: 8,
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        {getRemainingSec(item.time).hour} : {getRemainingSec(item.time).mins} : {getRemainingSec(item.time).sec}
                                    </Text>
                                </View>


                            </View>
                        </View>

                    </View>







                )}
            />


        </View>
    )

}

const styles = StyleSheet.create({
    reportCard: {
        width: '100%',
        height: 450,
        borderRadius: 15,
        margin: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        borderTopWidth: 0.3
    },

    cardHeader: {
        height: '15%',
        width: '100%',
        backgroundColor: '#fff',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        justifyContent: 'center'
    },

    cardFooter: {
        width: '100%',
        height: '15%',
        backgroundColor: '#fff',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        alignItems: 'center',
        flexDirection: 'row'
    },

    cardText: {
        fontSize: 15,
        color: '#232323',
        marginLeft: 8,
        fontWeight: 'bold'
    },

    map: {

        width: '100%',
        height: '70%',


    },

})