import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, FlatList } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { customStyleMap } from '../global/index';
import { globalStyles } from '../global/globalStyles';
import firestore from '@react-native-firebase/firestore'

//7,15,25

export default function Home() {

    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        const subscriber = firestore()
            .collection('citizen_reports')
            .where('complete', '==', false)
            //.orderBy('reportTime', 'desc')
            .onSnapshot(querySnapshot => {
                const reports = [];

                querySnapshot.forEach(documentSnapshot => {
                    reports.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id,
                    });


                });

                setReports(reports);
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



    const header = () => {
        return (
            <View
                style={{
                    backgroundColor: '#ffffff'
                }}
            >
                <Text
                    style={{ fontSize: 25, fontWeight: 'bold', marginLeft: 5 }}
                >
                    Citizen Reports
                </Text>
            </View>
        )
    }

    return (
        <View>

            <FlatList
                data={reports}
                ListHeaderComponent={header}
                renderItem={({ item }) => (


                    <View
                        style={{ flex: 1, backgroundColor: '#ffffff', alignItems: 'center', justifyContent: 'center' }}
                    >

                        <View
                            style={globalStyles.reportCard}
                        >
                            <View
                                style={globalStyles.cardHeader}
                            >

                                <Text
                                    style={globalStyles.cardText}
                                >
                                    Date of report: {[item.reportTime.toDate().toString()]}
                                </Text>

                            </View>

                            <MapView
                                pitchEnabled={false}
                                rotateEnabled={false}
                                zoomEnabled={false}
                                scrollEnabled={false}
                                customMapStyle={customStyleMap}
                                style={globalStyles.map}
                                provider={PROVIDER_GOOGLE}
                                maxZoomLevel={17.5} // 👈
                                loadingEnabled={true} // 👈
                                initialRegion={{
                                    latitude: item.loc.latitude,
                                    longitude: item.loc.longitude,
                                    latitudeDelta: 0.0922,
                                    longitudeDelta: 0.0421
                                }}
                            >
                                <Marker
                                    coordinate={item.loc}
                                >




                                </Marker>
                            </MapView>

                        </View>

                    </View>







                )}
            />

        </View>

    )
}