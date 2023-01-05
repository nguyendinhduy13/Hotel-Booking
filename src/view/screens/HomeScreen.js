import AsyncStorage from '@react-native-async-storage/async-storage';
import Auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Keyboard,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import Swiper from 'react-native-swiper';
import Icon3 from 'react-native-vector-icons/AntDesign';
import Icon5 from 'react-native-vector-icons/EvilIcons';
import Icon4 from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import COLORS from '../../consts/colors';
import Globalreducer from '../../redux/Globalreducer';
import Header from '../components/Header';
const { width } = Dimensions.get('screen');
const cardWidth = width / 1.8;
export default function HomeScreen({ navigation }) {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { dataHotel, dataProvince } = useSelector(
    (state) => state.Globalreducer,
  );
  const ranHotel = [1, 2, 4];

  const dataExplore = [
    {
      id: 1,
      index: 43,
      title: 'Đà Lạt',
      img: 'https://q-xx.bstatic.com/xdata/images/city/250x250/688831.jpg?k=7b999c7babe3487598fc4dd89365db2c4778827eac8cb2a47d48505c97959a78&o=',
    },
    {
      id: 2,
      index: 49,
      title: 'Hồ Chí Minh',
      img: 'https://q-xx.bstatic.com/xdata/images/city/250x250/688893.jpg?k=d32ef7ff94e5d02b90908214fb2476185b62339549a1bd7544612bdac51fda31&o=',
    },
    {
      id: 3,
      index: 48,
      title: 'Vũng Tàu',
      img: 'https://q-xx.bstatic.com/xdata/images/city/250x250/688956.jpg?k=fc88c6ab5434042ebe73d94991e011866b18ee486476e475a9ac596c79dce818&o=',
    },
  ];

  useEffect(() => {
    firestore()
      .collection(user.uid)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((documentSnapshot) => {
          dispatch(
            Globalreducer.actions.setdatabooking(documentSnapshot.data()),
          );
        });
      });
  }, []);

  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const user = Auth().currentUser;
  const [modalVisible, setModalVisible] = useState(false);

  const animatedValue = useRef(new Animated.Value(0)).current;
  const SearchShow = {
    opacity: animatedValue.interpolate({
      inputRange: [0, 70],
      outputRange: [0, 1],
    }),
  };

  const checkImage = (image) => {
    const temp = image.split('.');
    return temp[temp.length - 1] === 'jpg' ? null : image;
  };

  const textInput = useRef(0);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const handleSearch = (text) => {
    if (text) {
      const newData = dataHotel.filter((item) => {
        const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setData(newData);
      setSearch(text);
    } else {
      setData([]);
      setSearch('');
    }
  };

  const [historySearch, setHistorySearch] = useState([]);
  const readItemFromStorage = async (newValue) => {
    const value = await AsyncStorage.getItem('hotel');
    if (value == null) {
      await AsyncStorage.setItem('hotel', JSON.stringify([]));
      setHistorySearch([]);
    } else {
      setHistorySearch(JSON.parse(value));
    }
  };

  const addItemToSearchHistory = async (item) => {
    const value = await AsyncStorage.getItem('hotel');
    const arr = JSON.parse(value);
    if (arr) {
      const index = arr.findIndex((e) => e.id === item.id);
      if (index === -1) {
        arr.push(item);
      } else {
        arr.splice(index, 1);
        arr.push(item);
      }
    }
    await AsyncStorage.setItem('hotel', JSON.stringify(arr));
    readItemFromStorage();
  };

  const removeItemFromSearchHistory = async (item) => {
    const value = await AsyncStorage.getItem('hotel');
    const arr = JSON.parse(value);
    if (arr) {
      const index = arr.findIndex((e) => e.id === item.id);
      if (index !== -1) {
        arr.splice(index, 1);
      }
    }
    await AsyncStorage.setItem('hotel', JSON.stringify(arr));
    readItemFromStorage();
  };

  const navigateTo = (item) => {
    navigation.navigate('ListRoom', item);
    setModalVisible(false);
    addItemToSearchHistory(item);
  };

  const countHotel = (place) => {
    let count = 0;
    let temp = [];
    dataProvince.forEach((item) => {
      if (item.index === place) {
        item.districts.forEach((item) => {
          count += item.data.length;
          temp.push(...item.data);
        });
      }
    });
    return { count, temp };
  };

  const formatAddress = (name) => {
    //regex the name if it has more than 12 words
    const temp = name.split(' ');
    if (temp.length > 9) {
      return temp.slice(0, 8).join(' ') + '...';
    }
    return name;
  };

  const ShowModal = async () => {
    setModalVisible(true);
    readItemFromStorage();
  };

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

  const Card = ({ hotel, index }) => {
    const inputRange = [
      (index - 1) * cardWidth,
      index * cardWidth,
      (index + 1) * cardWidth,
    ];
    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.7, 0, 0.7],
    });
    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.8, 1, 0.8],
    });
    return (
      <View>
        <TouchableOpacity
          disabled={activeCardIndex != index}
          activeOpacity={1}
          onPress={() => navigation.navigate('ListRoom', hotel)}
        >
          <Animated.View
            style={{
              ...styles.card,
              transform: [
                {
                  scale,
                },
              ],
            }}
          >
            <Animated.View
              style={{
                ...styles.cardOverplay,
                opacity,
              }}
            />
            <View style={styles.priceTag}>
              <Icon name="star" size={15} color={COLORS.orange} />
              <Text
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  paddingLeft: 5,
                }}
              >
                {TotalStar(hotel.star)}
              </Text>
            </View>
            <Image
              source={{
                uri: checkImage(hotel.image),
              }}
              style={styles.cardImage}
            />
            <View style={styles.cardDetails}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 20,
                }}
              >
                <View>
                  <View
                    style={{
                      height: 20,
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontSize: 17,
                        color: COLORS.white,
                      }}
                    >
                      {hotel.name}
                    </Text>
                  </View>
                  <View
                    style={{
                      marginTop: 5,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        color: COLORS.white,
                      }}
                    >
                      {formatAddress(hotel.location)}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </Animated.View>
        </TouchableOpacity>
      </View>
    );
  };

  const ExploreCard = ({ place }) => {
    return (
      <Pressable
        onPress={() => {
          navigation.navigate('PlaceHotel', {
            name: place.title,
            data: countHotel(place.index).temp,
          });
        }}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 20,
        }}
      >
        <View style={{}}>
          <Image
            style={{ width: 150, height: 150, borderRadius: 10 }}
            source={{
              uri: place.img,
            }}
          />
          <Text
            style={{
              fontSize: 15,
              color: colors.text,
              marginTop: 5,
            }}
          >
            {place.title}
          </Text>
          <Text style={{ color: colors.text }}>
            {t('have')} {countHotel(place.index).count} {t('ho-tel')}
          </Text>
        </View>
      </Pressable>
    );
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.bg,
      }}
    >
      <View
        style={{
          paddingHorizontal: 20,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Header name={'Hotel Booking'} />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Animated.View style={[{}, SearchShow]}>
              <TouchableOpacity
                onPress={() => {
                  ShowModal();
                }}
              >
                <Icon5 name="search" size={32} color="#FF6347" />
              </TouchableOpacity>
            </Animated.View>
          </View>
        </View>
      </View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        style={{ height: '100%' }}
        onScroll={(e) => {
          const currentOffset = e.nativeEvent.contentOffset.y;
          animatedValue.setValue(currentOffset);
        }}
        scrollEventThrottle={16}
      >
        <TouchableOpacity
          onPress={() => {
            ShowModal();
          }}
        >
          <View
            style={[
              styles.searchInputContainer,
              { backgroundColor: colors.bg },
            ]}
          >
            <Icon5
              name="search"
              size={30}
              style={{
                marginLeft: 10,
              }}
              color="#FF6347"
            />
            <Text
              style={{
                fontSize: 17,
                paddingLeft: 10,
                color: colors.text,
              }}
            >
              {t('search')}
            </Text>
          </View>
        </TouchableOpacity>
        <View>
          <Pressable
            onPress={() => {
              navigation.navigate('ListPlace');
            }}
            style={{
              marginTop: 20,
              paddingHorizontal: 20,
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Icon4
              name="md-location-sharp"
              size={25}
              color="orange"
              style={{}}
            />
            <Text
              style={{
                fontSize: 24,
                color: 'orange',
                marginLeft: 5,
                fontWeight: '700',
              }}
            >
              Hồ Chí Minh
            </Text>
            <Icon3
              name="caretdown"
              size={15}
              color="orange"
              style={{
                marginLeft: 10,
              }}
            />
          </Pressable>

          <Text
            style={{
              fontWeight: 'bold',
              color: colors.text,
              fontSize: 18,
              paddingHorizontal: 20,
              marginTop: 10,
            }}
          >
            {t('top-hotels')}
          </Text>
          <Animated.FlatList
            onMomentumScrollEnd={(e) => {
              setActiveCardIndex(
                Math.round(e.nativeEvent.contentOffset.x / cardWidth),
              );
            }}
            onScroll={Animated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: {
                      x: scrollX,
                    },
                  },
                },
              ],
              {
                useNativeDriver: true,
              },
            )}
            data={dataHotel}
            horizontal
            contentContainerStyle={{
              paddingVertical: 20,
              paddingLeft: 20,
              paddingRight: cardWidth / 2 - 40,
            }}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <Card hotel={item} index={index} />
            )}
            snapToInterval={cardWidth}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 20,
          }}
        >
          <Text
            style={{
              fontWeight: 'bold',
              color: colors.text,
              fontSize: 18,
            }}
          >
            {t('explore-VietNam')}
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ListPlace');
            }}
          >
            <Text
              style={{
                fontWeight: 'bold',
                color: colors.text,
              }}
            >
              {t('more')}
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={dataExplore}
          renderItem={({ item }) => (
            <ExploreCard place={item} navigation={navigation} />
          )}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
        <View>
          <Swiper
            activeDot={
              <View
                style={{
                  backgroundColor: '#FF6347',
                  width: 10,
                  height: 10,
                  borderRadius: 7,
                  marginLeft: 7,
                  marginRight: 7,
                }}
              />
            }
            autoplay={true}
            style={{
              marginTop: 10,
              paddingHorizontal: 20,
              height: 250,
              alignSelf: 'center',
            }}
          >
            <View
              style={{
                height: 200,
                width: 348,
                borderRadius: 10,
                overflow: 'hidden',
              }}
            >
              <Image
                source={{
                  uri: 'https://www.vietnambooking.com/wp-content/uploads/2019/12/website-dat-phong-khach-san-1.png',
                }}
                style={{ height: '100%', width: '100%' }}
              />
            </View>
            <View
              style={{
                height: 200,
                width: 348,
                borderRadius: 10,
                overflow: 'hidden',
              }}
            >
              <Image
                source={{
                  uri: 'https://go2joy.s3.ap-southeast-1.amazonaws.com/blog/wp-content/uploads/2022/12/30143402/sansale-t1-2023-55-sidebar-banner.jpg',
                }}
                style={{ height: '100%', width: '100%' }}
              />
            </View>
            <View
              style={{
                height: 200,
                width: 348,
                borderRadius: 10,
                overflow: 'hidden',
              }}
            >
              <Image
                source={{
                  uri: 'https://media.vietteltelecom.vn/upload/ckfinder/images/142.jpg',
                }}
                style={{ height: '100%', width: '100%' }}
              />
            </View>
          </Swiper>
        </View>
        <Text
          style={{
            fontWeight: 'bold',
            color: colors.text,
            fontSize: 18,
            paddingHorizontal: 20,
          }}
        >
          {t('suggest-for-you')}
        </Text>
        {ranHotel.map((item, index) => {
          return (
            <View
              key={index}
              style={{
                paddingHorizontal: 20,
                marginTop: 20,
              }}
            >
              <Pressable
                onPress={() => navigation.navigate('ListRoom', dataHotel[item])}
              >
                <ImageBackground
                  source={{ uri: dataHotel[item].image }}
                  style={{
                    width: '100%',
                    height: 150,
                  }}
                >
                  <View
                    style={{
                      padding: 10,
                      position: 'absolute',
                      bottom: 0,
                      backgroundColor: 'rgba(0,0,0,0.1)',
                      width: '100%',
                    }}
                  >
                    <View>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Text style={{ color: 'white', fontSize: 18 }}>
                          {dataHotel[item].name}
                        </Text>
                        <View
                          style={{ flexDirection: 'row', alignItems: 'center' }}
                        >
                          <Text
                            style={{
                              color: 'white',
                              fontSize: 13,
                            }}
                          >
                            {dataHotel[item].tag.split(',')[0]}
                          </Text>
                          <Icon4
                            name="md-location-sharp"
                            size={15}
                            color="orange"
                            style={{}}
                          />
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          marginTop: 5,
                        }}
                      >
                        <Text style={{ color: 'white' }}>
                          {dataHotel[item].advantage}
                        </Text>
                        <View
                          style={{ flexDirection: 'row', alignItems: 'center' }}
                        >
                          <Text
                            style={{
                              color: 'white',
                              fontWeight: 'bold',
                            }}
                          >
                            {TotalStar(dataHotel[item].star)}
                            {' ('}
                            {dataHotel[item].star.length}
                            {')'}
                          </Text>
                          <Icon name="star" size={15} color={COLORS.orange} />
                        </View>
                      </View>
                    </View>
                  </View>
                </ImageBackground>
              </Pressable>
            </View>
          );
        })}
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <Pressable
            style={[styles.modalView, { backgroundColor: colors.bg }]}
            onPress={() => {
              Keyboard.dismiss();
            }}
          >
            <View style={[styles.generalView, { backgroundColor: colors.bg }]}>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 15,
                  alignItems: 'center',
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}
                >
                  <Icon4
                    name="chevron-back-outline"
                    size={30}
                    style={{
                      marginLeft: 10,
                    }}
                    color="#FF6347"
                  />
                </TouchableOpacity>
                <View
                  style={[
                    styles.searchInputContainer1,
                    { backgroundColor: colors.bg },
                  ]}
                >
                  <Icon5
                    name="search"
                    size={30}
                    style={{
                      marginLeft: 10,
                    }}
                    color="#FF6347"
                  />
                  <TextInput
                    style={{
                      fontSize: 17,
                      paddingLeft: 10,
                    }}
                    placeholder={t('search')}
                    placeholderTextColor={colors.icon}
                    autoFocus={true}
                    ref={textInput}
                    value={search}
                    onChangeText={(text) => {
                      handleSearch(text);
                    }}
                    color={colors.text}
                  />
                </View>
              </View>

              {data.length > 0 ? (
                <></>
              ) : (
                <View>
                  {historySearch.length > 0 ? (
                    <Text
                      style={{
                        marginLeft: 20,
                        marginTop: 10,
                        marginBottom: 10,
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: colors.text,
                      }}
                    >
                      {t('recently-viewed')}
                    </Text>
                  ) : (
                    <></>
                  )}
                  {historySearch
                    .map((item, index) => (
                      <TouchableOpacity
                        key={index}
                        style={{
                          flexDirection: 'row',
                          height: 50,
                          borderBottomWidth: 1,
                          borderBottomColor: '#C8D8C3',
                          alignItems: 'center',
                          width: '90%',
                          alignSelf: 'center',
                          marginBottom: 12,
                        }}
                        onPress={() => {
                          navigateTo(item);
                        }}
                      >
                        <Image
                          source={{
                            uri: item.image,
                          }}
                          style={{
                            width: 30,
                            height: 30,
                            resizeMode: 'cover',
                          }}
                        />
                        <View
                          style={{
                            width: '85%',
                          }}
                        >
                          <Text
                            style={{
                              marginLeft: 10,
                              fontSize: 17,
                              height: 22,
                              color: colors.text,
                              fontWeight: 'bold',
                            }}
                          >
                            {item.name}
                          </Text>
                          <Text
                            style={{
                              marginLeft: 10,
                              fontSize: 15,
                              height: 20,
                              color: colors.icon,
                            }}
                          >
                            {item.location}
                          </Text>
                        </View>
                        <TouchableOpacity
                          style={{
                            position: 'absolute',
                            right: 0,
                          }}
                          onPress={() => {
                            removeItemFromSearchHistory(item);
                          }}
                        >
                          <Icon5
                            name="close"
                            size={22}
                            style={{
                              color: colors.icon,
                            }}
                          />
                        </TouchableOpacity>
                      </TouchableOpacity>
                    ))
                    .reverse()}
                </View>
              )}

              {data.length > 0 ? (
                <ScrollView>
                  <Text
                    style={{
                      marginLeft: 20,
                      marginTop: 10,
                      marginBottom: 10,
                      fontSize: 16,
                      fontWeight: 'bold',
                      color: colors.text,
                    }}
                  >
                    {t('hotel')}
                  </Text>
                  {data.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      style={{
                        paddingBottom: 20,
                      }}
                      onPress={() => navigateTo(item)}
                    >
                      <View
                        style={[
                          styles.ModalBoxes,
                          { backgroundColor: colors.bg },
                        ]}
                      >
                        <Image
                          source={{
                            uri: item.image,
                          }}
                          style={{
                            width: 75,
                            height: 75,
                            marginLeft: 7.5,
                            borderRadius: 10,
                          }}
                        />
                        <View
                          style={{
                            height: 70,
                            paddingHorizontal: 7,
                            width: '79%',
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 17,
                              fontWeight: 'bold',
                              color: colors.text,
                            }}
                          >
                            {item.name}
                          </Text>
                          <Text
                            style={{
                              height: 40,
                              lineHeight: 20,
                              marginTop: 10,
                              color: colors.icon,
                            }}
                          >
                            {item.location}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              ) : (
                <></>
              )}
            </View>
          </Pressable>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    margintop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  searchInputContainer: {
    height: 45,

    marginTop: 5,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#dddddd',
  },
  searchInputContainer1: {
    width: '83%',
    height: 45,
    marginLeft: 5,
    backgroundColor: 'white',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#dddddd',
  },
  card: {
    height: 280,
    width: cardWidth,
    elevation: 5,
    marginRight: 20,
    borderRadius: 25,
    backgroundColor: COLORS.white,
  },
  cardImage: {
    height: '100%',
    width: '100%',
    borderRadius: 25,
  },
  priceTag: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 25,
    backgroundColor: COLORS.primary,
    position: 'absolute',
    zIndex: 1,
    right: 20,
    top: 25,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
  },
  cardDetails: {
    height: 100,
    borderRadius: 15,
    position: 'absolute',
    bottom: 0,
    zIndex: 100,
    alignSelf: 'center',
    width: '80%',
  },
  cardOverplay: {
    height: 280,
    backgroundColor: COLORS.white,
    position: 'absolute',
    zIndex: 100,
    width: cardWidth,
    borderRadius: 25,
  },
  topHotelCard: {
    height: 180,
    width: 200,
    backgroundColor: COLORS.white,
    elevation: 10,
    marginHorizontal: 10,
    borderRadius: 15,
  },
  topHotelCardImage: {
    height: 100,
    width: '100%',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  RecentlyBox: {
    width: '90%',
    height: 120,
    color: 'black',
    backgroundColor: COLORS.white,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'center',
    borderRadius: 20,
    elevation: 15,
    flexDirection: 'row',
  },
  IMGRecent: {
    height: 95,
    width: 95,
    borderRadius: 20,
    alignSelf: 'center',
    marginTop: 12,
  },
  PriceShow: {
    flexDirection: 'row',
    position: 'absolute',
    top: cardWidth + 15,
    left: cardWidth / 2 - 90,
    justifyContent: 'space-between',
    marginTop: 5,
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  modalView: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.75,
    shadowRadius: 10,
    elevation: 5,
    width: '100%',
    height: '100%',
  },
  generalView: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  ModalBoxes: {
    flexDirection: 'row',
    width: '90%',
    backgroundColor: 'white',
    height: 90,
    alignSelf: 'center',
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1.25,
    borderColor: '#dddddd',
  },
});
