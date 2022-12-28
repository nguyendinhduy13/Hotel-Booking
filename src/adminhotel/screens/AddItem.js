import firestore from '@react-native-firebase/firestore';
import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import COLORS from '../../consts/colors';
import BookingHotel from '../../redux/BookingHotel';
export default function AddItem({ navigation }) {
  const { room } = useSelector((state) => state.BookingHotel);
  const { id_ks } = useSelector((state) => state.Globalreducer);
  const dispatch = useDispatch();
  const deleteRoom = (id) => {
    const newRoom = room.filter((item) => item.id !== id);
    firestore().collection('HotelList').doc(id_ks).set({
      Room: newRoom,
    });
    dispatch(BookingHotel.actions.addRoom(newRoom));
  };
  return (
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
        DANH SÁCH PHÒNG CỦA KHÁCH SẠN
      </Text>
      <ScrollView
        style={{
          height: '95%',
        }}
      >
        {room.map((item, index) => (
          <View
            key={index}
            style={{
              height: 130,
              width: '95%',
              flexDirection: 'row',
              backgroundColor: 'white',
              marginTop: 15,
              alignSelf: 'center',
              borderRadius: 20,
            }}
          >
            <Image
              source={{ uri: item.image[0] }}
              style={{
                height: 120,
                width: 120,
                alignSelf: 'center',
                borderRadius: 15,
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
            <TouchableOpacity
              style={{
                position: 'absolute',
                right: 10,
                width: 50,
                height: 40,
                top: 15,
                borderRadius: 5,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'red',
              }}
              onPress={() => navigation.navigate('EditRoom', { item })}
            >
              <Text style={{ color: 'white', fontWeight: '400' }}>Sửa</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                position: 'absolute',
                top: 70,
                right: 10,
                width: 50,
                height: 40,
                borderRadius: 5,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'red',
              }}
              onPress={() => deleteRoom(item.id)}
            >
              <Text style={{ color: 'white', fontWeight: '400' }}>Xóa</Text>
            </TouchableOpacity>
          </View>
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
