import slugify from '@sindresorhus/slugify';
import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Animated,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import Icons from '../../assets/icons/icons';
import COLORS from '../../consts/colors';
export default function DetailsScreen({ navigation, route }) {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { item, hotel } = route.params;
  const { dayamount, startday, endday } = useSelector(
    (state) => state.Globalreducer,
  );
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
  };
  const HeaderAnimatedScroll = {
    opacity: animatedValue.interpolate({
      inputRange: [0, 100],
      outputRange: [1, 0],
    }),
  };
  const HeaderAnimatedScrollWhite = {
    opacity: animatedValue.interpolate({
      inputRange: [100, 350],
      outputRange: [0, 1],
    }),
  };
  const FormatDayMonthYear = (date) => {
    const arr = date.split('-');
    const day = arr[2];
    const month = arr[1];
    const year = arr[0];
    return `${day}/${month}/${year}`;
  };
  return (
    <View style={{ position: 'relative' }}>
      <Animated.View style={[styles.HeadrView, HeaderAnimatedScroll]}>
        <View style={styles.header}>
          <Icon
            name="arrow-back-ios"
            size={28}
            color="white"
            onPress={navigation.goBack}
          />
        </View>
      </Animated.View>
      <Animated.View
        style={[
          styles.HeadrViewWhite,
          { backgroundColor: colors.box },
          HeaderAnimatedScrollWhite,
        ]}
      >
        <View style={styles.header}>
          <Icon
            name="arrow-back-ios"
            size={28}
            color={colors.text}
            onPress={navigation.goBack}
          />
        </View>
      </Animated.View>
      <Animated.View
        style={[
          styles.HeadrView1,
          { backgroundColor: colors.box },
          HeaderAnimated,
        ]}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 10,
          }}
        >
          <Icon
            name="arrow-back-ios"
            size={28}
            color={colors.text}
            onPress={navigation.goBack}
          />
          <Text
            style={{
              fontSize: 17,
              width: '90%',
              fontWeight: 'bold',
              color: colors.text,
              textAlign: 'center',
            }}
          >
            {item.name}
          </Text>
        </View>
      </Animated.View>
      <ScrollView
        onScroll={(e) => {
          const currentOffset = e.nativeEvent.contentOffset.y;
          animatedValue.setValue(currentOffset);
        }}
        scrollEventThrottle={16}
        contentContainerStyle={{
          backgroundColor: colors.bg,
          paddingBottom: 80,
        }}
      >
        <ImageBackground
          style={styles.headerImage}
          source={{ uri: item.image[0] }}
        />
        <View>
          <View style={{ marginTop: 15, paddingHorizontal: 20 }}>
            <Text
              style={{ fontSize: 27, fontWeight: 'bold', color: colors.text }}
            >
              {item.name}
            </Text>
            <Text
              style={{
                color: 'orange',
                fontWeight: 'bold',
                fontSize: 16,
                paddingTop: '1%',
              }}
            >
              {dayamount} {t('day')}
              {dayamount > 1 && t('day') === 'day' ? 's' : ''}
            </Text>
            <Text
              style={{
                fontSize: 20,
                paddingTop: '1%',
                fontWeight: 'bold',
                color: colors.text,
              }}
            >
              {Format(item.price)}{' '}
              <Text style={{ fontSize: 13, color: colors.text }}>đ</Text>
            </Text>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                marginTop: 15,
                height: 80,
                borderWidth: 1,
                borderColor: 'gray',
                borderRadius: 10,
              }}
            >
              <View
                style={{
                  width: '50%',
                  height: '100%',
                  borderRightWidth: 1,
                  justifyContent: 'center',
                  borderRightColor: 'gray',
                }}
              >
                <View style={{ paddingHorizontal: 10 }}>
                  <Text style={{ fontSize: 16, color: colors.icon }}>
                    {t('check-in')}
                  </Text>
                  <Text
                    style={{
                      fontSize: 17,
                      marginTop: 5,
                      fontWeight: 'bold',
                      color: colors.text,
                    }}
                  >
                    12:00, {FormatDayMonthYear(startday)}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: '50%',
                  height: '100%',
                  borderRightWidth: 1,
                  justifyContent: 'center',
                  borderRightColor: 'gray',
                }}
              >
                <View style={{ paddingHorizontal: 10 }}>
                  <Text style={{ fontSize: 16, color: colors.icon }}>
                    {t('check-out')}
                  </Text>
                  <Text
                    style={{
                      fontSize: 17,
                      marginTop: 5,
                      fontWeight: 'bold',
                      color: colors.text,
                    }}
                  >
                    12:00, {FormatDayMonthYear(endday)}
                  </Text>
                </View>
              </View>
            </View>
            <View style={{ paddingTop: '4%' }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    color: colors.text,
                    fontWeight: 'bold',
                  }}
                >
                  {t('gallery-photos')}
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('HotelPhotos', item)}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: 'bold',
                      color: COLORS.primary,
                    }}
                  >
                    {t('show')}
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
                style={{ fontSize: 18, color: colors.text, fontWeight: 'bold' }}
              >
                {t('details')}
              </Text>
              <View style={{ marginTop: 10 }}>
                {DataDetail.map((item, index) => (
                  <View
                    key={index}
                    style={{ flexDirection: 'row', paddingVertical: 5 }}
                  >
                    <Image
                      source={Icons(slugify(item))}
                      style={{
                        width: 22,
                        height: 22,
                        tintColor: colors.icon,
                      }}
                    />
                    <Text
                      style={{
                        paddingHorizontal: 15,
                        fontSize: 15,
                        color: colors.text,
                      }}
                    >
                      {item.split(' ')[1] === 'm²'
                        ? item + ' '
                        : t(`${slugify(item)}`)}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
            <View style={{ paddingTop: '2%' }}>
              <View>
                <Text
                  style={{
                    fontSize: 18,
                    color: colors.text,
                    fontWeight: 'bold',
                  }}
                >
                  {t('description')}
                </Text>
              </View>
              <View style={{ marginTop: 12 }}>
                <Text style={{ lineHeight: 20, color: colors.text }}>
                  {item.description}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          width: '100%',
          height: 65,
          backgroundColor: colors.box,
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          zIndex: 1,
          bottom: 0,
        }}
      >
        <TouchableOpacity
          style={{
            width: '90%',
            height: 45,
            backgroundColor: COLORS.primary,
            borderRadius: 15,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => {
            navigation.navigate('Booked', {
              item: item,
              hotel: hotel,
            });
          }}
        >
          <Text
            style={{
              fontSize: 15,
              fontWeight: 'bold',
              color: COLORS.white,
            }}
          >
            {t('book-now')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    height: 350,
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
