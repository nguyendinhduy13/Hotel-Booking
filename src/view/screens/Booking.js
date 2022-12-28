import Auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';
import COLORS from '../../consts/colors';
export default function Booking() {
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

  const CardBooking = ({ item, index }) => {
    return (
      <View
        key={index}
        style={{
          marginTop: 20,
          elevation: 10,
          borderRadius: 20,
          backgroundColor: COLORS.white,
          width: 350,
          alignSelf: 'center',
          height: 165,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
          }}
        >
          <Image
            source={{ uri: item.image }}
            style={{ width: 100, height: 100, borderRadius: 20 }}
          />
          <View style={{ marginLeft: 15 }}>
            <View
              style={{
                justifyContent: 'space-between',
                height: 85,
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
                    width: 230,
                    fontWeight: '400',
                    color: COLORS.dark,
                    fontSize: 15,
                  }}
                >
                  {item.roomname}
                </Text>
              </View>
              <Text style={{ fontSize: 18, fontWeight: '700' }}>
                {item.total} VNĐ
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            borderWidth: 0.2,
            height: 0,
            width: 350,
            borderColor: COLORS.grey,
            marginTop: 8,
          }}
        />
        {item.status === 'ongoing' && button === 1 ? (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 10,
              marginTop: 10,
            }}
          >
            <TouchableOpacity
              style={{
                borderWidth: 2,
                borderColor: COLORS.primary,
                borderRadius: 20,
                width: 150,
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
                Hủy đặt phòng
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: COLORS.primary,
                borderRadius: 15,
                width: 150,
                height: 37,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: COLORS.white,
                }}
              >
                Xem thông tin
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    );
  };
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            paddingTop: '4%',
            justifyContent: 'space-between',
          }}
        >
          <View style={{ flexDirection: 'row' }}>
            <Image
              source={require('../../assets/logo.png')}
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                marginLeft: 10,
              }}
            />
            <Text
              style={{
                fontSize: 22,
                fontWeight: 'bold',
                color: COLORS.dark,
                paddingTop: 2,
                marginLeft: 15,
              }}
            >
              My Booking
            </Text>
          </View>
          <Icon
            name="search"
            size={22}
            color={COLORS.dark}
            style={{ right: 20 }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: 320,
            alignSelf: 'center',
            marginTop: 20,
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
              Ongoing
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
              Completed
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
              Canceled
            </Text>
          </TouchableOpacity>
        </View>

        {data.map((item, index) =>
          item.hotelinfo.status === 'ongoing' && button === 1 ? (
            <View key={index} style={{ paddingVertical: 10 }}>
              <CardBooking item={item.hotelinfo} index={index} />
            </View>
          ) : item.hotelinfo.status === 'completed' && button === 2 ? (
            <View key={index} style={{ paddingVertical: 10 }}>
              <CardBooking item={item.hotelinfo} index={index} />
            </View>
          ) : item.hotelinfo.status === 'cancelled' && button === 3 ? (
            <View key={index} style={{ paddingVertical: 10 }}>
              <CardBooking item={item.hotelinfo} index={index} />
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
            />
            <Text
              style={{
                color: '#fa665b',
                fontSize: 20,
                fontWeight: '700',
                marginVertical: 20,
              }}
            >
              Cancel Booking
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
              Are you sure you want to cancel your hotel booking?
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '500',
                textAlign: 'center',
              }}
            >
              Only 80% of the money you can refund from your payment according
              to our policy
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
                  Cancel
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
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '500',
                    color: COLORS.white,
                  }}
                >
                  Yes, Continue
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}
