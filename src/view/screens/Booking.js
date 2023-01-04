import Auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import Icon2 from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/Ionicons';
import COLORS from '../../consts/colors';
import Header from '../components/Header';
export default function Booking() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [button, setbutton] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setdata] = useState([]);
  const [data1, setdata1] = useState([]);
  const [idroom, setidroom] = useState('');
  const [idhotel, setidhotel] = useState('');
  const user = Auth().currentUser;
  const navigation = useNavigation();
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      firestore()
        .collection('Booking')
        .doc(user.uid)
        .get()
        .then((documentSnapshot) => {
          const data = documentSnapshot.data();
          setdata(data.data);
        });
    });
    return () => {
      unsubscribe;
    };
  }, [navigation]);

  const Format = (prices) => {
    return prices.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  };
  const FormatName = (name) => {
    //regex if name too long
    if (name.length > 55) {
      return name.substring(0, 55) + '...';
    }
    return name;
  };

  useEffect(() => {
    if (idhotel) {
      firestore()
        .collection('ListBooking')
        .doc(idhotel)
        .get()
        .then((documentSnapshot) => {
          setdata1(documentSnapshot.data().data);
        });
    }
  }, [idhotel]);

  const CancelBooking = (id) => {
    data.filter((item) => {
      if (item.hotelinfo.id === id) {
        item.hotelinfo.status = 'cancelled';
        setidhotel(item.hotelinfo.idhotel);
      }
    });
    firestore().collection('Booking').doc(user.uid).set({
      data: data,
    });
    data1.filter((item) => {
      if (item.hotelinfo.id === id) {
        item.hotelinfo.status = 'cancelled';
      }
    });

    firestore().collection('ListBooking').doc(idhotel).set({
      data: data1,
    });
  };

  const CardBooking = ({ item, user, index }) => {
    return (
      <View
        key={index}
        style={{
          backgroundColor: colors.box,
          borderRadius: 15,
          marginTop: 10,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          width: '93%',
          alignSelf: 'center',
        }}
      >
        <View style={{ flexDirection: 'row', padding: 10 }}>
          <Image
            source={{ uri: item.image }}
            style={{ width: 100, height: 100, borderRadius: 15 }}
          />
          <View style={{ marginLeft: 10, width: '100%' }}>
            <Text
              style={{
                fontSize: 20,
                color: colors.text,
                fontWeight: 'bold',
              }}
            >
              {item.name}
            </Text>
            <Text
              style={{
                marginTop: 5,
                width: 220,
                fontSize: 15,
                color: colors.icon,
              }}
            >
              {FormatName(item.roomname)}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 'auto',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: 230,
              }}
            >
              <Text
                style={{ fontSize: 18, fontWeight: '700', color: colors.text }}
              >
                {Format(item.total)} <Text style={{ fontSize: 13 }}>VNĐ</Text>
              </Text>
              <View
                style={{
                  padding: 5,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: COLORS.primary,
                }}
              >
                <Text
                  style={{
                    fontSize: 13,
                    color: COLORS.primary,
                  }}
                >
                  {t('ongoing')}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 10,
            paddingBottom: 10,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <View>
            <Text style={{ fontSize: 13, color: colors.icon }}>
              {t('check-in')}:{' '}
              <Text style={{ fontWeight: 'bold', color: colors.text }}>
                {item.checkin}
              </Text>
            </Text>
            <Text style={{ fontSize: 13, color: colors.icon }}>
              {t('check-out')}:{' '}
              <Text style={{ fontWeight: 'bold', color: colors.text }}>
                {item.checkout}
              </Text>
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: COLORS.primary,
                padding: 10,
                borderRadius: 10,
                width: 90,
                marginRight: 20,
              }}
              onPress={() => {
                setModalVisible(true);
                setidroom(item.id);
              }}
            >
              <Text style={{ color: COLORS.white, textAlign: 'center' }}>
                {t('cancel')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: COLORS.primary,
                padding: 10,
                borderRadius: 10,
                width: 90,
              }}
              onPress={() => {
                navigation.navigate('InfoBooking', { item: item, user: user });
              }}
            >
              <Text style={{ color: COLORS.white, textAlign: 'center' }}>
                {t('detail')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const CardCompleted = ({ item, index }) => {
    return (
      <View
        key={index}
        style={{
          backgroundColor: colors.box,
          borderRadius: 15,
          marginTop: 10,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          width: '93%',
          alignSelf: 'center',
        }}
      >
        <View style={{ flexDirection: 'row', padding: 10 }}>
          <Image
            source={{ uri: item.image }}
            style={{ width: 100, height: 100, borderRadius: 15 }}
          />
          <View style={{ marginLeft: 10, width: '100%' }}>
            <Text
              style={{
                fontSize: 20,
                color: colors.text,
                fontWeight: 'bold',
              }}
            >
              {item.name}
            </Text>
            <Text
              style={{
                marginTop: 5,
                width: 220,
                fontSize: 15,
                color: colors.icon,
              }}
            >
              {FormatName(item.roomname)}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 'auto',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: 230,
              }}
            >
              <Text
                style={{ fontSize: 18, fontWeight: '700', color: colors.text }}
              >
                {Format(item.total)} <Text style={{ fontSize: 13 }}>VNĐ</Text>
              </Text>
              <View
                style={{
                  padding: 5,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: COLORS.primary,
                }}
              >
                <Text
                  style={{
                    fontSize: 13,
                    color: COLORS.primary,
                  }}
                >
                  {t('completed')}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            backgroundColor: COLORS.blurprimary,
            padding: 10,
            borderRadius: 15,
            marginHorizontal: 10,
            marginBottom: 10,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Icon1 size={20} name="checkbox" color={COLORS.primary} />
          <Text
            style={{
              fontSize: 14,
              fontWeight: '600',
              color: COLORS.primary,
              marginLeft: 10,
            }}
          >
            {t('great-you-have-completed-your-booking')}
          </Text>
        </View>
      </View>
    );
  };

  const CardCancelled = ({ item, index }) => {
    return (
      <View
        key={index}
        style={{
          backgroundColor: colors.box,
          borderRadius: 15,
          marginTop: 10,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          width: '93%',
          alignSelf: 'center',
        }}
      >
        <View style={{ flexDirection: 'row', padding: 10 }}>
          <Image
            source={{ uri: item.image }}
            style={{ width: 100, height: 100, borderRadius: 15 }}
          />
          <View style={{ marginLeft: 10, width: '100%' }}>
            <Text
              style={{
                fontSize: 20,
                color: colors.text,
                fontWeight: 'bold',
              }}
            >
              {item.name}
            </Text>
            <Text
              style={{
                marginTop: 5,
                width: 220,
                fontSize: 15,
                color: colors.icon,
              }}
            >
              {FormatName(item.roomname)}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 'auto',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: 230,
              }}
            >
              <Text
                style={{ fontSize: 18, fontWeight: '700', color: colors.text }}
              >
                {Format(item.total)} <Text style={{ fontSize: 13 }}>VNĐ</Text>
              </Text>
              <View
                style={{
                  padding: 5,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: '#f76e64',
                }}
              >
                <Text
                  style={{
                    fontSize: 13,
                    color: '#f76e64',
                  }}
                >
                  {t('cancelled')}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            backgroundColor: '#fddbdb',
            padding: 10,
            borderRadius: 15,
            marginHorizontal: 10,
            marginBottom: 10,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Icon2 size={20} name="exclamationcircle" color="#f76e64" />
          <Text
            style={{
              fontSize: 14,
              fontWeight: '600',
              color: '#f76e64',
              marginLeft: 10,
            }}
          >
            {t('sorry-your-booking-has-been-cancelled')}
          </Text>
        </View>
      </View>
    );
  };
  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={{ paddingHorizontal: 20 }}>
        <Header name={t('my-booking')} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingBottom: 10,
            marginTop: 10,
          }}
        >
          <TouchableOpacity
            style={
              button === 1
                ? {
                    backgroundColor: COLORS.primary,
                    borderRadius: 10,
                    width: '30%',
                    height: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }
                : {
                    borderWidth: 2,
                    borderColor: COLORS.primary,
                    borderRadius: 10,
                    width: '30%',
                    height: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }
            }
            onPress={() => setbutton(1)}
          >
            <Text
              style={
                button === 1
                  ? {
                      fontSize: 16,
                      fontWeight: 'bold',
                      color: COLORS.white,
                    }
                  : {
                      fontSize: 16,
                      fontWeight: 'bold',
                      color: COLORS.primary,
                    }
              }
            >
              {t('ongoing')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={
              button === 2
                ? {
                    backgroundColor: COLORS.primary,
                    borderRadius: 10,
                    width: '30%',
                    height: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }
                : {
                    borderWidth: 2,
                    borderColor: COLORS.primary,
                    borderRadius: 10,
                    width: '30%',
                    height: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }
            }
            onPress={() => setbutton(2)}
          >
            <Text
              style={
                button === 2
                  ? {
                      fontSize: 16,
                      fontWeight: 'bold',
                      color: COLORS.white,
                    }
                  : {
                      fontSize: 16,
                      fontWeight: 'bold',
                      color: COLORS.primary,
                    }
              }
            >
              {t('completed')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={
              button === 3
                ? {
                    backgroundColor: COLORS.primary,
                    borderRadius: 10,
                    width: '30%',
                    height: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }
                : {
                    borderWidth: 2,
                    borderColor: COLORS.primary,
                    borderRadius: 10,
                    width: '30%',
                    height: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }
            }
            onPress={() => setbutton(3)}
          >
            <Text
              style={
                button === 3
                  ? {
                      fontSize: 16,
                      fontWeight: 'bold',
                      color: COLORS.white,
                    }
                  : {
                      fontSize: 16,
                      fontWeight: 'bold',
                      color: COLORS.primary,
                    }
              }
            >
              {t('cancelled')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {data.map((item, index) =>
          item.hotelinfo.status === 'ongoing' && button === 1 ? (
            <View key={index} style={{ paddingVertical: 5 }}>
              <CardBooking
                item={item.hotelinfo}
                user={item.userinfo}
                index={index}
              />
            </View>
          ) : item.hotelinfo.status === 'completed' && button === 2 ? (
            <View key={index} style={{ paddingVertical: 5 }}>
              <CardCompleted item={item.hotelinfo} index={index} />
            </View>
          ) : item.hotelinfo.status === 'cancelled' && button === 3 ? (
            <View key={index} style={{ paddingVertical: 5 }}>
              <CardCancelled item={item.hotelinfo} index={index} />
            </View>
          ) : null,
        )}
      </ScrollView>
      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <TouchableOpacity
          style={{
            justifyContent: 'flex-end',
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}
          onPress={() => setModalVisible(!modalVisible)}
        >
          <View
            style={{
              height: '38%',
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              backgroundColor: colors.box,
              elevation: 15,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              alignSelf: 'center',
              width: '100%',
              alignItems: 'center',
            }}
          >
            <TouchableOpacity
              style={{
                width: '20%',
                borderRadius: 20,
                backgroundColor: '#fff',
                height: 5,
                top: 10,
              }}
              onPress={() => setModalVisible(!modalVisible)}
            />
            <Text
              style={{
                color: '#fa665b',
                fontSize: 20,
                fontWeight: '700',
                marginVertical: 20,
              }}
            >
              {t('Cancel-booking')}
            </Text>
            <TouchableOpacity
              style={{ width: '90%', height: 2, backgroundColor: '#fff' }}
            />
            <Text
              style={{
                marginVertical: 10,
                fontSize: 18,
                fontWeight: '600',
                color: colors.text,
                textAlign: 'center',
              }}
            >
              {t('are-you-sure-you-want-to-cancel-your-hotel-booking')}
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '500',
                textAlign: 'center',
                color: colors.icon,
              }}
            >
              {t(
                'only-80%-of-the-money-you-can-refund-from-payment-according-to-our-policy',
              )}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 30,
                width: '85%',
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: COLORS.blurprimary,
                  width: 140,
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 50,
                  borderRadius: 15,
                }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '500',
                    color: COLORS.primary,
                  }}
                >
                  {t('cancel')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: COLORS.primary,
                  width: 140,
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 50,
                  borderRadius: 15,
                }}
                onPress={() => {
                  CancelBooking(idroom);
                  setModalVisible(!modalVisible);
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '500',
                    color: COLORS.white,
                  }}
                >
                  {t('yes-continue')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}
