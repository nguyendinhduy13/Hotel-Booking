import React, { useState, useEffect, useRef } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    PermissionsAndroid,
    Image,
    TouchableOpacity,
} from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../../consts/colors";
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useSelector } from 'react-redux';
import { getDistance } from 'geolib';
import CurrentPosition from '../../redux/CurrentPosition';
const Map = ({ navigation, route }) => {
    const Data = route.params;
    const { width, height } = Dimensions.get('window');
    const ASPECT_RATIO = width / height;
    const LATITUDE_DELTA = 0.0922;
    const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
    const mapRef = useRef(null);
    const currentPosition = useSelector(state => state.currentPosition);
    const [region, setRegion] = useState({
        latitude: currentPosition.latitude,
        longitude: currentPosition.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
    });
    const [posi, Setposi] = useState({
        latitude: 0,
        longitude: 0,
    });
    const calculateDistance = e => {
        Setposi({
            latitude: e.latitude,
            longitude: e.longitude,
        });
        var dis = getDistance(
            { latitude: region.latitude, longitude: region.longitude },
            { latitude: e.latitude, longitude: e.longitude },
        );
        //format the distance to km with 2 decimal places
        var km = (dis / 1000).toFixed(2);
        console.log(km + ' km');
    };
    const [DataView, SetDataView] = useState([]);
    return (
        <View style={styles.container}>
            <View style={{ backgroundColor: 'red' }}>
                <Text>A</Text>
            </View>
            <MapView
                ref={mapRef}
                onPress={e => {
                    calculateDistance(e.nativeEvent.coordinate);
                }}
                onMapReady={() =>
                    mapRef.current.fitToCoordinates([posi], {
                        edgePadding: {
                            top: 50,
                            right: 50,
                            bottom: 50,
                            left: 50,
                        },
                    })
                }
                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                style={styles.map}
                region={{
                    latitude: parseFloat(region.latitude),
                    longitude: parseFloat(region.longitude),
                    latitudeDelta: parseFloat(region.latitudeDelta),
                    longitudeDelta: parseFloat(region.longitudeDelta),
                }}>
                {Data.map((item, index) => {
                    return (
                        <Marker
                            key={index}
                            onPress={() => {
                                SetDataView(item);
                            }}
                            coordinate={{
                                latitude: item.position[0],
                                longitude: item.position[1],
                            }}
                            title={item.name}
                            description={item.address}
                            pinColor={'blue'}
                        />
                    );
                })}
                <Marker
                    coordinate={{
                        latitude: region.latitude,
                        longitude: region.longitude,
                    }}
                />
            </MapView>
            <TouchableOpacity style={[styles.ViewHotel, { height: DataView.id == null ? 0 : 100 }]}
                onPress={() => navigation.navigate("ListRoom", DataView)}>
                <Image style={styles.IMGRecent} source={{ uri: DataView.image }} />
                <View style={styles.ViewText}>
                    <Text style={styles.TextName}>{DataView.name}</Text>
                    <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: "space-between", width: '67%' }}>
                        <View style={{ borderWidth: 1, width: DataView.id == null ? 0 : 50, alignItems: 'center', borderColor: 'red' }}>
                            <Text style={{ color: 'red' }}>Ưu đãi</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ color: 'black' }}>{DataView.review}</Text>
                            <Text> (51) </Text>
                            <Icon name="star" size={15} color={COLORS.orange} />
                        </View>
                    </View>
                    <Text style={{ marginVertical: 10, color: 'black', fontSize: 15 }}>{DataView.advantage}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}


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
    },
    ViewHotel: {
        backgroundColor: 'white',
        width: "95%",
        position: 'absolute',
        zIndex: 1,
        bottom: 80,
        borderRadius: 10,
        flexDirection: 'row',
    },
    IMGRecent: {
        height: '100%',
        width: 100,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        alignSelf: 'center',
    },
    ViewText: {
        marginLeft: 10,
    },
    TextName: {
        fontSize: 18,
        fontWeight: "500",
        color: 'black',
    },
});

export default Map;
