import React, { useRef } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  ImageBackground,
  PanResponder,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Icon1 from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/Fontisto';
import { useSelector } from 'react-redux';

const WINDOW_HEIGHT = Dimensions.get('screen').height;
const WINDOW_WIDTH = Dimensions.get('screen').width;
const SHEET_MAX_HEIGHT = WINDOW_HEIGHT * 0.83;
const SHEET_MIN_HEIGHT = WINDOW_HEIGHT * 0.08;
const MAX_UPWARD_TRANSLATE_Y = SHEET_MIN_HEIGHT - SHEET_MAX_HEIGHT;
const MAX_DOWNWARD_TRANSLATE_Y = 0;
const DRAG_THRESHOLD = 50;

const PlaceHotel = ({ navigation, route }) => {
  const { data, name } = route.params;
  const currentPosition = useSelector((state) => state.currentPosition);
  const position =
    data.length > 0
      ? data[0].position
      : [currentPosition.position.latitude, currentPosition.position.longitude];

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
  springAnimation('up');

  const formatName = (name) => {
    //regex if name is too long
    if (name.length > 30) {
      return name.substring(0, 30) + '...';
    }
    return name;
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
  const regexName = (location) => {
    //regex if name is too long
    if (location.length > 42) {
      return location.substring(0, 42) + '...';
    }
    return location;
  };
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View
        style={{
          padding: 15,
          backgroundColor: 'white',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            justifyContent: 'space-between',
          }}
        >
          <Icon
            onPress={() => {
              navigation.goBack();
            }}
            name="chevron-left"
            size={30}
            color="black"
          />
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: 'black',
            }}
          >
            {name}
          </Text>
          <Icon name="chevron-left" size={0} color="black" />
        </View>
      </View>
      <MapView
        style={{
          flex: 1,
          backgroundColor: 'white',
          zIndex: -1,
          marginTop: -10,
        }}
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        region={{
          latitude: position[0],
          longitude: position[1],
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      >
        <Marker
          coordinate={{
            latitude: currentPosition.position.latitude,
            longitude: currentPosition.position.longitude,
          }}
          title="Current Location"
          pinColor="blue"
          tracksViewChanges={false}
          tappable={false}
          anchor={{ x: 0.5, y: 0.5 }}
        />
        {data.map((item, index) => {
          return (
            <Marker
              key={index}
              coordinate={{
                latitude: item.position[0],
                longitude: item.position[1],
              }}
              title={item.name}
            />
          );
        })}
      </MapView>
      <Animated.View style={[styles.bottomSheet, bottomSheetAnimation]}>
        <View style={styles.draggableArea} {...panResponder.panHandlers}>
          <View
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 5,
            }}
          >
            <View
              style={{
                width: WINDOW_WIDTH * 0.2,
                height: 5,
                backgroundColor: '#a8bed2',
                alignSelf: 'center',
                borderRadius: 5,
                marginTop: 10,
              }}
            />
            <View
              style={{
                padding: 15,
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: 'black',
                }}
              >
                Có {data.length} khách sạn
              </Text>
              {data.length > 0 ? (
                <View
                  style={{
                    marginTop: 15,
                    width: '100%',
                  }}
                >
                  <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{
                      marginBottom: 40,
                    }}
                  >
                    {data.map((item, index) => {
                      return (
                        <Pressable
                          onPress={() => {
                            navigation.navigate('ListRoom', item);
                          }}
                          key={index}
                          style={{
                            width: '100%',
                            height: 250,
                            color: 'black',
                            backgroundColor: 'white',
                            alignSelf: 'center',
                            borderRadius: 10,
                            elevation: 5,
                            shadowColor: '#000',
                            marginBottom: 20,
                          }}
                        >
                          <ImageBackground
                            source={{ uri: item.image }}
                            style={{
                              width: '100%',
                              height: 150,
                              borderTopLeftRadius: 10,
                              borderTopRightRadius: 10,
                            }}
                          >
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                padding: 5,
                                bottom: 0,
                                position: 'absolute',
                                backgroundColor: 'rgba(0,0,0,0.3)',
                                width: '100%',
                              }}
                            >
                              <Icon2
                                name="map-marker-alt"
                                size={20}
                                color="red"
                                style={{
                                  marginLeft: 5,
                                }}
                              />
                              <Text style={{ color: 'white', marginLeft: 10 }}>
                                {regexName(item.location)}
                              </Text>
                            </View>
                          </ImageBackground>
                          <View
                            style={{
                              padding: 10,
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 20,
                                color: 'black',
                              }}
                            >
                              {formatName(item.name)}
                            </Text>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginTop: 5,
                              }}
                            >
                              <View
                                style={{
                                  padding: 2,
                                  borderWidth: 1,
                                  borderColor: 'red',
                                  borderRadius: 5,
                                  width: 50,
                                  alignItems: 'center',
                                }}
                              >
                                <Text
                                  style={{
                                    fontSize: 12,
                                    color: 'red',
                                  }}
                                >
                                  Ưu đãi
                                </Text>
                              </View>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                }}
                              >
                                <Text style={{ color: 'black' }}>
                                  {calculateDistance(item.position)} km
                                </Text>
                                <Icon2
                                  name="map-marker-alt"
                                  size={20}
                                  color="red"
                                  style={{
                                    marginLeft: 5,
                                  }}
                                />
                              </View>
                            </View>
                            <View
                              style={{
                                flexDirection: 'row',
                                marginTop: 5,
                                alignItems: 'center',
                                justifyContent: 'space-between',
                              }}
                            >
                              <Text
                                style={{
                                  fontSize: 15,
                                  color: 'black',
                                }}
                              >
                                {item.advantage}
                              </Text>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                }}
                              >
                                <Text>{TotalStar(item.star)}</Text>
                                <Icon1
                                  name="star"
                                  size={20}
                                  color="orange"
                                  style={{
                                    marginLeft: 5,
                                  }}
                                />
                              </View>
                            </View>
                          </View>
                        </Pressable>
                      );
                    })}
                  </ScrollView>
                </View>
              ) : (
                <>
                  <View
                    style={{
                      marginTop: 150,
                      alignItems: 'center',
                      width: '100%',
                    }}
                  >
                    <Image
                      source={{
                        uri: 'https://cdn0.iconfinder.com/data/icons/seo-web-4-1/128/Vigor_Bug-Programing-error-malware-virus-512.png',
                      }}
                      style={{
                        width: 200,
                        height: 200,
                      }}
                    />
                    <Text
                      style={{ fontSize: 20, marginTop: 30, color: 'black' }}
                    >
                      Không có khách sạn nào
                    </Text>
                  </View>
                </>
              )}
            </View>
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

export default PlaceHotel;

const styles = StyleSheet.create({
  bottomSheet: {
    position: 'absolute',
    width: '100%',
    height: SHEET_MAX_HEIGHT,
    bottom: SHEET_MIN_HEIGHT - SHEET_MAX_HEIGHT,
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
});
