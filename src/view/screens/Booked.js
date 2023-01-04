import Auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Alert,
  Image,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import uuid from 'react-native-uuid';
import { useDispatch, useSelector } from 'react-redux';
import COLORS from '../../consts/colors';
import CustomHeader from '../components/CustomHeader';
export default function Booked({ navigation, route }) {
  const { t } = useTranslation();
  const { item, hotel } = route.params;
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigation();
  const [Number, setNumber] = useState(1);
  const { dayamount, startday, endday, namehotel, idhotel } = useSelector(
    (state) => state.Globalreducer,
  );
  const user = Auth().currentUser;

  const [checkdata, setcheckdata] = useState(false);
  const [checkdata1, setcheckdata1] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [userbooking, setuserbooking] = useState({});

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      firestore()
        .collection('Booking')
        .doc(user.uid)
        .get()
        .then((documentSnapshot) => {
          if (documentSnapshot.exists) {
            setcheckdata(true);
          }
        });

      firestore()
        .collection('UserBooking')
        .doc(user.uid)
        .get()
        .then((documentSnapshot) => {
          if (documentSnapshot.exists) {
            setuserbooking(documentSnapshot.data());
          }
        });

      firestore()
        .collection('ListBooking')
        .doc(idhotel)
        .get()
        .then((documentSnapshot) => {
          if (documentSnapshot.exists) {
            setcheckdata1(true);
          }
        });
    });
    return () => {
      unsubscribe;
    };
  }, [navigate]);

  const addbooking = () => {
    let id = uuid.v4();
    if (
      !userbooking.name ||
      !userbooking.phone ||
      !userbooking.birthday ||
      !userbooking.email
    ) {
      Alert.alert(
        t('you-have-not-entered-personal-information') +
          ', ' +
          t('please-fill-all-information'),
      );
    } else {
      let x =
        start.getDate() +
        '/' +
        (start.getMonth() + 1) +
        '/' +
        start.getFullYear();
      let y =
        end.getDate() + '/' + (end.getMonth() + 1) + '/' + end.getFullYear();
      if (checkdata) {
        firestore()
          .collection('Booking')
          .doc(user.uid)
          .update({
            data: firestore.FieldValue.arrayUnion({
              userinfo: {
                name: userbooking.name,
                phone: userbooking.phone,
                birthday: userbooking.birthday,
                email: userbooking.email,
              },
              hotelinfo: {
                id: id,
                name: namehotel,
                idhotel: idhotel,
                roomname: item.name,
                price: item.price,
                checkin: x,
                checkout: y,
                dayamount: amount,
                status: 'ongoing',
                guess: Number,
                image: item.image[1],
                total: sum,
                userid: user.uid,
              },
            }),
          })
          .then(() => {
            console.log('Booking true!');
          });
      } else {
        firestore()
          .collection('Booking')
          .doc(user.uid)
          .set({
            data: firestore.FieldValue.arrayUnion({
              userinfo: {
                name: userbooking.name,
                phone: userbooking.phone,
                birthday: userbooking.birthday,
                email: userbooking.email,
              },
              hotelinfo: {
                id: id,
                name: namehotel,
                idhotel: idhotel,
                roomname: item.name,
                price: item.price,
                checkin: x,
                checkout: y,
                dayamount: amount,
                status: 'ongoing',
                guess: Number,
                image: item.image[1],
                total: sum,
                userid: user.uid,
              },
            }),
          })
          .then(() => {
            console.log('Booking false!');
          });
      }
      if (checkdata1) {
        firestore()
          .collection('ListBooking')
          .doc(idhotel)
          .update({
            data: firestore.FieldValue.arrayUnion({
              userinfo: {
                name: userbooking.name,
                phone: userbooking.phone,
                birthday: userbooking.birthday,
                email: userbooking.email,
              },
              hotelinfo: {
                id: id,
                name: namehotel,
                idhotel: idhotel,
                roomname: item.name,
                price: item.price,
                checkin: x,
                checkout: y,
                dayamount: amount,
                status: 'ongoing',
                guess: Number,
                image: item.image[1],
                total: sum,
                userid: user.uid,
              },
            }),
          })
          .then(() => {
            console.log('Booking true!');
          });
      } else {
        firestore()
          .collection('ListBooking')
          .doc(idhotel)
          .set({
            data: firestore.FieldValue.arrayUnion({
              userinfo: {
                name: userbooking.name,
                phone: userbooking.phone,
                birthday: userbooking.birthday,
                email: userbooking.email,
              },
              hotelinfo: {
                id: id,
                name: namehotel,
                idhotel: idhotel,
                roomname: item.name,
                price: item.price,
                checkin: x,
                checkout: y,
                dayamount: amount,
                status: 'ongoing',
                guess: Number,
                image: item.image[1],
                total: sum,
                userid: user.uid,
              },
            }),
          })
          .then(() => {
            console.log('Booking false!');
          });
      }
      setModalVisible(true);
    }
  };

  const day = new Date();
  const amount = dayamount > 0 ? dayamount : 1;
  const day1 = day.setDate(day.getDate() + 1);

  const start = new Date(startday !== '' ? startday : Date.now());
  const end = new Date(endday !== '' ? endday : day1);
  const sum = Math.floor(
    item.price * (amount === 1 ? amount : amount * (amount / (amount + 1))),
  );
  const Format = (number, day) => {
    var prices = day * number;
    return prices.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  };
  const FormatName = (name) => {
    //regex if name too long
    if (name.length > 60) {
      return name.substring(0, 60) + '...';
    }
    return name;
  };
  const FormatName1 = (name) => {
    if (name.length > 18) {
      return name.substring(0, 18) + '...';
    }
    return name;
  };
  return (
    <View style={{ flex: 1 }}>
      <CustomHeader title={'information-booking'} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          backgroundColor: colors.special,
        }}
      >
        <View
          style={{
            width: '100%',
            backgroundColor: colors.bg,
            marginTop: 10,
          }}
        >
          <View style={{ padding: 15 }}>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  paddingVertical: 10,
                }}
              >
                <Image
                  style={{
                    width: 120,
                    height: 100,
                    borderRadius: 10,
                  }}
                  source={{ uri: item.image[1] }}
                />
                <View style={{ marginLeft: 10 }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: 'bold',
                      color: colors.icon,
                    }}
                  >
                    {hotel.name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                      color: colors.text,
                      width: '90%',
                      height: 30,
                    }}
                  >
                    {FormatName1(item.name)}
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      width: 240,
                      fontWeight: 'bold',
                      marginTop: 10,
                      color: colors.icon,
                    }}
                  >
                    {FormatName(hotel.location + hotel.location)}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: '100%',
                  height: 1,
                  backgroundColor: '#E5E5E5',
                  marginTop: 10,
                }}
              />
            </View>
          </View>
        </View>
        <View
          style={{
            backgroundColor: colors.bg,
            height: 'auto',
            width: '100%',
            alignSelf: 'center',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              alignItems: 'center',
              paddingHorizontal: 15,
            }}
          >
            <Text
              style={{ fontWeight: '500', fontSize: 17, color: colors.icon }}
            >
              {t('check-in')}
            </Text>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 17,
                color: colors.text,
              }}
            >
              12:00, {start.getDate()}/{start.getMonth() + 1}/
              {start.getFullYear()}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              alignItems: 'center',
              paddingHorizontal: 15,
              marginTop: 10,
            }}
          >
            <Text
              style={{ fontWeight: '500', fontSize: 17, color: colors.icon }}
            >
              {t('check-out')}
            </Text>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 17,
                color: colors.text,
              }}
            >
              12:00, {end.getDate()}/{end.getMonth() + 1}/{end.getFullYear()}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              alignItems: 'center',
              paddingHorizontal: 15,
              marginTop: 10,
              marginBottom: 20,
            }}
          >
            <Text
              style={{ fontWeight: '500', fontSize: 17, color: colors.icon }}
            >
              {t('number-people')}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setNumber(Number > 1 ? Number - 1 : Number);
                }}
                style={{
                  width: 30,
                  height: 20,
                  backgroundColor: colors.special,
                  borderRadius: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 15,
                    color: colors.text,
                  }}
                >
                  -
                </Text>
              </TouchableOpacity>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 17,
                  color: colors.text,
                  marginHorizontal: 10,
                }}
              >
                {Number}
              </Text>
              <TouchableOpacity
                onPress={() => setNumber(Number + 1)}
                style={{
                  width: 30,
                  height: 20,
                  backgroundColor: colors.special,
                  borderRadius: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 15,
                    color: colors.text,
                  }}
                >
                  +
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View
          style={{
            backgroundColor: colors.bg,
            height: 190,
            width: '100%',
            marginTop: 10,
            padding: 15,
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
              style={{ fontSize: 20, fontWeight: 'bold', color: colors.text }}
            >
              {t('information-user-booking')}
            </Text>
            <Pressable
              onPress={() => {
                navigation.navigate('Chỉnh sửa thông tin');
              }}
            >
              <Text
                style={{ fontSize: 17, color: 'orange', fontWeight: 'bold' }}
              >
                {t('edit')}
              </Text>
            </Pressable>
          </View>
          <View style={{ marginTop: 5 }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 17,
                  color: colors.icon,
                }}
              >
                {t('name')}
              </Text>
              <Text
                style={{
                  fontSize: 17,
                  color: colors.text,
                  fontWeight: 'bold',
                }}
              >
                {userbooking.name}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 17,
                  color: colors.icon,
                }}
              >
                {t('phone')}
              </Text>
              <Text
                style={{
                  fontSize: 17,
                  color: colors.text,
                  fontWeight: 'bold',
                }}
              >
                {userbooking.phone}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 17,
                  color: colors.icon,
                }}
              >
                {t('email')}
              </Text>
              <Text
                style={{
                  fontSize: 17,
                  color: colors.text,
                  fontWeight: 'bold',
                }}
              >
                {userbooking.email}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 17,
                  color: colors.icon,
                }}
              >
                {t('age')}
              </Text>
              <Text
                style={{
                  fontSize: 17,
                  color: colors.text,
                  fontWeight: 'bold',
                }}
              >
                {userbooking.birthday}
              </Text>
            </View>
          </View>
        </View>
        <View style={{ marginTop: 10 }}>
          <View
            style={{
              backgroundColor: colors.bg,
              width: '100%',
              padding: 15,
            }}
          >
            <Text
              style={{ fontSize: 20, fontWeight: 'bold', color: colors.text }}
            >
              {t('payment')}
            </Text>
            <View
              style={{
                marginTop: 10,
                alignItems: 'center',
                flexDirection: 'row',
              }}
            >
              <Image
                source={{
                  uri: 'https://cdn4.iconfinder.com/data/icons/business-1221/24/Inflation-256.png',
                }}
                style={{
                  width: 30,
                  height: 30,
                }}
              />
              <Text
                style={{
                  fontSize: 17,
                  color: colors.text,
                  marginLeft: 10,
                }}
              >
                {t('payment-at-hotel')}
              </Text>
            </View>
          </View>
        </View>
        <View style={{ marginTop: 10 }}>
          <View
            style={{
              backgroundColor: colors.bg,
              width: '100%',
              padding: 15,
              marginBottom: 10,
            }}
          >
            <Text
              style={{ fontSize: 20, fontWeight: 'bold', color: colors.text }}
            >
              {t('payment-details')}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 10,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Image
                  source={{
                    uri: 'https://cdn4.iconfinder.com/data/icons/office-business-1/512/money-256.png',
                  }}
                  style={{ width: 30, height: 30 }}
                />
                <Text
                  style={{
                    fontSize: 17,
                    color: colors.text,
                    marginLeft: 10,
                  }}
                >
                  {t('cost-of-room')}
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 17,
                  color: colors.text,
                }}
              >
                {Format(item.price, dayamount)} đ
              </Text>
            </View>
            <View
              style={{
                width: '100%',
                height: 1,
                backgroundColor: '#E5E5E5',
                marginTop: 20,
              }}
            />
            <View
              style={{
                marginTop: 10,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Text
                style={{ fontSize: 20, color: colors.text, fontWeight: 'bold' }}
              >
                {t('total')}
              </Text>
              <Text
                style={{ fontSize: 22, color: colors.text, fontWeight: 'bold' }}
              >
                {dayamount != 1 && (
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: 'normal',
                      textDecorationLine: 'line-through',
                      textDecorationColor: colors.icon,
                      color: colors.icon,
                    }}
                  >
                    {' '}
                    {Format(item.price, dayamount)} đ
                  </Text>
                )}
                {''} {Format(sum, 1)} đ
              </Text>
            </View>
          </View>
        </View>

        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: 'rgba(0,0,0,0.5)',
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
            }}
            onPress={() => setModalVisible(false)}
          >
            <View
              style={{
                backgroundColor: colors.box,
                alignItems: 'center',
                borderRadius: 20,
                height: 200,
                width: 300,
                bottom: 30,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '700',
                  color: COLORS.primary,
                  marginTop: 20,
                }}
              >
                {t('booking-success')}
              </Text>
              <TouchableOpacity
                style={{
                  width: '80%',
                  height: 45,
                  backgroundColor: COLORS.primary,
                  borderRadius: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginVertical: 15,
                }}
                onPress={() => {
                  navigation.navigate('Booking');
                }}
              >
                <Text
                  style={{
                    color: 'white',
                    fontSize: 15,
                    fontWeight: '400',
                    marginVertical: 10,
                  }}
                >
                  {t('view-booking')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: '80%',
                  height: 45,
                  backgroundColor: COLORS.blurprimary,
                  borderRadius: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => {
                  setModalVisible(false);
                  navigation.navigate('TabNavigator');
                }}
              >
                <Text
                  style={{
                    color: COLORS.primary,
                    fontSize: 15,
                    fontWeight: 'bold',
                    marginVertical: 10,
                  }}
                >
                  {t('go-back')}
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
      </ScrollView>
      <View
        style={{
          width: '100%',
          height: 65,
          backgroundColor: colors.box,
          alignItems: 'center',
          justifyContent: 'center',
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
            addbooking();
          }}
        >
          <Text
            style={{
              fontSize: 15,
              fontWeight: 'bold',
              color: COLORS.white,
            }}
          >
            {t('confirm-booking')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
