import firestore from '@react-native-firebase/firestore';
import React, { useEffect } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import COLORS from '../../consts/colors';
import Globalreducer from '../../redux/Globalreducer';
export default function AddItem({ navigation }) {
  const { room } = useSelector((state) => state.BookingHotel);
  const { id_ks } = useSelector((state) => state.Globalreducer);
  const dispatch = useDispatch();
  let arr = {
    labels: ['December', 'January'],
    datasets: [
      {
        data: [],
      },
    ],
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
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
    });
    return unsubscribe;
  }, [navigation]);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      firestore()
        .collection('ListBooking')
        .doc(id_ks)
        .get()
        .then((documentSnapshot) => {
          const data = documentSnapshot.data();
          dispatch(Globalreducer.actions.setDataConfirm(data.data));
        });
    });
    return unsubscribe;
  }, [navigation]);
  return (
    <View style={{ backgroundColor: 'white' }}>
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
        DANH SÁCH PHÒNG CỦA KHÁCH SẠN
      </Text>
      <ScrollView
        style={{
          height: '95%',
        }}
      >
        {room.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={{
              height: 130,
              width: '95%',
              flexDirection: 'row',
              backgroundColor: 'white',
              marginTop: 15,
              elevation: 5,
              alignSelf: 'center',
              borderRadius: 20,
            }}
            onPress={() => {
              navigation.navigate('EditRoom', { item: item });
            }}
          >
            <Image
              source={{ uri: item.image[0] }}
              style={{
                height: 120,
                width: 120,
                alignSelf: 'center',
                borderRadius: 15,
                left: 5,
              }}
            />
            <View style={{ top: 10, left: 15 }}>
              <Text
                style={{
                  fontWeight: '500',
                  fontSize: 17,
                  color: 'black',
                  width: 170,
                }}
              >
                {item.name}
              </Text>
              <Text
                style={{
                  marginVertical: 10,
                  fontWeight: '400',
                  fontSize: 16,
                  color: 'black',
                }}
              >
                {item.price} VNĐ
              </Text>
              {/* {item.icon.map((items,index)=>(
                    <View key={index} style={{flexDirection:"row",marginTop:5}}>
                    <Image
                    source={{uri:index<3?items:null}}
                    style={{width:20,height:20}}
                    />
                    <Text style={{left:15,fontWeight:"600"}}>{index<3?item.tienich[index]:null}</Text>
                 </View>
                 ))} */}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity
        style={{
          borderWidth: 1,
          borderColor: '#03A9F4',
          position: 'absolute',
          width: 56,
          height: 56,
          alignItems: 'center',
          justifyContent: 'center',
          right: 20,
          bottom: 30,
          backgroundColor: 'white',
          borderRadius: 30,
          elevation: 8,
        }}
        onPress={() => {
          navigation.navigate('ItemInfo');
        }}
      >
        <Text style={{ fontSize: 40, bottom: 2 }}>+</Text>
      </TouchableOpacity>
    </View>
  );
}
