import firestore from '@react-native-firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import COLORS from '../../consts/colors';
import CustomHeader from '../../view/components/CustomHeader';
export default function EditHotel({ navigation, route }) {
  const hotel = route.params.hotel;
  const { id_ks } = useSelector((state) => state.Globalreducer);
  const dispatch = useDispatch();
  const [name, setName] = useState();
  const [advantages, setAdvantages] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [Listhotel, setListHotel] = useState([]);
  useEffect(() => {
    firestore()
      .collection('ListHotel')
      .doc('ListHotel')
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          let data = documentSnapshot.data().ListHotel;
          setListHotel(data);
        }
      });
  }, []);

  useEffect(() => {
    setName(hotel[0].name);
    setAdvantages(hotel[0].advantage);
    setDescription(hotel[0].description);
    setImage(hotel[0].image);
  }, []);

  const UpdateHotel = () => {
    Listhotel.map((item) => {
      if (item.id === id_ks) {
        item.name = name;
        item.advantage = advantages;
        item.description = description;
        item.image = image;
      }
    });
    firestore()
      .collection('ListHotel')
      .doc('ListHotel')
      .set({
        ListHotel: Listhotel,
      })
      .then(() => {
        console.log('User updated!');
      });
    navigation.goBack();
  };

  return (
    <View>
      <CustomHeader title={'Chỉnh sửa thông tin khách sạn'} />
      <TextInput
        placeholder="Tên khách sạn"
        multiline={true}
        value={name}
        onChangeText={(text) => setName(text)}
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 10,
          margin: 10,
          borderRadius: 15,
          backgroundColor: '#fff',
        }}
      />
      <TextInput
        placeholder="Thuận lợi"
        multiline={true}
        value={advantages}
        onChangeText={(text) => setAdvantages(text)}
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 10,
          margin: 10,
          borderRadius: 15,
          backgroundColor: '#fff',
        }}
      />
      <TextInput
        placeholder="Hình khách sạn"
        multiline={true}
        value={image}
        onChangeText={(text) => setImage(text)}
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 10,
          margin: 10,
          borderRadius: 15,
          backgroundColor: '#fff',
        }}
      />
      <TextInput
        placeholder="Tên khách sạn"
        multiline={true}
        value={description}
        onChangeText={(text) => setDescription(text)}
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 10,
          margin: 10,
          borderRadius: 15,
          backgroundColor: '#fff',
        }}
      />
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
        onPress={() => UpdateHotel()}
      >
        <Text style={{ fontSize: 15, color: 'white', fontWeight: '700' }}>
          Cập nhật thông tin
        </Text>
      </TouchableOpacity>
    </View>
  );
}
