import React, { useState, useRef, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/Entypo';
import Icon4 from 'react-native-vector-icons/AntDesign';
import Icon5 from 'react-native-vector-icons/Octicons';
import Icon6 from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useDispatch } from 'react-redux';
import {
    TouchableOpacity,
    View,
    SafeAreaView,
    ScrollView,
    Text,
    Animated,
    Image,
    StyleSheet,
    Dimensions,
    Modal,
    ToastAndroid,
    Switch,
    Alert,
} from 'react-native';
import COLORS from '../../consts/colors';
import { useSelector } from 'react-redux';
import { getDistance } from 'geolib';
import Globalreducer from '../../redux/Globalreducer';

const width = Dimensions.get('screen').width;
const WINDOW_HEIGHT = Dimensions.get('screen').height;
const SHEET_MAX_HEIGHT = WINDOW_HEIGHT * 0.8;
const SHEET_MIN_HEIGHT = WINDOW_HEIGHT * 0.1;
const InfoHotel = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const item = route.params.data;
    const acc = route.params.account;
    let uid = '';
    acc.forEach(val => {
        if (val._id === item.id) {
            uid = val.uid;
        }
    });
    console.log(uid);
    const mapRef = useRef(null);
    const { height } = Dimensions.get('window');
    const ASPECT_RATIO = width / height;
    const LATITUDE_DELTA = 0.01;
    const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
    const currentPosition = useSelector(state => state.currentPosition);
    const [DataRoom, setDataRoom] = useState([]);
    const [Active, SetActive] = useState(false);
    const ActiveOfHotel = async list => {
        await list.map(i => {
            if (i.id === item.id) {
                SetActive(i.isActive);
            }
        });
    };
    useEffect(() => {
        firestore()
            .collection('ListHotel')
            .doc('ListHotel')
            .onSnapshot(documentSnapshot => {
                ActiveOfHotel(documentSnapshot.data().ListHotel);
            });
    }, []);

    const handleOpen = async () => {
        setModalVisible(true);
    };
    const UpdateActive = async () => {
        const arrayRemove = firestore.FieldValue.arrayRemove({
            id: route.params.data.id,
            name: route.params.data.name,
            advantage: route.params.data.advantage,
            description: route.params.data.description,
            image: route.params.data.image,
            location: route.params.data.location,
            position: route.params.data.position,
            review: route.params.data.review,
            isActive: route.params.data.isActive,
        });
        item.isActive = !item.isActive;
        const arrayUnion = firestore.FieldValue.arrayUnion({
            id: route.params.data.id,
            name: route.params.data.name,
            advantage: route.params.data.advantage,
            description: route.params.data.description,
            image: route.params.data.image,
            location: route.params.data.location,
            position: route.params.data.position,
            review: route.params.data.review,
            isActive: route.params.data.isActive,
        });
        await firestore()
            .collection('ListHotel')
            .doc('ListHotel')
            .update({
                ListHotel: arrayRemove,
            })
            .then(() => {
                console.log('Data deleted!');
            });
        await firestore()
            .collection('ListHotel')
            .doc('ListHotel')
            .update({
                ListHotel: arrayUnion,
            })
            .then(() => {
                console.log('Data hotel added!');
            });
    };

    const toggleSwitch = () => {
        UpdateActive();
    };
    const getTargetHotel = async () => {
        acc.map(i => {
            if (i.id === item.id) {
                console.log(i);
                return i;
            }
        });
    };

    const handleDelete = async () => {
         // //Delete ListHotel
         const arrayRemove = firestore.FieldValue.arrayRemove({
            id: route.params.data.id,
            name: route.params.data.name,
            advantage: route.params.data.advantage,
            description: route.params.data.description,
            image: route.params.data.image,
            location: route.params.data.location,
            position: route.params.data.position,
            review: route.params.data.review,
            isActive: route.params.data.isActive,
        });
        await firestore()
            .collection('ListHotel')
            .doc('ListHotel')
            .update({
                ListHotel: arrayRemove,
            })
            .then(() => {
                console.log('Data deleted!');
            });
            
        // //Delete Account
        await firestore()
            .collection('AdminAccounts')
            .doc(item.id)
            .delete()
            .then(() => {
                console.log('Data account deleted!');
            });
        // //Delete Authenication
       
        // //Delete ListRoom
        await firestore()
            .collection('HotelList')
            .doc(item.id)
            .delete()
            .then(() => {
                console.log('Data account deleted!');
            });
        ToastAndroid.show('Xóa thành công', ToastAndroid.SHORT);
        navigation.navigate('HomeScreen');
    };

    const { dayamount, startday, endday } = useSelector(
        state => state.Globalreducer,
    );
    const Format = number => {
        var price = number * dayamount;
        return price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    };
    const [distance, setDistance] = useState(0);
    useEffect(() => {
        dispatch(Globalreducer.actions.setnamehotel(item.name));
        var dis = getDistance(
            {
                latitude: currentPosition.latitude,
                longitude: currentPosition.longitude,
            },
            { latitude: item.position[0], longitude: item.position[1] },
        );
        //format the distance to km with 2 decimal places
        var km = (dis / 1000).toFixed(1);
        setDistance(km);
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
        //dispatch(Globalreducer.actions.setnullvariable(""));
    }, []);

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
    const [modalVisible, setModalVisible] = useState(false);

    const ShowRoom = () => {
        try {
            return DataRoom.map((items, index) => (
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
                        <View>
                            <View
                                style={{
                                    paddingHorizontal: 15,
                                    paddingVertical: 5,
                                }}>
                                <Text
                                    style={{
                                        fontSize: 20,
                                        height: 25,
                                        color: 'black',
                                    }}>
                                    {items.name}
                                </Text>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        paddingVertical: 5,
                                    }}>
                                    {items.icon.map((item, index) =>
                                        index < 2 ? (
                                            <View
                                                key={index}
                                                style={{
                                                    alignContent: 'center',
                                                    justifyContent:
                                                        'flex-start',
                                                    marginRight: 10,
                                                }}>
                                                <Text
                                                    style={{
                                                        color: 'gray',
                                                        fontSize: 14,
                                                    }}>
                                                    {items.tienich[index]}{' '}
                                                    <Text
                                                        style={{
                                                            color: 'black',
                                                        }}>
                                                        {index == 0 ? ' |' : ''}
                                                    </Text>
                                                </Text>
                                            </View>
                                        ) : (
                                            <></>
                                        ),
                                    )}
                                </View>
                                <Text
                                    style={{
                                        color: 'black',
                                        fontSize: 14,
                                        marginTop: 5,
                                        fontWeight: '500',
                                    }}>
                                    {dayamount} ngày
                                </Text>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                    }}>
                                    <Text
                                        style={{
                                            fontSize: 20,
                                            paddingVertical: 10,
                                            fontWeight: 'bold',
                                            color: 'black',
                                        }}>
                                        {Format(items.price)}{' '}
                                        <Text
                                            style={{
                                                fontSize: 13,
                                                color: 'black',
                                            }}>
                                            đ
                                        </Text>
                                    </Text>
                                    <View
                                        style={{
                                            width: 100,
                                            height: 35,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderRadius: 5,
                                            backgroundColor: COLORS.primary,
                                        }}>
                                        <Text
                                            style={{
                                                color: 'white',
                                                fontSize: 15,
                                                fontWeight: 'bold',
                                            }}>
                                            Chọn phòng
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            ));
        } catch (error) {
            return <></>;
        }
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
                <View style={{ alignItems: 'center', width: '85%' }}>
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
                <Icon3
                    name="dots-three-vertical"
                    size={25}
                    color="black"
                    onPress={() => {
                        handleOpen();
                    }}
                />
            </AnimatedView>
            <AnimatedView style={[styles.HeaderTitle, HeaderAnimatedScroll]}>
                <Icon
                    name="arrow-back-ios"
                    size={28}
                    color={'white'}
                    onPress={navigation.goBack}
                />
                <Icon3
                    name="dots-three-vertical"
                    size={25}
                    color="white"
                    onPress={() => {
                        handleOpen();
                    }}
                />
            </AnimatedView>
            <ScrollView
                onScroll={e => {
                    const currentOffset = e.nativeEvent.contentOffset.y;
                    animatedValue.setValue(currentOffset);
                }}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <TouchableOpacity
                                style={{
                                    width: 50,
                                    height: 5,
                                    position: 'absolute',
                                    zIndex: 1,
                                    top: 10,
                                    alignSelf: 'center',
                                    backgroundColor: 'gray',
                                    borderRadius: 5,
                                }}
                                onPress={() => setModalVisible(false)}>
                                <View />
                            </TouchableOpacity>
                            <View
                                style={{
                                    paddingHorizontal: 10,
                                    paddingVertical: 10,
                                }}>
                                <View
                                    style={{
                                        alignItems: 'center',
                                        flexDirection: 'row',
                                        marginLeft: 4,
                                        justifyContent: 'space-between',
                                    }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Icon5
                                            name="dot-fill"
                                            size={25}
                                            color={Active ? 'green' : 'gray'}
                                            style={{ marginRight: 10 }}
                                        />
                                        <Text
                                            style={{
                                                marginLeft: 20,
                                                fontSize: 15,
                                                color: 'black',
                                                fontWeight: 'bold',
                                            }}>
                                            Khách sạn đang hoạt động
                                        </Text>
                                    </View>
                                    <Switch
                                        trackColor={{
                                            false: '#767577',
                                            true: '#81b0ff',
                                        }}
                                        thumbColor={
                                            Active ? '#f5dd4b' : '#f4f3f4'
                                        }
                                        ios_backgroundColor="#3e3e3e"
                                        onValueChange={toggleSwitch}
                                        value={Active}
                                        style={{ marginLeft: 20 }}
                                    />
                                </View>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        marginTop: 10,
                                    }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Icon4
                                            name="delete"
                                            size={20}
                                            color="black"
                                            style={{ marginRight: 10 }}
                                        />
                                        <Text
                                            style={{
                                                marginLeft: 17,
                                                fontSize: 15,
                                                color: 'black',
                                                fontWeight: 'bold',
                                            }}>
                                            Xóa khách sạn
                                        </Text>
                                    </View>
                                    <Icon6
                                        name="delete-empty"
                                        size={25}
                                        color="red"
                                        style={{
                                            marginRight: 10,
                                        }}
                                        onPress={() => {
                                            Alert.alert(
                                                'Thông báo',
                                                'Bạn có muốn xóa khách sạn này không?\nKhách sạn sẽ không thể khôi phục lại được!!',
                                                [
                                                    {
                                                        text: 'Hủy',
                                                        onPress: () =>
                                                            console.log(
                                                                'Cancel Pressed',
                                                            ),
                                                        style: 'cancel',
                                                    },
                                                    {
                                                        text: 'Đồng ý',
                                                        onPress: () => {
                                                            handleDelete();
                                                        },
                                                    },
                                                ],
                                            );
                                        }}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
                <Image
                    source={{ uri: item.image }}
                    style={{ width: width, height: 300, resizeMode: 'cover' }}
                />
                <View style={{ paddingHorizontal: 15, paddingBottom: 200 }}>
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
                            <Text
                                style={{
                                    fontSize: 15,
                                    color: COLORS.primary,
                                }}>
                                More
                            </Text>
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
                    <View
                        style={{
                            marginTop: 10,
                        }}>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}>
                            <Text
                                style={{
                                    fontSize: 20,
                                    fontWeight: 'bold',
                                    color: 'black',
                                }}>
                                Bản đồ
                            </Text>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate('MapHotel', item);
                                }}>
                                <Text
                                    style={{
                                        fontSize: 15,
                                        fontWeight: 'bold',
                                        color: COLORS.primary,
                                        marginRight: 5,
                                    }}>
                                    Xem
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View
                            style={{
                                width: '99%',
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
                    <ShowRoom />
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
        height: 280,
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
    bottomSheet: {
        position: 'absolute',
        width: '100%',
        height: SHEET_MAX_HEIGHT,
        bottom: -SHEET_MAX_HEIGHT - SHEET_MIN_HEIGHT - 15,
        ...Platform.select({
            android: { elevation: 3 },
            ios: {
                shadowColor: '#a8bed2',
                shadowOpacity: 1,
                shadowRadius: 6,
                shadowOffset: {
                    width: 2,
                    height: 2,
                },
            },
        }),
        backgroundColor: 'white',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        zIndex: 2,
        elevation: 10,
        borderWidth: 1,
        borderColor: '#eeeeee',
    },
    bottomSheet1: {
        position: 'absolute',
        width: '100%',
        height: SHEET_MAX_HEIGHT,
        bottom: -SHEET_MAX_HEIGHT + SHEET_MIN_HEIGHT,
        ...Platform.select({
            android: { elevation: 3 },
            ios: {
                shadowColor: '#a8bed2',
                shadowOpacity: 1,
                shadowRadius: 6,
                shadowOffset: {
                    width: 2,
                    height: 2,
                },
            },
        }),
        backgroundColor: 'white',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        zIndex: 1,
        elevation: 10,
        borderWidth: 1,
        borderColor: '#eeeeee',
    },
    draggableArea: {
        width: '100%',
        height: 120,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    dragHandle: {
        width: 100,
        height: 6,
        backgroundColor: '#d3d3d3',
        borderRadius: 10,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.05)',
    },
    modalView: {
        width: '90%',
        height: 110,
        margin: 20,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});

export default InfoHotel;
