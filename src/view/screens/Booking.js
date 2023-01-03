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
import Icon2 from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/Ionicons';
import COLORS from '../../consts/colors';
export default function Booking() {
  const { t } = useTranslation();
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
          marginTop: 5,
          width: '93%',
          justifyContent: 'center',
          padding: 10,
          borderRadius: 20,
          backgroundColor: COLORS.white,
          alignSelf: 'center',
          height: 210,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
          }}
        >
          <Image
            source={{ uri: item.image }}
            style={{ width: 120, height: 120, borderRadius: 20 }}
          />
          <View
            style={{
              marginLeft: 15,
              justifyContent: 'space-between',
            }}
          >
            <View>
              <Text
                style={{
                  fontSize: 20,
                  color: COLORS.dark,
                  fontWeight: '600',
                }}
              >
                {item.name}
              </Text>
              <Text
                style={{
                  width: 215,
                  fontWeight: '400',
                  color: COLORS.dark,
                  fontSize: 15,
                  marginVertical: 2,
                }}
              >
                {item.roomname}
              </Text>
            </View>
            <View
              style={{
                bottom: 3,
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: '700' }}>
                {Format(item.total)} VNĐ
              </Text>
            </View>
            <View
              style={{
                backgroundColor: COLORS.blurprimary,
                width: 90,
                height: 25,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
                bottom: 3,
              }}
            >
              <Text
                style={{
                  fontWeight: '700',
                  color: COLORS.primary,
                }}
              >
                {t('ongoing')}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            borderWidth: 1,
            height: 0,
            width: 350,
            borderColor: '#f2f2f2',
            marginTop: 8,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 15,
          }}
        >
          <TouchableOpacity
            style={{
              borderWidth: 2,
              borderColor: COLORS.primary,
              borderRadius: 20,
              width: 160,
              height: 37,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              setModalVisible(true);
              setidroom(item.id);
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: COLORS.primary,
              }}
            >
              {t('Cancel-booking')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.primary,
              borderRadius: 20,
              width: 160,
              height: 37,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              navigation.navigate('InfoBooking', { item: item, user: user });
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: COLORS.white,
              }}
            >
              {t('see-information')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const CardCompleted = ({ item, index }) => {
    return (
      <View
        key={index}
        style={{
          marginTop: 5,
          width: '93%',
          justifyContent: 'center',
          padding: 10,
          borderRadius: 20,
          backgroundColor: COLORS.white,
          alignSelf: 'center',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
          }}
        >
          <Image
            source={{ uri: item.image }}
            style={{ width: 120, height: 120, borderRadius: 20 }}
          />
          <View
            style={{
              marginLeft: 15,
              justifyContent: 'space-between',
            }}
          >
            <View>
              <Text
                style={{
                  fontSize: 20,
                  color: COLORS.dark,
                  fontWeight: '600',
                }}
              >
                {item.name}
              </Text>
              <Text
                style={{
                  width: 215,
                  fontWeight: '400',
                  color: COLORS.dark,
                  fontSize: 15,
                  marginVertical: 2,
                }}
              >
                {item.roomname}
              </Text>
            </View>
            <View
              style={{
                bottom: 3,
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: '700' }}>
                {Format(item.total)} VNĐ
              </Text>
            </View>
            <View
              style={{
                backgroundColor: COLORS.blurprimary,
                width: 90,
                height: 25,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
                bottom: 3,
              }}
            >
              <Text
                style={{
                  fontWeight: '700',
                  color: COLORS.primary,
                }}
              >
                {t('completed')}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            borderWidth: 1,
            height: 0,
            width: 350,
            borderColor: '#f2f2f2',
            marginTop: 8,
          }}
        />
        <View
          style={{
            backgroundColor: COLORS.blurprimary,
            width: '95%',
            borderRadius: 10,
            alignSelf: 'center',
            height: 35,
            marginVertical: 15,
            top: 5,
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: 10,
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
          marginTop: 5,
          width: '93%',
          justifyContent: 'center',
          padding: 10,
          borderRadius: 20,
          backgroundColor: COLORS.white,
          alignSelf: 'center',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
          }}
        >
          <Image
            source={{ uri: item.image }}
            style={{ width: 120, height: 120, borderRadius: 20 }}
          />
          <View
            style={{
              marginLeft: 15,
              justifyContent: 'space-between',
            }}
          >
            <View>
              <Text
                style={{
                  fontSize: 20,
                  color: COLORS.dark,
                  fontWeight: '600',
                }}
              >
                {item.name}
              </Text>
              <Text
                style={{
                  width: 215,
                  fontWeight: '400',
                  color: COLORS.dark,
                  fontSize: 15,
                  marginVertical: 2,
                }}
              >
                {item.roomname}
              </Text>
            </View>
            <View
              style={{
                bottom: 3,
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: '700' }}>
                {Format(item.total)} VNĐ
              </Text>
            </View>
            <View
              style={{
                backgroundColor: '#fddbdb',
                width: 90,
                height: 25,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
                bottom: 3,
              }}
            >
              <Text
                style={{
                  fontWeight: '700',
                  color: '#f76e64',
                }}
              >
                {t('cancelled')}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            borderWidth: 1,
            height: 0,
            width: 350,
            borderColor: '#f2f2f2',
            marginTop: 8,
          }}
        />
        <View
          style={{
            backgroundColor: '#fddbdb',
            width: '95%',
            borderRadius: 10,
            alignSelf: 'center',
            height: 35,
            marginVertical: 15,
            top: 5,
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: 10,
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
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View
          style={{
            paddingTop: '4%',
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: '700',
              alignSelf: 'center',
              textAlign: 'center',
              color: COLORS.black,
            }}
          >
            {t('my-booking')}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: 320,
            alignSelf: 'center',
            marginTop: 10,
          }}
        >
          <TouchableOpacity
            style={
              button === 1
                ? {
                    backgroundColor: COLORS.primary,
                    borderRadius: 20,
                    width: 95,
                    height: 37,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }
                : {
                    borderWidth: 2,
                    borderColor: COLORS.primary,
                    borderRadius: 20,
                    width: 95,
                    height: 37,
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
                    borderRadius: 20,
                    width: 95,
                    height: 37,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }
                : {
                    borderWidth: 2,
                    borderColor: COLORS.primary,
                    borderRadius: 20,
                    width: 95,
                    height: 37,
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
                    borderRadius: 20,
                    width: 95,
                    height: 37,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }
                : {
                    borderWidth: 2,
                    borderColor: COLORS.primary,
                    borderRadius: 20,
                    width: 95,
                    height: 37,
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

        {data.map((item, index) =>
          item.hotelinfo.status === 'ongoing' && button === 1 ? (
            <View key={index} style={{ paddingVertical: 10 }}>
              <CardBooking
                item={item.hotelinfo}
                user={item.userinfo}
                index={index}
              />
            </View>
          ) : item.hotelinfo.status === 'completed' && button === 2 ? (
            <View key={index} style={{ paddingVertical: 10 }}>
              <CardCompleted item={item.hotelinfo} index={index} />
            </View>
          ) : item.hotelinfo.status === 'cancelled' && button === 3 ? (
            <View key={index} style={{ paddingVertical: 10 }}>
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
              backgroundColor: 'white',
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
                width: '15%',
                borderRadius: 20,
                backgroundColor: '#bcbcbc',
                height: 5,
                top: 5,
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
              style={{ width: '90%', height: 2, backgroundColor: '#f3f6f4' }}
            />
            <Text
              style={{
                marginVertical: 10,
                fontSize: 18,
                fontWeight: '600',
                color: '#5b5b5b',
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
                  width: 160,
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 50,
                  borderRadius: 25,
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
                  width: 160,
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 50,
                  borderRadius: 25,
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
