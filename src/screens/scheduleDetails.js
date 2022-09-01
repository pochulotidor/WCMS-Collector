import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Polygon } from 'react-native-maps';
import { customStyleMap } from '../global';



export default function ScheduleDetails({ route }) {
    
    const { Location, Initial } = route.params;

    return (

        <View
            style={styles.coontainer}
        >
            <MapView
                customMapStyle={customStyleMap}
                style={styles.maps}
                provider={PROVIDER_GOOGLE}
                initialRegion={{
                    latitude: Initial.latitude,  // 👈
                    longitude: Initial.longitude,// 👈
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                showsUserLocation={true}
            >
                <Polygon
                    coordinates={Location}
                    strokeWidth={5}
                    strokeColor='#4CB963'
                
                />
            </MapView>

        </View>


    )
}

const styles = StyleSheet.create({
    coontainer: {
        flex: 1
    },

    maps: {
        ...StyleSheet.absoluteFill

    }
})