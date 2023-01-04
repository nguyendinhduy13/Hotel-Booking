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
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Icon4 from 'react-native-vector-icons/AntDesign';
import Icon3 from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon6 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon5 from 'react-native-vector-icons/Octicons';
import { useDispatch, useSelector } from 'react-redux';
import COLORS from '../../consts/colors';

const width = Dimensions.get('screen').width;
const WINDOW_HEIGHT = Dimensions.get('screen').height;
const SHEET_MAX_HEIGHT = WINDOW_HEIGHT * 0.8;
const SHEET_MIN_HEIGHT = WINDOW_HEIGHT * 0.1;
const InfoHotel = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const item = route.params.data;

  const { t } = useTranslation();
  const mapRef = useRef(null);
  const { height } = Dimensions.get('window');
  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 0.01;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
  const currentPosition = useSelector((state) => state.currentPosition);
  const [DataRoom, setDataRoom] = useState([]);
  const [Active, SetActive] = useState(item.isActive);

  const ImageDefault = () => {
    let temp = item.image.split('%');
    let temp1 = temp[1].split('?');
    //remove 2 words "2F" and "2E" in string
    let temp2 = temp1[0].replace('2F', '');
    let temp3 = temp2.replace('2E', '');
    return temp3;
  };

  const handleOpen = async () => {
    setModalVisible(true);
  };
  const UpdateActive = async () => {
    const arrayRemove = firestore.FieldValue.arrayRemove({
      advantage: route.params.data.advantage,
      comments: route.params.data.comments,
      description: route.params.data.description,
      id: route.params.data.id,
      image: ImageDefault(),
      isActive: route.params.data.isActive,
      location: route.params.data.location,
      name: route.params.data.name,
      position: route.params.data.position,
      star: route.params.data.star,
      tag: route.params.data.tag,
    });
    item.isActive = !item.isActive;
    const arrayUnion = firestore.FieldValue.arrayUnion({
      advantage: route.params.data.advantage,
      comments: route.params.data.comments,
      description: route.params.data.description,
      id: route.params.data.id,
      image: ImageDefault(),
      isActive: item.isActive,
      location: route.params.data.location,
      name: route.params.data.name,
      position: route.params.data.position,
      star: route.params.data.star,
      tag: route.params.data.tag,
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
        SetActive(item.isActive);
      });
  };

  const toggleSwitch = () => {
    UpdateActive();
  };

  const handleDelete = async () => {
    // //Delete ListHotel
    console.log(item.isActive);
    const arrayRemove = firestore.FieldValue.arrayRemove({
      advantage: route.params.data.advantage,
      comments: route.params.data.comments,
      description: route.params.data.description,
      id: route.params.data.id,
      image: ImageDefault(),
      isActive: item.isActive,
      location: route.params.data.location,
      name: route.params.data.name,
      position: route.params.data.position,
      star: route.params.data.star,
      tag: route.params.data.tag,
    });
    await firestore()
      .collection('ListHotel')
      .doc('ListHotel')
      .update({
        ListHotel: arrayRemove,
      })
      .then(() => {
        console.log('Data deleted!');
      })
      .catch((e) => {
        console.log(e);
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
        console.log('Data hotel deleted!');
      });

    const reference = storage().ref(item.id + '/' + ImageDefault());
    await reference.delete().then(() => {
      console.log('Hotel deleted from storage!');
    });
    ToastAndroid.show('Xóa thành công', ToastAndroid.SHORT);
    navigation.navigate('TabNavigation');
  };

  const { dayamount, dataHotel } = useSelector((state) => state.Globalreducer);

  const Format = (number) => {
    var price = number * dayamount;
    return price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  };
  const calculateDistance = (pos) => {
    const { latitude: lat1, longitude: lon1 } = currentPosition.position;
    const [lat2, lon2] = pos;
    const R = 6371; // radius of the earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // distance in km
    //fix distance to 2 decimal places
    return d.toFixed(2);
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
  const [modalVisible, setModalVisible] = useState(false);

  const TotalStar = (star) => {
    let total = 0;
    star.forEach((item) => {
      total += item;
    });
    return total === 0
      ? 5
      : (total / star.length) % 1 === 0
      ? total / star.length
      : (total / star.length).toFixed(0);
  };

  const checkImage = (image) => {
    const temp = image.split('.');
    return temp[temp.length - 1] === 'jpg' ? null : image;
  };

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
        if (documentSnapshot.exists) {
          handleFilter(documentSnapshot.data().Room);
        } else {
          setDataRoom([]);
        }
      });
  }, []);

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
            }}
          >
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
        onScroll={(e) => {
          const currentOffset = e.nativeEvent.contentOffset.y;
          animatedValue.setValue(currentOffset);
        }}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <Pressable
            style={styles.centeredView}
            onPress={() => setModalVisible(false)}
          >
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
                onPress={() => setModalVisible(false)}
              >
                <View />
              </TouchableOpacity>
              <View
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                }}
              >
                <View
                  style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    marginLeft: 4,
                    justifyContent: 'space-between',
                  }}
                >
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
                      }}
                    >
                      Khách sạn đang hoạt động
                    </Text>
                  </View>
                  <Switch
                    trackColor={{
                      false: '#767577',
                      true: '#81b0ff',
                    }}
                    thumbColor={Active ? '#f5dd4b' : '#f4f3f4'}
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
                  }}
                >
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
                      }}
                    >
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
                            onPress: () => console.log('Cancel Pressed'),
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
          </Pressable>
        </Modal>
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
                {TotalStar(item.star)}
                <Text style={{ color: 'gray' }}>
                  {' (' + item.star.length + ` ${t('review')})`}
                </Text>
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
                  <Text style={{ color: 'orange' }}>
                    ~{calculateDistance(item.position)} km
                  </Text>{' '}
                  | {item.location}
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
              <View
                key={index}
                style={styles.RecentlyBox}
                onPress={() => {
                  navigation.navigate('DetailsScreen', {
                    item: items,
                    hotel: item,
                  });
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
                    </View>
                  </View>
                </View>
              </View>
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
            {dataHotel.map(
              (items) =>
                items.id === item.id &&
                items.comments
                  .map(
                    (item1, index) =>
                      items.comments.length - index < 3 && (
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
                                <Text
                                  style={{ fontSize: 13, fontWeight: '400' }}
                                >
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
                              <Icon5
                                name="star"
                                size={15}
                                color={COLORS.orange}
                              />
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
                      ),
                  )
                  .reverse(),
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  RecentlyBox: {
    width: '100%',
    height: 260,
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
  ViewDG: {
    flexDirection: 'row',
  },
});

export default InfoHotel;
