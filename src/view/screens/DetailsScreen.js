import React, { useRef } from 'react';
import {
    ImageBackground,
    ScrollView,
    Text,
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
    Animated,
} from 'react-native';
import COLORS from '../../consts/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import Icons from '../../assets/icons/icons';
import slugify from '@sindresorhus/slugify';
export default function DetailsScreen({ navigation, route }) {
  const item = route.params;
  const {
    dayamount,
    startday,
    endday,
  } = useSelector((state) => state.Globalreducer);
  const DataDetail = [...item.tienich];
  const Format = (number) => {
    var prices = dayamount * number;
    return prices.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  };

  const animatedValue = useRef(new Animated.Value(0)).current;
  const HeaderAnimated = {
    opacity: animatedValue.interpolate({
      inputRange: [350, 400],
      outputRange: [0, 1],
    }),
  }
  const HeaderAnimatedScroll = {
    opacity: animatedValue.interpolate({
      inputRange: [0, 100],
      outputRange: [1, 0],
    }),
  }
  const HeaderAnimatedScrollWhite = {
    opacity: animatedValue.interpolate({
      inputRange: [100, 350],
      outputRange: [0, 1],
    }),
  }
  const FormatDayMonthYear = (date) => {
    const arr = date.split('-');
    const day = arr[2];
    const month = arr[1];
    const year = arr[0];
    return `${day}/${month}/${year}`;
  }
  return (
    <View style={{ position: 'relative' }}>
      <Animated.View style={[styles.HeadrView, HeaderAnimatedScroll]}>
        <View style={styles.header}>
          <Icon
            name="arrow-back-ios"
            size={28}
            color={COLORS.white}
            onPress={navigation.goBack}
          />
          <Icon name="bookmark-border" size={28} color={COLORS.white} />
        </View>
      </Animated.View>
      <Animated.View style={[styles.HeadrViewWhite, HeaderAnimatedScrollWhite]}>
        <View style={styles.header}>
          <Icon
            name="arrow-back-ios"
            size={28}
            color='black'
            onPress={navigation.goBack}
          />
          <Icon name="bookmark-border" size={0} color={COLORS.white} />
        </View>
      </Animated.View>
      <Animated.View style={[styles.HeadrView1, HeaderAnimated]}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 10 }}>
          <Icon
            name="arrow-back-ios"
            size={28}
            color='black'
            onPress={navigation.goBack}
          />
          <Text style={{ fontSize: 20,width:'90%', fontWeight: 'bold', color: 'black', textAlign: 'center' }}>{item.name}</Text>
        </View>
      </Animated.View>
      <ScrollView
        onScroll={e => {
          const currentOffset = e.nativeEvent.contentOffset.y;
          animatedValue.setValue(currentOffset)
        }}
        scrollEventThrottle={16}
        contentContainerStyle={{
          backgroundColor: COLORS.white,
          paddingBottom: 80,
        }}>

        <ImageBackground style={styles.headerImage} source={{ uri: item.image[0] }} />
        <View>
          <View style={{ marginTop: 15, paddingHorizontal: 20 }}>
            <Text style={{ fontSize: 27, fontWeight: 'bold', color: COLORS.dark }}>{item.name}</Text>
            <Text style={{ color: 'orange', fontWeight: 'bold', fontSize: 16, paddingTop: '1%' }}>{dayamount} ngày</Text>
            <Text style={{ fontSize: 20, paddingTop: '1%', fontWeight: 'bold', color: 'black', }}>{Format(item.price)}{' '}<Text style={{ fontSize: 13, color: 'black', }}>đ</Text>
            </Text>
            <View style={{ width: '100%', flexDirection: 'row', marginTop: 15, height: 80, borderWidth: 1, borderColor: 'gray', borderRadius: 10 }}>
              <View style={{
                width: '50%',
                height: '100%',
                borderRightWidth: 1,
                justifyContent: 'center',
                borderRightColor: 'gray',
              }}>
                <View style={{ paddingHorizontal: 10 }}>
                  <Text style={{ fontSize: 16 }}>Nhận phòng</Text>
                  <Text style={{ fontSize: 18, marginTop: 5, fontWeight: 'bold', color: 'black' }}>{FormatDayMonthYear(startday)}</Text>
                </View>
              </View>
              <View style={{
                width: '50%',
                height: '100%',
                borderRightWidth: 1,
                justifyContent: 'center',
                borderRightColor: 'gray',
              }}>
                <View style={{ paddingHorizontal: 10 }}>
                  <Text style={{ fontSize: 16 }}>Trả phòng</Text>
                  <Text style={{ fontSize: 18, marginTop: 5, fontWeight: 'bold', color: 'black' }}>{FormatDayMonthYear(endday)}</Text>
                </View>
              </View>
            </View>
            <View style={{ paddingTop: '4%' }}>
              <View
                style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text
                  style={{ fontSize: 18, color: COLORS.dark, fontWeight: 'bold' }}>
                  Gallery Photos
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('HotelPhotos', item)}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: 'bold',
                      color: COLORS.primary,
                    }}>
                    See all
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{ paddingTop: '5%' }}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {item.image.map((item, index) => (
                    <Image
                      key={index}
                      source={{ uri: item }}
                      style={{
                        width: 165,
                        height: 150,
                        borderRadius: 20,
                        marginRight: 20,
                      }}
                    />
                  ))}
                </ScrollView>
              </View>
            </View>
            <View style={{ paddingTop: '5%' }}>
              <Text
                style={{ fontSize: 18, color: COLORS.dark, fontWeight: 'bold' }}>
                Details
              </Text>
              <View style={{ marginTop: 10 }}>
                {DataDetail.map((item, index) => ((
                  <TouchableOpacity onPress={()=>{console.log(slugify(item))}} key={index} style={{ flexDirection: 'row', paddingVertical: 5 }}>
                    <Image
                      source={Icons(slugify(item))}
                      style={{
                        width: 22,
                        height: 22,
                      }}
                    />
                    <Text style={{ paddingHorizontal: 15, fontSize: 15, }}>{item}</Text>
                  </TouchableOpacity>
                )))}
              </View>
            </View>
            <View style={{ paddingTop: '2%' }}>
              <View>
                <Text
                  style={{ fontSize: 18, color: COLORS.dark, fontWeight: 'bold' }}>
                  Description
                </Text>
              </View>
              <View style={{ marginTop: 12 }}>
                <Text style={{ lineHeight: 20, color: COLORS.black }}>
                  {item.description}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView >
      <TouchableOpacity
        style={styles.bottomButton}
        onPress={() => {
          navigation.navigate('Booked', item);
        }}>
        <View
          style={{
            backgroundColor: COLORS.primary,
            width: '90%',
            height: 47,
            justifyContent: 'center',
            borderRadius: 18,
          }}>
          <Text
            style={{
              fontSize: 18,
              color: COLORS.white,
              textAlign: 'center',
              fontWeight: 'bold',
            }}>
            Book Now !
          </Text>
        </View>
        </TouchableOpacity>
    </View>
    );
}

