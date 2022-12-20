import Auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import slugify from '@sindresorhus/slugify';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Alert,
  Animated,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Modal,
  PanResponder,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Icon5 from 'react-native-vector-icons/AntDesign';
import Icon4 from 'react-native-vector-icons/FontAwesome5';
import Icon3 from 'react-native-vector-icons/Fontisto';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import COLORS from '../../consts/colors';
import Globalreducer from '../../redux/Globalreducer';
const width = Dimensions.get('screen').width;
const WINDOW_HEIGHT = Dimensions.get('screen').height;
const SHEET_MAX_HEIGHT = WINDOW_HEIGHT * 0.8;
const SHEET_MIN_HEIGHT = WINDOW_HEIGHT * 0.1;
const MAX_UPWARD_TRANSLATE_Y = -SHEET_MIN_HEIGHT - SHEET_MAX_HEIGHT; // negative number
const MAX_DOWNWARD_TRANSLATE_Y = 0;
const DRAG_THRESHOLD = 50;
const ListRoom = ({ navigation, route }) => {
  const { t } = useTranslation();
  const star = [1, 2, 3, 4, 5];
  const dispatch = useDispatch();
  const item = route.params;
  const mapRef = useRef(null);
  const { height } = Dimensions.get('window');
  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 0.01;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
  const currentPosition = useSelector((state) => state.currentPosition);
  const [DataRoom, setDataRoom] = useState([]);
  const [DataHotel, setDataHotel] = useState([]);
  const [show, setShow] = useState(false);
  const [starhotel, setStarhotel] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [ratecontent, setRatecontent] = useState('');
  const [checkbook, setCheckbook] = useState(false);
  const { dayamount, startday, endday } = useSelector(
    (state) => state.Globalreducer,
  );
  const Format = (number) => {
    var price = number * dayamount;
    return price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  };
  const user = Auth().currentUser;
  const [distance, setDistance] = useState(0);
  useEffect(() => {
    dispatch(Globalreducer.actions.setnamehotel(item.name));
    dispatch(Globalreducer.actions.setidhotel(item.id));
    // var dis = getDistance(
    //   {
    //     latitude: currentPosition.latitude,
    //     longitude: currentPosition.longitude,
    //   },
    //   { latitude: item.position[0], longitude: item.position[1] },
    // );
    // //format the distance to km with 2 decimal places
    // var km = (dis / 1000).toFixed(1);
    // setDistance(km);
  }, []);
  const handleFilter = async (data) => {
    const temp = data.filter((item) => item.isAvailable === true);
    temp.map(async (item1) => {
      const url = await storage()
        .ref(item.id + '/' + item1.id + '/' + item1.image[0])
        .getDownloadURL();
      item1.image[0] = url;
    });
    setTimeout(() => {
      temp.map((item1) => {
        item1.image.map(async (item2, index) => {
          if (index !== 0) {
            const url = await storage()
              .ref(item.id + '/' + item1.id + '/' + item2)
              .getDownloadURL();
            item1.image[index] = url;
          }
        });
      });
      setDataRoom(temp);
    }, 2000);
  };
  useEffect(() => {
    firestore()
      .collection('HotelList')
      .doc(item.id)
      .onSnapshot((documentSnapshot) => {
        handleFilter(documentSnapshot.data().Room);
      });
  }, []);

  useEffect(() => {
    firestore()
      .collection('ListHotel')
      .doc('ListHotel')
      .get()
      .then((documentSnapshot) => {
        const data = documentSnapshot.data().ListHotel;
        setDataHotel(data);
      });
  }, []);

  useEffect(() => {
    firestore()
      .collection('Booking')
      .doc(user.uid)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          const data = documentSnapshot.data().data;
          data.map((item1) => {
            if (item1.hotelinfo.name === item.name) {
              setCheckbook(true);
            }
          });
        }
      });
  }, []);
  const handleShow = () => {
    setShow(!show);
  };

  const ratehotel = async () => {
    if (!checkbook) {
      Alert.alert('Vui lòng đặt phòng trước khi đánh giá');
    } else {
      DataHotel.map((item1) => {
        if (item1.id === item.id) {
          const timeElapsed = Date.now();
          const today = new Date(timeElapsed);
          const data = {
            content: ratecontent,
            date:
              today.getDate() +
              '/' +
              (today.getMonth() + 1) +
              '/' +
              today.getFullYear(),
            user: user.displayName,
          };
          item1.comments.push(data);
          item1.star.push(starhotel);
        }
      });
      await firestore().collection('ListHotel').doc('ListHotel').set({
        ListHotel: DataHotel,
      });
      setStarhotel(0);
      setRatecontent('');
      setModalVisible(!modalVisible);
    }
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
  const springAnimation = (direction) => {
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
  const [middle, setMiddle] = useState([]);
  const [end, setEnd] = useState(endday);
  const [endTrue, setEndTrue] = useState(endday);
  const handleOpenCalendar = () => {
    springAnimation('up');
    setStart(startTrue);
    setEnd(endTrue);
  };
  useEffect(() => {
    if (start != '' && end != '') {
      const bd = start.split('-');
      const kt = end.split('-');
      const arr = [];
      if (kt[1] == bd[1]) {
        const sub = kt[2] - bd[2];
        for (let i = 1; i < sub; i++) {
          var day = kt[2] - i < 10 ? '0' + (kt[2] - i) : kt[2] - i;
          arr.push(`${kt[0]}-${kt[1]}-${day}`);
        }
      } else {
        var maxDayOfMonth = new Date(bd[0], bd[1], 0).getDate();
        const sub = maxDayOfMonth - bd[2];
        for (let i = 1; i <= sub; i++) {
          arr.push(`${bd[0]}-${bd[1]}-${bd[2] - 0 + i}`);
        }
        for (let i = 1; i < kt[2]; i++) {
          var day = i < 10 ? '0' + i : i;
          arr.push(`${kt[0]}-${kt[1]}-${day}`);
        }
      }
      setMiddle(arr);
    }
  }, [end]);
  const handleTest = (day) => {
    if (start !== '' && end !== '') {
      setStart(day.dateString);
      setEnd('');
      setMiddle([]);
    }
    if (start === '') {
      setStart(day.dateString);
    } else if (end === '' && day.dateString > start) {
      setEnd(day.dateString);
    } else if (day.dateString < start) {
      setStart(day.dateString);
    }
  };
  const handleConfirm = () => {
    springAnimation('down');
    setStartTrue(start);
    setEndTrue(end);
    dispatch(Globalreducer.actions.changedayamount(middle.length + 1));
    dispatch(Globalreducer.actions.changestartday(start));
    dispatch(Globalreducer.actions.changeendday(end));
  };
  const formatDayShow = (day) => {
    if (day != '') {
      return day.split('-')[2] + t('month') + day.split('-')[1];
    }
    return '';
  };
  const checkImage = (image) => {
    const temp = image.split('.');
    return temp[temp.length - 1] === 'jpg' ? null : image;
  };
  console.log('die');
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
            }}
          >
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
          color="white"
          onPress={navigation.goBack}
        />
      </AnimatedView>
      <ScrollView
        onScroll={(e) => {
          const currentOffset = e.nativeEvent.contentOffset.y;
          animatedValue.setValue(currentOffset);
        }}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
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
            }}
          >
            <Text
              style={{
                fontSize: 25,
                fontWeight: 'bold',
                color: 'black',
                paddingVertical: 10,
              }}
            >
              {item.name}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Icon5
                name="star"
                size={20}
                color={COLORS.orange}
                style={{ marginLeft: 2 }}
              />
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: 'bold',
                  paddingHorizontal: 5,
                  color: 'black',
                }}
              >
                {item.review}{' '}
                <Text style={{ color: 'gray' }}>(n {t('evaluate')})</Text>
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 10,
              }}
            >
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
                }}
              >
                <Text style={{ color: 'black', fontSize: 15 }}>
                  <Text style={{ color: 'orange' }}>~{distance} km</Text> |{' '}
                  {item.location}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              marginTop: 10,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: 'black',
                }}
              >
                {t('map')}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('MapHotel', item);
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: 'bold',
                    color: COLORS.primary,
                    marginRight: 5,
                  }}
                >
                  {t('viewmap')}
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: '99%',
                height: 150,
                marginTop: 10,
              }}
            >
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
                }}
              >
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
            }}
          >
            {t('list-rooms')}
          </Text>
          {DataRoom.map((items, index) =>
            items.name === 'Không có phòng trống' ? (
              <View key={index} style={{ alignSelf: 'center' }}>
                <Text
                  style={{ fontSize: 17, color: 'black', fontWeight: 'bold' }}
                >
                  {items.name}
                </Text>
              </View>
            ) : (
              <TouchableOpacity
                key={index}
                style={styles.RecentlyBox}
                onPress={() => {
                  navigation.navigate('DetailsScreen', items);
                }}
              >
                <View
                  style={{
                    width: '100%',
                    height: 150,
                    alignSelf: 'center',
                  }}
                >
                  <Image
                    style={styles.IMGRecent}
                    source={{ uri: checkImage(items.image[0]) }}
                  />
                </View>
                <View>
                  <View style={{ paddingHorizontal: 15, paddingVertical: 5 }}>
                    <Text
                      style={{
                        fontSize: 20,
                        height: 25,
                        color: 'black',
                      }}
                    >
                      {items.name}
                    </Text>
                    <View style={{ flexDirection: 'row', paddingVertical: 5 }}>
                      {items.tienich.map((item, index) =>
                        index < 2 ? (
                          <View
                            key={index}
                            style={{
                              alignContent: 'center',
                              justifyContent: 'flex-start',
                              marginRight: 10,
                            }}
                          >
                            <Text style={{ color: 'gray', fontSize: 14 }}>
                              {item.split(' ')[1] === 'm²'
                                ? item + ' '
                                : t(`${slugify(item)}`)}
                              <Text style={{ color: 'black' }}>
                                {index == 0 ? ' |' : ''}
                              </Text>
                            </Text>
                          </View>
                        ) : (
                          <View key={index}></View>
                        ),
                      )}
                    </View>
                    <Text
                      style={{
                        color: 'black',
                        fontSize: 14,
                        marginTop: 5,
                        fontWeight: '500',
                      }}
                    >
                      {dayamount} {t('day')}
                      {dayamount > 1 && t('day') === 'day' ? 's' : ''}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 20,
                          paddingVertical: 10,
                          fontWeight: 'bold',
                          color: 'black',
                        }}
                      >
                        {Format(items.price)}{' '}
                        <Text
                          style={{
                            fontSize: 13,
                            color: 'black',
                          }}
                        >
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
                        }}
                      >
                        <Text
                          style={{
                            color: 'white',
                            fontSize: 15,
                            fontWeight: 'bold',
                          }}
                        >
                          {t('choose-room')}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ),
          )}
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: COLORS.primary,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: 'black',
                }}
              >
                {t('description')}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  handleShow();
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    color: COLORS.primary,
                  }}
                >
                  {t('show')}
                </Text>
              </TouchableOpacity>
            </View>
            <Text
              style={{
                color: 'black',
                fontSize: 15,
                paddingVertical: 10,
              }}
            >
              {item.description}
            </Text>
          </View>
          <View style={{ marginTop: 20 }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: 'black',
              }}
            >
              {t('review')}
            </Text>
            {DataHotel.map(
              (items) =>
                items.id === item.id &&
                items.comments.map((item1, index) => (
                  <View
                    key={index}
                    style={{
                      marginTop: 10,
                      width: '100%',
                      backgroundColor: 'white',
                      borderRadius: 10,
                      elevation: 5,
                      shadowColor: COLORS.black,
                      alignSelf: 'center',
                      borderWidth: 1,
                      borderColor: '#eeeeee',
                      paddingVertical: 20,
                    }}
                  >
                    <View
                      style={[
                        styles.ViewDG,
                        {
                          justifyContent: 'space-between',
                          paddingHorizontal: 20,
                        },
                      ]}
                    >
                      <View style={{ flexDirection: 'row' }}>
                        <Image
                          source={require('../../assets/avatars.jpg')}
                          style={{
                            width: 50,
                            height: 50,
                            borderRadius: 25,
                          }}
                        />
                        <View style={{ left: 10, top: 5 }}>
                          <Text
                            style={{
                              fontWeight: '700',
                              fontSize: 16,
                              color: 'black',
                            }}
                          >
                            {item1.user}
                          </Text>
                          <Text style={{ fontSize: 13, fontWeight: '400' }}>
                            {item1.date}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          backgroundColor: COLORS.primary,
                          height: 30,
                          width: 55,
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          borderRadius: 15,
                          flexDirection: 'row',
                          paddingHorizontal: 10,
                          top: 10,
                        }}
                      >
                        <Icon5 name="star" size={15} color={COLORS.orange} />
                        <Text style={{ color: 'white' }}>
                          {items.star[index]}
                        </Text>
                      </View>
                    </View>
                    <Text
                      style={{
                        marginHorizontal: 30,
                        fontWeight: '400',
                        fontSize: 14,
                        top: 5,
                      }}
                    >
                      {item1.content}
                    </Text>
                  </View>
                )),
            )}
          </View>
        </View>
      </ScrollView>
      <Animated.View style={[styles.bottomSheet, bottomSheetAnimation]}>
        <View style={styles.draggableArea} {...panResponder.panHandlers}>
          <Text
            style={{
              color: 'orange',
              fontSize: 18,
              fontWeight: 'bold',
              paddingBottom: 15,
            }}
          >
            {t('choice-the-date')}
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
                width: '95%',
                height: 60,
                backgroundColor: '#f3f6f4',
                borderRadius: 10,
              }}
            >
              <View style={{ width: '33%' }}>
                <Text style={{ fontSize: 14 }}>{t('check-in')}</Text>
                <Text
                  style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}
                >
                  {formatDayShow(start)}
                </Text>
              </View>
              <Icon4 name="long-arrow-alt-right" size={25} color="orange" />
              <View style={{ width: '33%' }}>
                <Text style={{ fontSize: 14 }}>{t('check-out')}</Text>
                <Text
                  style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}
                >
                  {formatDayShow(end)}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{ marginTop: 10 }}>
          <Calendar
            markingType={'period'}
            markedDates={{
              [start]: {
                startingDay: true,
                color: '#50cebb',
                textColor: 'white',
              },
              [end]: { endingDay: true, color: '#50cebb', textColor: 'white' },
              ...middle.reduce((acc, cur) => {
                acc[cur] = {
                  startingDay: false,
                  endingDay: false,
                  color: '#70d7c7',
                  textColor: 'white',
                };
                return acc;
              }, {}),
            }}
            onDayPress={(day) => handleTest(day)}
            hideExtraDays={true}
            minDate={String(minday)}
          />
        </View>
        <View
          style={{
            position: 'absolute',
            zIndex: 1,
            bottom: 15,
            borderTopWidth: 1,
            borderTopColor: 'gray',
            width: '100%',
            height: 60,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            onPress={() => {
              handleConfirm();
            }}
            disabled={end == '' ? true : false}
            style={{
              width: '90%',
              height: 40,
              backgroundColor: end == '' ? '#d1bebd' : '#f44336',
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ color: 'white', fontSize: 17, fontWeight: 'bold' }}>
              {t('confirm')}
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
      <TouchableOpacity
        style={styles.bottomSheet1}
        onPress={() => {
          handleOpenCalendar();
        }}
      >
        <View style={{ padding: 15 }}>
          <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'black' }}>
            {t('time-booking')}
          </Text>
          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <Text
              style={{
                color: 'black',
                textDecorationStyle: 'dashed',
                textDecorationLine: 'underline',
                fontSize: 15,
                fontWeight: 'bold',
              }}
            >
              {formatDayShow(startTrue) + ' - ' + formatDayShow(endTrue)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          position: 'absolute',
          alignSelf: 'flex-end',
          borderWidth: 1,
          width: 40,
          height: 40,
          borderRadius: 20,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
          zIndex: 2,
          right: 5,
          bottom: '20%',
          borderColor: COLORS.white,
          shadowColor: COLORS.black,
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Icon3 name="commenting" size={30} color={COLORS.primary} />
      </TouchableOpacity>
      <Modal
        animationType="fade"
        transparent
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <TouchableOpacity
            style={{
              justifyContent: 'flex-end',
              flex: 1,
              backgroundColor: 'rgba(0,0,0,0.5)',
            }}
            onPress={() => {
              setModalVisible(false);
            }}
          >
            <View
              style={{
                height: '75%',
                backgroundColor: 'white',
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                alignItems: 'center',
                paddingTop: 5,
              }}
            >
              <TouchableOpacity
                style={{
                  width: '15%',
                  borderRadius: 20,
                  backgroundColor: '#bcbcbc',
                  height: 5,
                }}
                onPress={() => {
                  setModalVisible(false);
                }}
              />
              <Text
                style={{
                  marginVertical: 25,
                  fontSize: 21,
                  fontWeight: 'bold',
                  color: 'black',
                }}
              >
                Rate the hotel
              </Text>
              <View
                style={{
                  width: '90%',
                  borderRadius: 20,
                  backgroundColor: '#eeeeee',
                  height: 1,
                }}
              />
              <View>
                <View
                  style={{
                    width: '90%',
                    height: 120,
                    color: 'black',
                    backgroundColor: COLORS.white,
                    marginBottom: 10,
                    marginTop: 20,
                    alignSelf: 'center',
                    borderRadius: 20,
                    elevation: 5,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <View
                    style={{
                      width: 120,
                      height: 110,
                      right: 5,
                    }}
                  >
                    <Image
                      style={styles.IMGRecent}
                      source={{
                        uri: item.image,
                      }}
                    />
                  </View>
                  <View style={{ left: 10 }}>
                    <View
                      style={{
                        marginTop: 10,
                        flexDirection: 'row',
                      }}
                    >
                      <View
                        style={{
                          width: 200,
                        }}
                      >
                        <View
                          style={{
                            width: 120,
                            height: 29,
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 17,
                              fontWeight: 'bold',
                              color: 'black',
                            }}
                          >
                            {item.name}
                          </Text>
                        </View>
                        <View
                          style={{
                            height: 40,
                            justifyContent: 'center',
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 15,
                            }}
                          >
                            {item.location}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        width: 180,
                        paddingVertical: 10,
                      }}
                    >
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          width: 160,
                        }}
                      >
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}
                        >
                          <Icon5 name="star" size={15} color={COLORS.orange} />
                          <Text
                            style={{
                              color: COLORS.primary,
                              fontWeight: 'bold',
                              fontSize: 15,
                              marginLeft: 5,
                            }}
                          >
                            5.0
                          </Text>
                        </View>
                        <Text
                          style={{
                            marginLeft: 15,
                          }}
                        >
                          (5 reviews)
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: 'black',
                }}
              >
                Please give your rating & review
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 10,
                  justifyContent: 'space-between',
                  width: '55%',
                  marginVertical: 5,
                }}
              >
                {star.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      setStarhotel(item);
                    }}
                    style={{
                      elevation: 15,
                    }}
                  >
                    <Icon5
                      name="star"
                      size={30}
                      color={
                        index + 1 <= starhotel ? COLORS.orange : COLORS.grey
                      }
                    />
                  </TouchableOpacity>
                ))}
              </View>
              <TextInput
                style={{
                  width: '90%',
                  borderWidth: 1,
                  borderColor: '#f3f6f4',
                  height: 80,
                  textAlignVertical: 'top',
                  backgroundColor: '#eeeeee',
                  borderRadius: 20,
                  marginVertical: 10,
                }}
                multiline={true}
                onChangeText={(text) => setRatecontent(text)}
                value={ratecontent}
              />
              <TouchableOpacity
                style={{
                  width: '90%',
                  height: 50,
                  backgroundColor: COLORS.primary,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 25,
                  marginTop: 10,
                }}
                onPress={() => {
                  ratehotel();
                }}
              >
                <Text
                  style={{
                    color: COLORS.white,
                    fontSize: 16,
                    fontWeight: '700',
                  }}
                >
                  Rate Now
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: '90%',
                  height: 50,
                  backgroundColor: COLORS.blurprimary,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 25,
                  marginTop: 10,
                }}
                onPress={() => {
                  setModalVisible(false);
                  setRatecontent('');
                  setStarhotel(0);
                }}
              >
                <Text
                  style={{
                    color: COLORS.primary,
                    fontSize: 16,
                    fontWeight: '700',
                  }}
                >
                  Later
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </Modal>
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
    borderRadius: 10,
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
    flexDirection: 'row',
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
