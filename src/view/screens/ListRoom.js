import React, { useState, useRef, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/Feather';
import firestore from '@react-native-firebase/firestore';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import {
    TouchableOpacity,
    View,
    SafeAreaView,
    ScrollView,
    StatusBar,
    Text,
    Animated,
    Image,
    StyleSheet,
    Dimensions,
    Modal,
} from 'react-native';
import COLORS from '../../consts/colors';
import { useSelector } from 'react-redux';
import { getDistance } from 'geolib';
const width = Dimensions.get('screen').width;
const ListRoom = ({ navigation, route }) => {
    const item = route.params;
    const mapRef = useRef(null);
    const { height } = Dimensions.get('window');
    const ASPECT_RATIO = width / height;
    const LATITUDE_DELTA = 0.01;
    const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
    const currentPosition = useSelector(state => state.currentPosition);
    const [DataRoom, setDataRoom] = useState([]);
    const [show, setShow] = useState(false);
    const [showModalInfo, SetshowModalInfo] = useState(false);
    const [ItemShow, setItemShow] = useState(0);
    const Format = number => {
        return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    };
    const [distance, setDistance] = useState(0);
    useEffect(() => {
        var dis = getDistance(
            { latitude: currentPosition.latitude, longitude: currentPosition.longitude },
            { latitude: item.position[0], longitude: item.position[1] }
        );
        //format the distance to km with 2 decimal places
        var km = (dis / 1000).toFixed(1);
        setDistance(km)
    }, []);
    useEffect(() => {
        firestore()
            .collection('HotelList')
            .doc(item.id)
            .get()
            .then(documentSnapshot => {
                const data = documentSnapshot.data();
                setDataRoom(data.Room);
            });
    }, []);

    const handleShow = () => {
        setShow(!show);
    };
    const AnimatedView = Animated.createAnimatedComponent(View);
    const animatedValue = useRef(new Animated.Value(0)).current;
    const HeaderAnimated = {
        opacity: animatedValue.interpolate({
            inputRange: [150, 300],
            outputRange: [0, 1],
        }),
    };
    const HeaderAnimatedScroll = {
        opacity: animatedValue.interpolate({
            inputRange: [0, 300],
            outputRange: [1, 0],
        }),
    };
    return (
        <SafeAreaView style={{ backgroundColor: 'white' }}>
            <AnimatedView style={[styles.HeaderBack, HeaderAnimated]}>
                <Icon
                    name="arrow-back-ios"
                    size={28}
                    color="black"
                    onPress={navigation.goBack}
                />
                <View style={{ alignItems: 'center', paddingRight: 20 }}>
                    <Text
                        style={{
                            fontSize: 18,
                            fontWeight: 'bold',
                            color: 'orange',
                        }}>
                        {item.name}
                    </Text>
                    <Text style={{ textAlign: 'center' }}>{item.location}</Text>
                </View>
                <Icon2 name="heart-outline" size={0} color="black" style={{}} />
            </AnimatedView>

            <AnimatedView style={[styles.HeaderTitle, HeaderAnimatedScroll]}>
                <Icon
                    name="arrow-back-ios"
                    size={28}
                    color={COLORS.white}
                    onPress={navigation.goBack}
                />
                <Icon1 name={'bookmark-o'} size={25} color="white" style={{}} />
            </AnimatedView>
            <ScrollView
                onScroll={e => {
                    const currentOffset = e.nativeEvent.contentOffset.y;
                    animatedValue.setValue(currentOffset);
                }}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}>
                <Image
                    source={{ uri: item.image }}
                    style={{ width: width, height: 300, resizeMode: 'cover' }}
                />
                <View style={{ paddingHorizontal: 15, paddingBottom: 50 }}>
                    <View
                        style={{
                            borderBottomWidth: 1,
                            borderBottomColor: COLORS.primary,
                            paddingVertical: 5,
                        }}>
                        <Text
                            style={{
                                fontSize: 25,
                                fontWeight: 'bold',
                                color: 'black',
                                paddingVertical: 10,
                            }}>
                            {item.name}
                        </Text>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                            <Icon1
                                name="star"
                                size={20}
                                color="orange"
                                style={{ marginLeft: 2 }}
                            />
                            <Text
                                style={{
                                    fontSize: 17,
                                    fontWeight: 'bold',
                                    paddingHorizontal: 5,
                                    color: 'black',
                                }}>
                                {item.review}{' '}
                                <Text style={{ color: 'gray' }}>
                                    (n đánh giá)
                                </Text>
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                paddingVertical: 10,
                            }}>
                            <Icon2
                                name="md-location-sharp"
                                size={25}
                                color="orange"
                                style={{}}
                            />
                            <View
                                style={{
                                    paddingHorizontal: 2,
                                    paddingRight: 20,
                                }}>
                                <Text style={{ color: 'black', fontSize: 15 }}>
                                    <Text style={{ color: 'orange' }}>
                                        ~{distance} km
                                    </Text>{' '}
                                    | {item.location}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View
                        style={{
                            borderBottomWidth: 1,
                            borderBottomColor: COLORS.primary,
                        }}>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginTop: 10,
                            }}>
                            <Text
                                style={{
                                    fontSize: 20,
                                    fontWeight: 'bold',
                                    color: 'black',
                                }}>
                                Mô tả
                            </Text>
                            <TouchableOpacity
                                onPress={() => {
                                    handleShow();
                                }}>
                                <Text
                                    style={{
                                        fontSize: 15,
                                        color: COLORS.primary,
                                    }}>
                                    More
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <Text
                            style={{
                                color: 'black',
                                fontSize: 15,
                                paddingVertical: 10,
                            }}>
                            {item.description}
                        </Text>
                    </View>
                    <View style={{
                        marginTop: 10,
                    }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "space-between" }}>
                            <Text
                                style={{
                                    fontSize: 20,
                                    fontWeight: 'bold',
                                    color: 'black',
                                }}>
                                Bản đồ
                            </Text>
                            <TouchableOpacity onPress={() => { navigation.navigate('MapHotel', item) }}>
                                <Text
                                    style={{
                                        fontSize: 15,
                                        fontWeight: 'bold',
                                        color: COLORS.primary,
                                        marginRight: 5
                                    }}>
                                    Xem</Text>
                            </TouchableOpacity>
                        </View>
                        <View
                            style={{
                                width: "99%",
                                height: 150,
                                marginTop: 10,
                            }}>
                            <MapView
                                ref={mapRef}
                                zoomEnabled={false}
                                scrollEnabled={false}
                                style={{ flex: 1 }}
                                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                                region={{
                                    latitude: item.position[0],
                                    longitude: item.position[1],
                                    latitudeDelta: LATITUDE_DELTA,
                                    longitudeDelta: LONGITUDE_DELTA,
                                }}>
                                <Marker
                                    coordinate={{
                                        latitude: item.position[0],
                                        longitude: item.position[1],
                                    }}
                                />
                            </MapView>
                        </View>
                    </View>
                    <Text
                        style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            color: 'black',
                            paddingVertical: 15,
                        }}>
                        Danh sách phòng
                    </Text>
                    {DataRoom.map((items, index) => (
                        <View key={index}>
                            <TouchableOpacity
                                style={styles.RecentlyBox}
                                onPress={() => {
                                    navigation.navigate('DetailsScreen', items);
                                }}>
                                <View
                                    style={{
                                        width: '100%',
                                        height: 150,
                                        alignSelf: 'center',
                                    }}>
                                    <Image
                                        style={styles.IMGRecent}
                                        source={{ uri: items.image[0] }}
                                    />
                                </View>
                                <View style={{ marginTop: 25 }}>
                                    <View style={{ paddingHorizontal: 15 }}>
                                        <Text
                                            style={{
                                                fontSize: 20,
                                                height: 25,
                                                color: 'black',
                                            }}>
                                            {items.name}
                                        </Text>
                                        <Text
                                            style={{
                                                fontSize: 18,
                                                paddingVertical: 10,
                                                fontWeight: '700',
                                                color: COLORS.primary,
                                            }}>
                                            {Format(items.price)}{' '}
                                            <Text
                                                style={{
                                                    fontSize: 14,
                                                    color: 'gray',
                                                }}>
                                                VND/đêm
                                            </Text>
                                        </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPressIn={() => {
                                    setItemShow(items.id);
                                }}
                                onPressOut={() => {
                                    setItemShow(null);
                                }}
                                style={{
                                    position: 'absolute',
                                    backgroundColor: 'white',
                                    borderRadius: 20,
                                    top: 200,
                                    left: 335,
                                }}>
                                <Icon3 name="info" size={26} color="orange" />
                            </TouchableOpacity>
                            <View
                                style={[
                                    styles.ViewInfo,
                                    { height: items.id == ItemShow ? 170 : 0 },
                                ]}>
                                <Text
                                    style={{
                                        color: COLORS.dark,
                                        fontSize: 20,
                                        fontWeight: '600',
                                    }}>
                                    {items.name}
                                </Text>

                                {ItemShow
                                    ? items.icon.map((item, index) => (
                                        <View
                                            key={index}
                                            style={{
                                                width: 300,
                                                marginTop: 15,
                                                flexDirection: 'row',
                                            }}>
                                            <Image
                                                source={{
                                                    uri:
                                                        index <= 2
                                                            ? item
                                                            : null,
                                                }}
                                                style={{
                                                    width: 30,
                                                    tintColor: COLORS.primary,
                                                }}
                                            />
                                            <Text
                                                style={{
                                                    marginTop: 3,
                                                    marginLeft: 20,
                                                }}>
                                                {index <= 2
                                                    ? items.tienich[index]
                                                    : null}
                                            </Text>
                                        </View>
                                    ))
                                    : null}
                            </View>
                        </View>
                    ))}
                    <View>
                        <Text
                            style={{
                                fontSize: 20,
                                fontWeight: 'bold',
                                color: 'black',
                            }}>
                            Đánh giá
                        </Text>
                        <View style={{ marginTop: 10 }}>
                            <View style={styles.ViewDG}>
                                <View style={{ padding: 10 }}>
                                    <Text
                                        style={{
                                            color: 'black',
                                            fontWeight: 'bold',
                                            fontSize: 17,
                                        }}>
                                        Name
                                        <Text
                                            style={{
                                                color: 'gray',
                                                fontSize: 15,
                                            }}>
                                            {' '}
                                            | Time
                                        </Text>
                                    </Text>
                                    <Text
                                        style={{
                                            color: 'black',
                                            fontWeight: 'bold',
                                            fontSize: 16,
                                            marginTop: 5,
                                        }}>
                                        Name Room
                                    </Text>
                                    <Text style={{ marginTop: 5 }}>
                                        Comment{' '}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    RecentlyBox: {
        width: '100%',
        height: 250,
        color: 'black',
        backgroundColor: COLORS.white,
        marginBottom: 15,
        alignSelf: 'center',
        borderRadius: 10,
        elevation: 15,
        shadowColor: COLORS.black,
        marginBottom: 20,
    },
    IMGRecent: {
        height: '100%',
        width: '100%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        alignItems: 'center',
    },
    HeaderBack: {
        width: width,
        height: 70,
        flexDirection: 'row',
        position: 'absolute',
        zIndex: 1,
        top: 0,
        alignItems: 'center',
        paddingHorizontal: 10,
        borderStyle: 'solid',
        borderBottomWidth: 1,
        borderColor: 'white',
        elevation: 10,
        shadowColor: COLORS.black,
        backgroundColor: '#fffafa',
        justifyContent: 'space-between',
    },
    HeaderTitle: {
        width: width,
        height: 50,
        paddingHorizontal: 10,
        position: 'absolute',
        zIndex: 1,
        top: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    ViewInfo: {
        position: 'absolute',
        zIndex: 1,
        top: 20,
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 10,
        shadowColor: COLORS.black,
        alignItems: 'center',
        alignSelf: 'center',
    },
    ViewDG: {
        width: '100%',
        height: 170,
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 5,
        shadowColor: COLORS.black,
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: '#eeeeee',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});

export default ListRoom;
