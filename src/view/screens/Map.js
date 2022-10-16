
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Dimensions, PermissionsAndroid } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useSelector } from 'react-redux';
import { getDistance } from 'geolib';
import CurrentPosition from '../../redux/CurrentPosition';
const Map = () => {

    const { width, height } = Dimensions.get('window')
    const ASPECT_RATIO = width / height
    const LATITUDE_DELTA = 0.0922
    const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO
    const mapRef = useRef(null)
    const currentPosition = useSelector(state => state.currentPosition)
    const [region, setRegion] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0,
    });

    useEffect(() => {
        if (currentPosition.latitude && currentPosition.longitude) {
            setRegion({
                latitude: currentPosition.latitude,
                longitude: currentPosition.longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            })
        }
    }, []);
    const [posi, Setposi] = useState({
        latitude: 0,
        longitude: 0,
    });
    const calculateDistance = (e) => {
        Setposi({
            latitude: e.latitude,
            longitude: e.longitude,
        });
        var dis = getDistance(
            { latitude: region.latitude, longitude: region.longitude },
            { latitude: e.latitude, longitude: e.longitude }
        );
        //format the distance to km with 2 decimal places
        var km = (dis / 1000).toFixed(2);
        console.log(km + ' km');
    };
    return (

        <View style={styles.container}>
            <View style={{ backgroundColor: 'red' }}>
                <Text>A</Text>
            </View>
            <MapView
                ref={mapRef}
                onPress={(e) => {
                    calculateDistance(e.nativeEvent.coordinate);
                }}
                onMapReady={() => mapRef.current.fitToCoordinates([posi], {
                    edgePadding: {
                        top: 50,
                        right: 50,
                        bottom: 50,
                        left: 50,
                    }
                })}
                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                style={styles.map}
                region={{
                    latitude: parseFloat(region.latitude),
                    longitude: parseFloat(region.longitude),
                    latitudeDelta: parseFloat(region.latitudeDelta),
                    longitudeDelta: parseFloat(region.longitudeDelta),
                }}
            >
                <Marker
                    coordinate={{ latitude: posi.latitude, longitude: posi.longitude }}
                />
                <Marker
                    coordinate={{ latitude: region.latitude, longitude: region.longitude }}
                />
            </MapView>
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    markerIcon: {
        width: 30,
        height: 30,
    }
});

export default Map
