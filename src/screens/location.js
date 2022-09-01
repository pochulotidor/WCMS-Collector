import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { customStyleMap } from '../global';



export default function Location({ route }) {
    
    const { latitude, longitude } = route.params;

    return (

        <View
            style={styles.coontainer}
        >
            <MapView
                customMapStyle={customStyleMap}
                style={styles.maps}
                provider={PROVIDER_GOOGLE}
                initialRegion={{
                    latitude: latitude,  // 👈
                    longitude: longitude,// 👈
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                showsUserLocation={true}
            >
                <Marker
                    coordinate={{latitude: latitude,longitude: longitude}}
                
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