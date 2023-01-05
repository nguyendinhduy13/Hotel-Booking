import firestore from '@react-native-firebase/firestore';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import COLORS from '../../consts/colors';
import Globalreducer from '../../redux/Globalreducer';

const ConfirmBooking = () => {
  const { id_ks, dataconfirm } = useSelector((state) => state.Globalreducer);
  const dispatch = useDispatch();
  const [exists, setExists] = useState(true);
  useEffect(() => {
    let count = 0;
    dataconfirm.map((item) => {
      if (item.hotelinfo.status !== 'cancelled') {
        count++;
      }
    });
    if (count <= 0) {
      setExists(false);
    } else {
      setExists(true);
    }
  }, []);
  const ConfirmBooking = (roomname, useruid) => {
    let databooking = dataconfirm.map((item) => {
      if (
        item.hotelinfo.roomname === roomname &&
        item.hotelinfo.status === 'ongoing'
      ) {
        let newdata = Object.assign({}, item.hotelinfo, {
          status: 'completed',
        });
        return { ...item, hotelinfo: newdata };
      }
      return item;
    });

    let datastart = dataconfirm.map((item) => {
      if (
        item.hotelinfo.roomname === roomname &&
        item.hotelinfo.userid === useruid &&
        item.hotelinfo.status === 'ongoing'
      ) {
        let newdata = Object.assign({}, item.hotelinfo, {
          status: 'completed',
        });
        return { ...item, hotelinfo: newdata };
      }
      return item;
    });

    firestore().collection('ListBooking').doc(id_ks).set({
      data: databooking,
    });

    firestore().collection('Booking').doc(useruid).set({
      data: datastart,
    });
    dispatch(Globalreducer.actions.setDataConfirm(databooking));
    let arr = {
      labels: ['December', 'January'],
      datasets: [
        {
          data: [],
        },
      ],
    };
    firestore()
      .collection('ListBooking')
      .doc(id_ks)
      .get()
      .then(async (documentSnapshot) => {
        if (documentSnapshot.exists) {
          const data1 = documentSnapshot.data().data;
          await data1.forEach((item) => {
            if (item.hotelinfo.status === 'completed') {
              let a = Math.trunc(item.hotelinfo.price / 1000);
              arr.datasets[0].data.push(a);
            }
          });
          dispatch(Globalreducer.actions.setDataRevenue(arr));
        }
      });
  };

  const CancelBooking = (roomname, useruid) => {
    let databooking = dataconfirm.map((item) => {
      if (
        item.hotelinfo.roomname === roomname &&
        item.hotelinfo.status !== 'cancelled'
      ) {
        let newdata = Object.assign({}, item.hotelinfo, {
          status: 'cancelled',
        });
        return { ...item, hotelinfo: newdata };
      }
      return item;
    });

    let datastart = dataconfirm.map((item) => {
      if (
        item.hotelinfo.roomname === roomname &&
        item.hotelinfo.userid === useruid &&
        item.hotelinfo.status !== 'cancelled'
      ) {
        let newdata = Object.assign({}, item.hotelinfo, {
          status: 'cancelled',
        });
        return { ...item, hotelinfo: newdata };
      }
      return item;
    });
    firestore().collection('ListBooking').doc(id_ks).set({
      data: databooking,
    });

    firestore().collection('Booking').doc(useruid).set({
      data: datastart,
    });

    dispatch(Globalreducer.actions.setDataConfirm(databooking));

    let arr = {
      labels: ['December', 'January'],
      datasets: [
        {
          data: [],
        },
      ],
    };
    firestore()
      .collection('ListBooking')
      .doc(id_ks)
      .get()
      .then(async (documentSnapshot) => {
        if (documentSnapshot.exists) {
          const data1 = documentSnapshot.data().data;
          await data1.forEach((item) => {
            if (item.hotelinfo.status === 'completed') {
              let a = Math.trunc(item.hotelinfo.price / 1000);
              arr.datasets[0].data.push(a);
            }
          });
          dispatch(Globalreducer.actions.setDataRevenue(arr));
        }
      });
  };

  const renderConfirm = (item, index) => {
    return (
      <View
        key={index}
        style={{
          marginVertical: 5,
        }}
      >
        {item.hotelinfo.status !== 'cancelled' ? (
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: 'white',
              marginTop: 10,
              width: '95%',
              elevation: 5,
              alignSelf: 'center',
              borderRadius: 20,
              height: 120,
            }}
          >
            <Image
              source={{ uri: item.hotelinfo.image }}
              style={{
                height: 100,
                width: 100,
                borderRadius: 10,
                marginLeft: 10,
                alignSelf: 'center',
              }}
            />
            <View style={{ marginTop: 10, left: 15 }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: 'black',
                  left: 5,
                }}
              >
                {item.hotelinfo.roomname}
              </Text>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: '600',
                  color: 'black',
                  marginVertical: 10,
                  left: 5,
                }}
              >
                {item.hotelinfo.price}
              </Text>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                  disabled={item.hotelinfo.status !== 'ongoing' ? true : false}
                  style={
                    item.hotelinfo.status === 'ongoing'
                      ? {
                          height: 30,
                          width: 100,
                          backgroundColor: 'red',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 10,
                        }
                      : {
                          height: 30,
                          width: 100,
                          backgroundColor: COLORS.primary,
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 10,
                        }
                  }
                >
                  <Text
                    style={{
                      color: 'white',
                      fontWeight: '500',
                    }}
                    onPress={() =>
                      ConfirmBooking(
                        item.hotelinfo.roomname,
                        item.hotelinfo.userid,
                      )
                    }
                  >
                    {item.hotelinfo.status === 'ongoing'
                      ? 'Xác nhận'
                      : 'Đã xác nhận'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    height: 30,
                    width: 100,
                    backgroundColor: 'red',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 10,
                    left: 15,
                  }}
                >
                  <Text
                    style={{
                      color: 'white',
                      fontWeight: '500',
                    }}
                    onPress={() =>
                      CancelBooking(
                        item.hotelinfo.roomname,
                        item.hotelinfo.userid,
                      )
                    }
                  >
                    Hủy
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : null}
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      {exists ? (
        <View>
          <Text
            style={{
              fontSize: 18,
              color: COLORS.dark,
              fontWeight: '600',
              justifyContent: 'center',
              alignSelf: 'center',
              marginTop: 10,
            }}
          >
            Xác nhận đặt phòng
          </Text>
          <FlatList
            data={dataconfirm}
            renderItem={({ item, index }) => renderConfirm(item, index)}
            keyExtractor={(item) => {
              item.hotelinfo.userid;
            }}
          />
        </View>
      ) : (
        <View
          style={{ alignItems: 'center', justifyContent: 'center', top: '50%' }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: 'black',
            }}
          >
            Hiện chưa có đơn đặt phòng
          </Text>
        </View>
      )}
    </View>
  );
};

export default ConfirmBooking;
