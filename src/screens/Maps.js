import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Modal,
    TouchableOpacity,
    Alert,
    Image,
    Dimensions
} from 'react-native';

import MapView, { PROVIDER_GOOGLE, Marker, Polyline, Polygon } from 'react-native-maps';
import { globalStyles } from '../global/globalStyles';
import Geolocation, { clearWatch } from 'react-native-geolocation-service'; // 👈
import { customStyleMap } from '../global/index';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

import auth from '@react-native-firebase/auth';

import haversine from 'haversine';

import firestore from '@react-native-firebase/firestore';

const { height, width } = Dimensions.get('screen');

export default function Maps({ navigation }) {

    const collector = auth().currentUser;
    const [location, setLocation] = useState(); // location state
    const [reports, setReports] = useState(null); // reports that can be shown in maps
    const [recording, setRecording] = useState(false); // to record the activity

    const [routeCoordinates, setRouteCoordinates] = useState([]);
    const [distanceTravelled, setDistanceTravelled] = useState(0);
    const [prevLatLng, setPrevLatLng] = useState({});
    const [start, setStart] = useState();
    const [currentLoc, setCurrentLoc] = useState(0);


    useEffect(() => {
        if (recording) {
            firestore()
                .collection('realtime')
                .doc(collector.uid)
                .update({
                    isActive: true,
                    location: currentLoc
                })
        } else {
            return;
        }
    }, [recording, currentLoc])

    const toggle = () => {
        setRecording(!recording);
    }

    const formatNumber = number => `0${number % 60}`.slice(-2);
    const getRemainingSec = (time) => {
        const hour = Math.floor(time / 3600);
        const mins = Math.floor(time / 60);
        const sec = time - mins * 60;
        return { hour: formatNumber(hour), mins: formatNumber(mins), sec: formatNumber(sec) }
    }

    const [remainingSec, setRemainingSec] = useState(0);
    const { hour, mins, sec } = getRemainingSec(remainingSec);


    useEffect(() => {


        if (recording) {

            const watchId = Geolocation.watchPosition(
                position => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    const newCoordinate = {

                        latitude,
                        longitude

                    };

                    setCurrentLoc({ latitude, longitude });
                    setStart({ latitude, longitude });
                    setRouteCoordinates(routeCoordinates.concat([newCoordinate]));
                    setDistanceTravelled(distanceTravelled + calcDistance(newCoordinate));
                    setPrevLatLng(newCoordinate);
                    //console.log(routeCoordinates);
                    //console.log(distanceTravelled)
                },
                error => alert(error.message),
                { enableHighAccuracy: true, timeout: 3000, maximumAge: 1000 },
            );
            return () => Geolocation.clearWatch(watchId);
        } else if (!recording) {
            return;
        }



    }, [recording, routeCoordinates]);


    useEffect(() => {
        let interval = null;

        if (recording) {
            interval = setInterval(() => {
                setRemainingSec(remainingSec => remainingSec + 1)
            }, 1000);
        } else if (!recording && remainingSec !== 0) {
            clearInterval(interval);

        }
        return () => clearInterval(interval);

    }, [recording, remainingSec])

    const clear = () => {

        setRemainingSec(0)
        setRecording(false)
        setDistanceTravelled(0)
        setRouteCoordinates([])
        setPrevLatLng({})
        Alert.alert('Activity cleared.')
    }

    const reset = () => {
        Alert.alert(
            'Clear activity',
            'Are you sure you want to clear the activity?',
            [
                {
                    text: 'Cancel'
                },

                {
                    text: 'Ok', onPress: () => clear()
                }
            ],
            { cancelable: true }
        )
    }


    ////////// For getting the report coordinates //////////
    useEffect(() => {
        const subscriber = firestore()
            .collection('citizen_reports')
            .where('complete', '==', false)
            .onSnapshot(querySnapshot => {
                const reports = [];

                querySnapshot.forEach(documentSnapshot => {
                    const citiReports = documentSnapshot.data();
                    citiReports.id = documentSnapshot.id;
                    reports.push(citiReports);
                });

                setReports(reports);

            });

        // Unsubscribe from events when no longer in use
        return () => subscriber();
    }, []);
    ///////////////////////////////////////END


    //////// saving to the database all the activity/////////
    const save = async () => {
        firestore()
            .collection('activity')
            .add({
                distance: distanceTravelled,
                date: firestore.Timestamp.fromDate(new Date()),
                time: remainingSec,
                collector: collector.uid,
                track: routeCoordinates,
                startingPoint: start
            })
            .then(() => {
                console.log('Report Submitted!');
                Alert.alert('Activity recorded');
            })
            .catch(error => {
                console.log(
                    'Something went wrong with added post to firestore.',
                    error,
                );
                Alert.alert('Something went wrong please try again.');
            });

        setRemainingSec(0)
        setRecording(false)
        setDistanceTravelled(0)
        setRouteCoordinates([])
        setPrevLatLng({})
    };

    const stopBroadcast = () => {
        firestore()
            .collection('realtime')
            .doc(collector.uid)
            .update({
                isActive: false,
            })
    };

    const finish = () => {
        Alert.alert(
            'Finish activity',
            'Are you sure you want to save activity? ',
            [
                { text: 'No' },
                { text: 'Yes', onPress: () => { save(); stopBroadcast(); } }
            ],
            { cancelable: true }
        )
    }
    ////////////////////////////////////END

    ////////////////Handling permission regarding the use of location////////////////
    const handlePermission = async () => {

        let permissionCheck = '';

        if (Platform.OS === 'android') {
            permissionCheck = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

            if (
                permissionCheck === RESULTS.BLOCKED ||
                permissionCheck === RESULTS.DENIED
            ) {
                const permissionRequest = await request(
                    PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
                );
                permissionRequest === RESULTS.GRANTED
                    ? console.warn('Location permission granted.')
                    : console.warn('location permission denied.');
            }
        }

    };


    useEffect(() => {
        handlePermission()
    }, [])
    ////////////////////////////////////////END


    ///////////////////Getting the current location of the user//////////////////

    useEffect(() => { // 👈
        Geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords
                setLocation({ latitude, longitude })
                console.log(latitude, longitude)
            },
            error => {
                console.log(error.code, error.message)
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        )
    }, [])

    /////////////////////////////////////////END

    ///////////////Formula for calculating the distance///////////////
    const calcDistance = newLatLng => {
        prevLatLng;
        return haversine(prevLatLng, newLatLng) || 0;
    };
    /////////////////////////EMD

    return (
        <View style={globalStyles.container}>
            {location && (
                <MapView
                    customMapStyle={customStyleMap}
                    style={styles.map}
                    followsUserLocation={true}
                    provider={PROVIDER_GOOGLE}
                    maxZoomLevel={20.5} // 👈
                    loadingEnabled={true} // 👈
                    zoomEnabled={true}
                    paddingAdjustmentBehavior="always"
                    loadingIndicatorColor="#fff" // 👈
                    loadingBackgroundColor="#4CB963" // 👈
                    initialRegion={{
                        latitude: location.latitude,
                        longitude: location.longitude,
                        latitudeDelta: 0.0522,
                        longitudeDelta: 0.0521,
                    }}
                    showsUserLocation={true}
                    showsMyLocationButton={true}>
                    {reports
                        ? reports.map(reports => (
                            <Marker
                                key={reports.id}
                                coordinate={reports.loc}
                                title="Location of the report"
                                description={reports.reportTime.toDate().toDateString()}
                                onPress={() => navigation.navigate('ReportDetails', { Img: reports.img, latitude: reports.loc.latitude, longitude: reports.loc.longitude, Id: reports.id, time: reports.reportTime, reporter: reports.reporter })}>
                                <FontAwesome5 size={25} name={'trash'} color={'#950101'} />

                            </Marker>

                        ))
                        : null}

                    <Polyline
                        coordinates={routeCoordinates}
                        strokeWidth={5}
                        strokeColor='#4CB963'
                    />

                


                </MapView>
            )}


            <View
                style={styles.display}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginRight: 5,
                        borderRightWidth: 0.3
                    }}
                >
                    <View
                        style={{
                            alignItems: 'center',
                            borderRightWidth: 0.3
                        }}
                    >
                        <Text>
                            Time
                        </Text>
                        <Text
                            style={{ fontSize: 18, color: '#000', fontWeight: 'bold', margin: 5 }}
                        >
                            {`${hour}:${mins}:${sec}`}
                        </Text>
                    </View>

                    <View
                        style={{
                            alignItems: 'center'
                        }}
                    >
                        <Text>
                            Distance
                        </Text>

                        <Text
                            style={{ fontSize: 18, color: '#000', fontWeight: 'bold', margin: 5 }}
                        >
                            {parseFloat(distanceTravelled).toFixed(2)} km
                        </Text>
                    </View>

                </View>

                <View
                    style={{
                        flexDirection: 'row'
                    }}
                >
                    <TouchableOpacity
                        style={styles.recordBtn}
                        onPress={toggle}
                    >
                        <Text>
                            {recording ? 'Pause' : 'Start'}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.recordBtn}
                        onPress={reset}
                    >
                        <Text>
                            Reset
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.recordBtn}
                        onPress={finish}
                    >
                        <Text>
                            Finish
                        </Text>
                    </TouchableOpacity>
                </View>




            </View>


        </View>
    );
}

const styles = StyleSheet.create({
    map: {
        //...StyleSheet.absoluteFill,
        width: '100%',
        height: '85%'
    },

    display: {
        width: '100%',
        height: '15%',
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },

    recordBtn: {
        width: width / 8,
        height: height / 16,
        borderWidth: 2,
        borderColor: 'green',
        backgroundColor: '#fff',
        borderRadius: 180,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 3
    }
});
