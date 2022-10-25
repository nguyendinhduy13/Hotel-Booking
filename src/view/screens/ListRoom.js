import React, { useState, useRef, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/Feather';
import Icon4 from 'react-native-vector-icons/FontAwesome5';
import firestore from '@react-native-firebase/firestore';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { useDispatch } from 'react-redux';
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
    PanResponder,
    TouchableHighlight,
} from 'react-native';
import COLORS from '../../consts/colors';
import { useSelector } from 'react-redux';
import { getDistance } from 'geolib';
import Globalreducer from '../../redux/Globalreducer';
const width = Dimensions.get('screen').width;
const WINDOW_HEIGHT = Dimensions.get('screen').height;
const SHEET_MAX_HEIGHT = WINDOW_HEIGHT * 0.8;
const SHEET_MIN_HEIGHT = WINDOW_HEIGHT * 0.1;
const MAX_UPWARD_TRANSLATE_Y = -SHEET_MIN_HEIGHT - SHEET_MAX_HEIGHT; // negative number
const MAX_DOWNWARD_TRANSLATE_Y = 0;
const DRAG_THRESHOLD = 50;
const ListRoom = ({ navigation, route }) => {
    const dispatch = useDispatch();
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
    const {
        dayamount,
        startday,
        endday,
    } = useSelector((state) => state.Globalreducer);
    const Format = number => {
        var price = number * dayamount;
        return price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    };
    const [distance, setDistance] = useState(0);
    useEffect(() => {
        dispatch(Globalreducer.actions.setnamehotel(item.name))
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
        //dispatch(Globalreducer.actions.setnullvariable(""));
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
    //Bottom Sheet
    const animatedValueBottom = useRef(new Animated.Value(0)).current;
    const lastGestureDy = useRef(0);
    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                animatedValueBottom.setOffset(lastGestureDy.current);
            },
            onPanResponderMove: (e, gesture) => {
                animatedValueBottom.setValue(gesture.dy);
            },
            onPanResponderRelease: (e, gesture) => {
                animatedValueBottom.flattenOffset();
                if (gesture.dy > 0) {
                    // is dragging down
                    if (lastGestureDy.current !== 0 && gesture.dy <= DRAG_THRESHOLD) {
                        springAnimation('up');
                    } else {
                        springAnimation('down');
                    }
                } else {
                    // is dragging up
                    if (gesture.dy >= -DRAG_THRESHOLD) {
                        springAnimation('down');
                    } else {
                        springAnimation('up');
                    }
                }
            },
        }),
    ).current;
    const springAnimation = (direction: 'up' | 'down') => {
        lastGestureDy.current =
            direction === 'down' ? MAX_DOWNWARD_TRANSLATE_Y : MAX_UPWARD_TRANSLATE_Y;
        Animated.spring(animatedValueBottom, {
            toValue: lastGestureDy.current,
            useNativeDriver: true,
        }).start();
    };
    const bottomSheetAnimation = {
        transform: [
            {
                translateY: animatedValueBottom.interpolate({
                    inputRange: [MAX_UPWARD_TRANSLATE_Y, MAX_DOWNWARD_TRANSLATE_Y],
                    outputRange: [MAX_UPWARD_TRANSLATE_Y, MAX_DOWNWARD_TRANSLATE_Y],
                    extrapolate: 'clamp',
                }),
            },
        ],
    };
    //Calendar
    const minday = new Date();
    const [start, setStart] = useState(startday);
    const [startTrue, setStartTrue] = useState(startday);
    const [middle, setMiddle] = useState([])
    const [NumDays, setNumDays] = useState(0);
    const [end, setEnd] = useState(endday);
    const [endTrue, setEndTrue] = useState(endday);
    const handleOpenCalendar = () => {
        springAnimation('up');
        setStart(startTrue)
        setEnd(endTrue)
    }
    useEffect(() => {
        if (start != '' && end != '') {
            const bd = start.split('-')
            const kt = end.split('-')
            const arr = []
            if (kt[1] == bd[1]) {
                const sub = (kt[2] - bd[2])
                for (let i = 1; i < sub; i++) {
                    var day = kt[2] - i < 10 ? '0' + (kt[2] - i) : kt[2] - i
                    arr.push(`${kt[0]}-${kt[1]}-${day}`)
                }
            }
            else {
                var maxDayOfMonth = new Date(bd[0], bd[1], 0).getDate();
                const sub = (maxDayOfMonth - bd[2])
                for (let i = 1; i <= sub; i++) {
                    arr.push(`${bd[0]}-${bd[1]}-${(bd[2] - 0) + i}`)
                }
                for (let i = 1; i < kt[2]; i++) {
                    var day = i < 10 ? '0' + i : i
                    arr.push(`${kt[0]}-${kt[1]}-${day}`)
                }
            }
            setMiddle(arr)
        }
    }, [end])
    const handleTest = (day) => {
        if (start !== "" && end !== "") {
            setStart(day.dateString)
            setEnd('')
            setMiddle([])
        }
        if (start === "") {
            setStart(day.dateString)
        }
        else if (end === "" && day.dateString > start) {
            setEnd(day.dateString)
        }
        else if (day.dateString < start) {
            setStart(day.dateString)
        }
    }
    const handleConfirm = () => {
        springAnimation('down');
        setStartTrue(start)
        setEndTrue(end)
        console.log(middle.length + 1)
        dispatch(Globalreducer.actions.changedayamount(middle.length + 1))
        dispatch(Globalreducer.actions.changestartday(start))
        dispatch(Globalreducer.actions.changeendday(end));
    }
    const formatDayShow = (day) => {
        if (day != '') {
            return day.split('-')[2] + ' tháng ' + day.split('-')[1]
        }
        return ''
    }
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
                <View style={{ paddingHorizontal: 15, paddingBottom: 100 }}>
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
                                <View>
                                    <View style={{ paddingHorizontal: 15, paddingVertical: 5 }}>
                                        <Text
                                            style={{
                                                fontSize: 20,
                                                height: 25,
                                                color: 'black',
                                            }}>
                                            {items.name}
                                        </Text>
                                        <View style={{ flexDirection: 'row', paddingVertical: 5 }}>
                                            {items.icon.map((item, index) => (
                                                index < 2 ?
                                                    <View key={index} style={{ alignContent: 'center', justifyContent: 'flex-start', marginRight: 10 }}>
                                                        <Text style={{ color: 'gray', fontSize: 14 }}>
                                                            {items.tienich[index]} <Text style={{ color: 'black' }}>{index == 0 ? ' |' : ''}</Text>
                                                        </Text>
                                                    </View>
                                                    : <></>
                                            ))
                                            }
                                        </View>
                                        <Text style={{ color: 'black', fontSize: 14, marginTop: 5, fontWeight: '500' }}>{dayamount} ngày</Text>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
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
                                            <View style={{ width: 100, height: 35, alignItems: 'center', justifyContent: 'center', borderRadius: 5, backgroundColor: COLORS.primary }}>
                                                <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold' }}>Chọn phòng</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>

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
            <Animated.View style={[styles.bottomSheet, bottomSheetAnimation]}>
                <View style={styles.draggableArea} {...panResponder.panHandlers}>
                    <Text style={{ color: 'orange', fontSize: 18, fontWeight: 'bold', paddingBottom: 15 }}>Chọn ngày đặt phòng</Text>
                    <View style={{ flexDirection: 'row', }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "space-around", width: '95%', height: 60, backgroundColor: '#f3f6f4', borderRadius: 10 }}>
                            <View style={{ width: '33%' }}>
                                <Text style={{ fontSize: 14 }}>Nhận phòng</Text>
                                <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}>{formatDayShow(start)}</Text>
                            </View>
                            <Icon4 name="long-arrow-alt-right" size={25} color="orange" />
                            <View style={{ width: '33%' }}>
                                <Text style={{ fontSize: 14 }}>Trả phòng</Text>
                                <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}>{formatDayShow(end)}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ marginTop: 10 }}>
                    <Calendar
                        markingType={'period'}
                        markedDates={
                            {
                                [start]: { startingDay: true, color: '#50cebb', textColor: 'white' },
                                [end]: { endingDay: true, color: '#50cebb', textColor: 'white' },
                                ...middle.reduce((acc, cur) => {
                                    acc[cur] = { startingDay: false, endingDay: false, color: '#70d7c7', textColor: 'white' }
                                    return acc
                                }, {}),
                            }
                        }
                        onDayPress={(day) => handleTest(day)}
                        hideExtraDays={true}
                        minDate={minday}
                    />
                </View>
                <View style={{ position: 'absolute', zIndex: 1, bottom: 15, borderTopWidth: 1, borderTopColor: 'gray', width: '100%', height: 60, justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity
                        onPress={() => { handleConfirm() }}
                        disabled={end == "" ? true : false}
                        style={{ width: '90%', height: 40, backgroundColor: end == "" ? '#d1bebd' : '#f44336', borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: 'white', fontSize: 17, fontWeight: 'bold' }}>Xác nhận</Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>
            <TouchableOpacity style={styles.bottomSheet1} onPress={() => { handleOpenCalendar() }}>
                <View style={{ padding: 15 }}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'black' }}>Ngày đặt phòng</Text>
                    <View style={{ flexDirection: 'row', marginTop: 10, }}>
                        <Text style={{ color: 'black', textDecorationStyle: 'dashed', textDecorationLine: 'underline', fontSize: 15, fontWeight: 'bold', }}>{formatDayShow(startTrue) + " - " + formatDayShow(endTrue)}</Text>
                    </View>
                </View>
            </TouchableOpacity>
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
});

export default ListRoom;
