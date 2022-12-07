import { View, Text, Dimensions, StyleSheet } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import MapView, { Marker } from 'react-native-maps'
import { useTranslation } from 'react-i18next';
const { width, height } = Dimensions.get('window')
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
export default function MapHotel({ navigation, route }) {
    const { t } = useTranslation();
    const hotel = route.params
    return (
        <View>
            <View style={styles.header}>
                <Icon
                    name="arrow-back-ios"
                    size={28}
                    color="black"
                    onPress={navigation.goBack}
                    style={{ paddingLeft: 10 }}
                />
                <Text style={{ color: 'black', fontSize: 18, fontWeight: 'bold', marginRight: 10 }}>{t('map')}</Text>
                <Icon
                    name="arrow-back-ios"
                    size={0}
                />
            </View>
            <MapView
                style={{ height: '100%', width: 400 }}
                initialRegion={{
                    latitude: hotel.position[0],
                    longitude: hotel.position[1],
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                }}
            >
                <Marker
                    coordinate={{
                        latitude: hotel.position[0],
                        longitude: hotel.position[1],
                    }}
                />
            </MapView>
        </View>
    )
}
const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 50,
        width: width,
        position: 'absolute',
        zIndex: 1,
        top: 0,
        backgroundColor: 'white',
        elevation: 10,
    }
})