const styles = StyleSheet.create({
    headerImage: {
        height: 400,
        overflow: 'hidden',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
        justifyContent: 'space-between',
    },
    iconContainer: {
        position: 'absolute',
        height: 60,
        width: 60,
        backgroundColor: COLORS.primary,
        top: -30,
        right: 20,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    priceTag: {
        height: 40,
        alignItems: 'center',
        marginLeft: 40,
        paddingLeft: 20,
        flex: 1,
        backgroundColor: COLORS.secondary,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        flexDirection: 'row',
    },
    btn: {
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        backgroundColor: COLORS.primary,
        marginHorizontal: 20,
        borderRadius: 10,
    },
    bottomButton: {
        alignItems: 'center',
        padding: 10,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        backgroundColor: 'white',
        position: 'absolute',
        zIndex: 1,
        width: '100%',
        bottom: 0,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    HeadrView: {
        position: 'absolute',
        top: 10,
        left: 0,
        right: 0,
        zIndex: 1,
        height: 50,
        width: '100%',
        justifyContent: 'center',
    },
    HeadrViewWhite: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1,
        height: 60,
        width: '100%',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    HeadrView1: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1,
        height: 60,
        width: '100%',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
});

{
    /* <View
            style={{
              flexDirection: 'row',
              paddingTop: '5%',
              marginHorizontal: 18,
              justifyContent: 'space-between',
            }}>
            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
              <Icon1 name="hotel" size={30} color={COLORS.primary} />
              <Text
                style={{
                  fontWeight: '400',
                  color: COLORS.black,
                  fontSize: 13,
                  marginTop: 5,
                }}>
                Hotels
              </Text>
            </View>
            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
              <Icon1 name="bed" size={30} color={COLORS.primary} />
              <Text
                style={{
                  fontWeight: '400',
                  color: COLORS.black,
                  fontSize: 13,
                  marginTop: 5,
                }}>
                BDataRoom
              </Text>
            </View>
            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
              <Icon1 name="bath" size={30} color={COLORS.primary} />
              <Text
                style={{
                  fontWeight: '400',
                  color: COLORS.black,
                  fontSize: 13,
                  marginTop: 5,
                }}>
                Bathrooms
              </Text>
            </View>
            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
              <Icon2
                name="social-distance-6-feet"
                size={30}
                color={COLORS.primary}
              />
              <Text
                style={{
                  fontWeight: '400',
                  color: COLORS.black,
                  fontSize: 13,
                  marginTop: 5,
                }}>
                Hotels
              </Text>
            </View>
          </View> */
}
