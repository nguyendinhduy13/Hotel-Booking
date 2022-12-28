import firestore from '@react-native-firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import COLORS from '../../consts/colors';
import BookingHotel from '../../redux/BookingHotel';
const EditRoom = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { id_ks } = useSelector((state) => state.Globalreducer);
  const countries = [
    'Ban công',
    'Tầm nhìn ra khung cảnh',
    'Điều hòa không khí',
    'Phòng tắm riêng trong phòng',
    'TV màn hình phẳng',
    'Sân hiên',
    'Nhìn ra hồ bơi',
    'Nhìn ra núi',
    'Nhìn ra biển',
    'Hồ bơi trên sân thượng',
    'Wifi miễn phí',
  ];
  const item = route.params.item;
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [are, setArea] = useState('');
  const { room } = useSelector((state) => state.BookingHotel);

  useEffect(() => {
    setName(item.name);
    setPrice(item.price + '');
    setArea(item.tienich[0]);
    setDescription(item.description);
  }, []);

  const EditRoom = () => {
    const EditRoom = room.map((item1) => {
      if (item1.id === item.id) {
        let newBenefit = [...item1.tienich];
        newBenefit.splice(0, 1, are);
        return {
          ...item1,
          tienich: newBenefit,
          name: name,
          price: price,
          description: description,
        };
      }
      return item1;
    });
    dispatch(BookingHotel.actions.addRoom(EditRoom));
    firestore().collection('HotelList').doc(id_ks).set({
      Room: EditRoom,
    });
  };
  return (
    <View>
      <Text
        style={{
          alignSelf: 'center',
          fontSize: 18,
          fontWeight: '500',
          marginTop: 10,
        }}
      >
        Chỉnh sửa thông tin phòng
      </Text>
      <View style={{ alignItems: 'center' }}>
        <TextInput
          placeholder="Tên phòng"
          style={{
            height: 50,
            backgroundColor: 'white',
            width: '95%',
            borderRadius: 15,
            marginTop: 10,
          }}
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          placeholder="Giá phòng"
          style={{
            height: 50,
            width: '95%',
            borderRadius: 15,
            backgroundColor: 'white',
            marginTop: 15,
          }}
          value={price}
          onChangeText={(text) => setPrice(text)}
        />

        <TextInput
          placeholder="Diện tích phòng"
          style={{
            height: 50,
            width: '95%',
            borderRadius: 15,
            alignSelf: 'flex-start',
            backgroundColor: 'white',
            marginTop: 15,
            marginHorizontal: 10,
          }}
          value={are}
          onChangeText={(text) => setArea(text)}
        />
        <TextInput
          placeholder="Mô tả"
          style={{
            textAlignVertical: 'top',
            width: '95%',
            flexWrap: 'wrap',
            borderRadius: 15,
            backgroundColor: 'white',
            marginTop: 15,
          }}
          multiline={true}
          value={description}
          onChangeText={(text) => setDescription(text)}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 20,
        }}
      >
        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: COLORS.primary,
            height: 45,
            borderRadius: 15,
            width: '45%',
            marginTop: 25,
          }}
          onPress={() => {
            navigation.navigate('EditBenefit', { item });
          }}
        >
          <Text style={{ fontSize: 15, color: 'white', fontWeight: '700' }}>
            Sửa tiện ích
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: COLORS.primary,
            height: 45,
            borderRadius: 15,
            width: '45%',
            marginTop: 25,
          }}
          onPress={() => {
            navigation.navigate('EditImage', { item });
          }}
        >
          <Text style={{ fontSize: 15, color: 'white', fontWeight: '700' }}>
            Sửa hình ảnh
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: COLORS.primary,
          height: 50,
          borderRadius: 15,
          width: '90%',
          alignSelf: 'center',
          marginTop: 25,
        }}
        onPress={EditRoom}
      >
        <Text style={{ fontSize: 15, color: 'white', fontWeight: '700' }}>
          Cập nhật phòng
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditRoom;
