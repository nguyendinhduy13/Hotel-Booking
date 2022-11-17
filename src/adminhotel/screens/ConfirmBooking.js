import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';
import { ScrollView } from 'react-native';
import COLORS from '../../consts/colors';

const ConfirmBooking = () => {
    const { id_ks } = useSelector(state => state.Globalreducer);
    const [data, setdata] = useState([]);
    const [index, setindex] = useState(false);
    useEffect(() => {
        firestore()
            .collection('ListBooking')
            .doc(id_ks)
            .get()
            .then(documentSnapshot => {
                const data = documentSnapshot.data();
                setdata(data.data);
            });
    }, [data,index]);

    const ConfirmBooking = (roomname, useruid) => {
        data.map(item => item.hotelinfo).filter(item => {
            if (item.roomname === roomname) {
                item.status = 'completed';
            }
        });

        const datastart = data
            .map(item => item)
            .filter(
                item => item.hotelinfo.userid === useruid,
                item => {
                    if (item.hotelinfo.roomname === roomname) {
                        item.hotelinfo.status = 'completed';
                    }
                },
            );

        datastart
            .map(item => item.hotelinfo)
            .filter(item => {
                if (item.roomname === roomname) {
                    item.status = 'completed';
                }
            });

        firestore().collection('ListBooking').doc(id_ks).set({
            data: data,
        });

        firestore().collection('Booking').doc(useruid).set({
            data: datastart,
        });
    };

    const CancelBooking = (roomname, useruid) => {
        setindex(!index);
        data.map(item => item.hotelinfo).filter(item => {
            if (item.roomname === roomname) {
                item.status = 'cancelled';
            }
        });

        const datastart = data
            .map(item => item)
            .filter(
                item => item.hotelinfo.userid === useruid,
                item => {
                    if (item.hotelinfo.roomname === roomname) {
                        item.hotelinfo.status = 'cancelled';
                    }
                },
            );

        datastart
            .map(item => item.hotelinfo)
            .filter(item => {
                if (item.roomname === roomname) {
                    item.status = 'cancelled';
                }
            });

        firestore().collection('ListBooking').doc(id_ks).set({
            data: data,
        });

        firestore().collection('Booking').doc(useruid).set({
            data: datastart,
        });
    };

    return (
        <ScrollView>
            {data
                ? data.map((item, index) => (
                      <View key={index}>
                          {item.hotelinfo.status !== 'cancelled' ? (
                              <View
                                  style={{
                                      flexDirection: 'row',
                                      backgroundColor: 'white',
                                      marginTop: 10,
                                      width: '95%',
                                      alignSelf: 'center',
                                      borderRadius: 20,
                                      height: 120,
                                  }}>
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
                                          }}>
                                          {item.hotelinfo.roomname}
                                      </Text>
                                      <Text
                                          style={{
                                              fontSize: 17,
                                              fontWeight: '600',
                                              color: 'black',
                                              marginVertical: 10,
                                              left: 5,
                                          }}>
                                          {item.hotelinfo.price}
                                      </Text>
                                      <View style={{ flexDirection: 'row' }}>
                                          <TouchableOpacity
                                              style={
                                                  item.hotelinfo.status ===
                                                  'ongoing'
                                                      ? {
                                                            height: 30,
                                                            width: 100,
                                                            backgroundColor:
                                                                'red',
                                                            alignItems:
                                                                'center',
                                                            justifyContent:
                                                                'center',
                                                            borderRadius: 10,
                                                        }
                                                      : {
                                                            height: 30,
                                                            width: 100,
                                                            backgroundColor:
                                                                COLORS.primary,
                                                            alignItems:
                                                                'center',
                                                            justifyContent:
                                                                'center',
                                                            borderRadius: 10,
                                                        }
                                              }>
                                              <Text
                                                  style={{
                                                      color: 'white',
                                                      fontWeight: '500',
                                                  }}
                                                  onPress={() =>
                                                      ConfirmBooking(
                                                          item.hotelinfo
                                                              .roomname,
                                                          item.hotelinfo.userid,
                                                      )
                                                  }>
                                                  {item.hotelinfo.status ===
                                                  'ongoing'
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
                                              }}>
                                              <Text
                                                  style={{
                                                      color: 'white',
                                                      fontWeight: '500',
                                                  }}
                                                  onPress={() =>
                                                      CancelBooking(
                                                          item.hotelinfo
                                                              .roomname,
                                                          item.hotelinfo.userid,
                                                      )
                                                  }>
                                                  Hủy
                                              </Text>
                                          </TouchableOpacity>
                                      </View>
                                  </View>
                              </View>
                          ) : null}
                      </View>
                  ))
                : null}
        </ScrollView>
    );
};

export default ConfirmBooking;
