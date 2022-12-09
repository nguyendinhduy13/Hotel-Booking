import Auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import COLORS from '../../consts/colors';
export default function Booked({ navigation, route }) {
  const { t } = useTranslation();
  const item = route.params;
  const dispatch = useDispatch();
  const [Number, setNumber] = useState(1);
  const { dayamount, startday, endday, namehotel, idhotel } = useSelector(
    (state) => state.Globalreducer,
  );
  const { userbooking } = useSelector((state) => state.BookingHotel);
  const user = Auth().currentUser;

  const [checkdata, setcheckdata] = useState(false);
  const [checkdata1, setcheckdata1] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
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
      .collection('ListBooking')
      .doc(idhotel)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          setcheckdata1(true);
        }
      });
  }, []);

  const addbooking = () => {
    let x =
      start.getDate() + '/' + start.getMonth() + '/' + start.getFullYear();
    let y = end.getDate() + '/' + end.getMonth() + '/' + end.getFullYear();
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
              name: namehotel,
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
              name: namehotel,
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
              name: namehotel,
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
              name: namehotel,
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
  };

  const day = new Date();
  const amount = dayamount > 0 ? dayamount : 1;
  const day1 = day.setDate(day.getDate() + 1);

  const start = new Date(startday !== '' ? startday : Date.now());
  const end = new Date(endday !== '' ? endday : day1);
  const sum = Math.floor(
    item.price * (amount === 1 ? amount : amount * (amount / (amount + 1))),
  );
  return (
    <ScrollView style={{ flex: 1 }}>
      <View
        style={{
          width: '100%',
          height: 100,
          backgroundColor: COLORS.white,
        }}
      >
        <View style={{ flexDirection: 'row', marginTop: 10 }}>
          <Icon
            name="location"
            size={22}
            color={COLORS.primary}
            style={{ left: 10 }}
          />
          <Text
            style={{
              left: 20,
              fontSize: 15,
              bottom: 2,
              color: COLORS.dark,
            }}
          >
            {t('information-booking')}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 5,
          }}
        >
          <Text style={{ left: 43, color: COLORS.dark }}>
            {userbooking.name} {'\n'}
            {userbooking.phone} {'\n'}
            {userbooking.birthday} {'\n'}
            {userbooking.email} {'\n'}
          </Text>
          <Icon1
            name="arrow-forward-ios"
            size={20}
            style={{ right: 7 }}
            onPress={() => {
              navigation.navigate('Chỉnh sửa thông tin');
            }}
          />
        </View>
      </View>
      <View style={styles.RecentlyBox}>
        <View
          style={{
            width: '98%',
            height: 200,
            alignSelf: 'center',
          }}
        >
          <Image style={styles.IMGRecent} source={{ uri: item.image[1] }} />
        </View>
        <View style={{ marginTop: 25 }}>
          <View style={{ paddingHorizontal: 20 }}>
            <Text
              style={{
                fontSize: 20,
                height: 25,
                color: COLORS.dark,
                fontWeight: '600',
              }}
            >
              {item.name}
            </Text>
            <View style={{ flexDirection: 'row' }}>
              <Text
                style={{
                  fontSize: 20,
                  paddingVertical: 10,
                  fontWeight: '700',
                  color: COLORS.primary,
                }}
              >
                {item.price}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: COLORS.dark,
                  paddingVertical: 13,
                  fontWeight: '600',
                }}
              >
                {' '}
                VND/{t('night')}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          backgroundColor: COLORS.white,
          height: 140,
          borderRadius: 15,
          width: '95%',
          alignSelf: 'center',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: 330,
            alignSelf: 'center',
            marginTop: 20,
          }}
        >
          <Text style={{ fontWeight: '500', fontSize: 17 }}>
            {t('check-in')}
          </Text>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 17,
              color: COLORS.dark,
            }}
          >
            {start.getDate()}/{start.getMonth()}/{start.getFullYear()}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: 330,
            alignSelf: 'center',
            marginTop: 20,
          }}
        >
          <Text style={{ fontWeight: '500', fontSize: 17 }}>
            {t('check-out')}
          </Text>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 17,
              color: COLORS.dark,
            }}
          >
            {end.getDate()}/{end.getMonth()}/{end.getFullYear()}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: 330,
            alignSelf: 'center',
            marginTop: 20,
          }}
        >
          <Text style={{ fontWeight: '500', fontSize: 17 }}>
            {t('number-people')}
          </Text>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 17,
              color: COLORS.dark,
            }}
          >
            {Number}
          </Text>
        </View>
      </View>
      <View
        style={{
          backgroundColor: COLORS.white,
          height: 180,
          borderRadius: 15,
          width: '95%',
          alignSelf: 'center',
          marginTop: 20,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: 330,
            alignSelf: 'center',
            marginTop: 20,
          }}
        >
          <Text style={{ fontWeight: '500', fontSize: 17 }}>
            {amount} {t('day')}
            {amount > 1 && t('day') === 'day' ? 's' : ''}
          </Text>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 17,
              color: COLORS.dark,
            }}
          >
            {sum} VNĐ
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: 330,
            alignSelf: 'center',
            marginTop: 20,
          }}
        ></View>
        <View
          style={{
            borderWidth: 0.2,
            borderColor: '#d0d0d0',
            marginTop: 20,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: 330,
            alignSelf: 'center',
            marginTop: 20,
          }}
        >
          <Text style={{ fontWeight: '500', fontSize: 17 }}>
            {t('total-money')}
          </Text>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 17,
              color: COLORS.dark,
            }}
          >
            {sum} VNĐ
          </Text>
        </View>
      </View>
      <View style={{ marginVertical: 12 }}>
        <Text
          style={{
            fontSize: 18,
            color: COLORS.dark,
            fontWeight: 'bold',
            marginLeft: 23,
          }}
        >
          {t('number-people')}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            width: 350,
            alignSelf: 'center',
            height: 55,
            alignItems: 'center',
            borderRadius: 10,
            marginTop: 10,
          }}
        >
          <TouchableOpacity
            style={{
              width: 50,
              backgroundColor: COLORS.blurprimary,
              height: 40,
              alignItems: 'center',
              borderRadius: 15,
            }}
            onPress={() => {
              setNumber(Number > 1 ? Number - 1 : Number);
            }}
          >
            <Text style={{ fontSize: 30, color: COLORS.primary }}>-</Text>
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 20,
              marginTop: 3,
              fontWeight: 'bold',
              color: COLORS.black,
              marginHorizontal: 30,
            }}
          >
            {Number}
          </Text>
          <TouchableOpacity
            style={{
              width: 50,
              backgroundColor: COLORS.blurprimary,
              height: 40,
              alignItems: 'center',
              borderRadius: 15,
            }}
            onPress={() => setNumber(Number + 1)}
          >
            <Text style={{ fontSize: 30, color: COLORS.primary }}>+</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: COLORS.primary,
            height: 45,
            width: 350,
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 20,
            marginTop: 15,
          }}
          onPress={() => {
            addbooking();
            setModalVisible(true);
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
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => setModalVisible(false)}
        >
          <View
            style={{
              backgroundColor: 'white',
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
              Đặt phòng thành công
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
                Xem phòng
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
                Hủy
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  Text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.dark,
  },
  RecentlyBox: {
    width: '100%',
    height: 300,
    color: 'black',
    backgroundColor: COLORS.white,
    marginBottom: 15,
    alignSelf: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 15,
    marginTop: 10,
    shadowColor: COLORS.black,
  },
  IMGRecent: {
    height: '100%',
    width: '100%',
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
});
