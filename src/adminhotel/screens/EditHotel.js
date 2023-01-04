import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import React, { useEffect, useState } from 'react';
import {
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/AntDesign';
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

  const selectImage = async () => {
    const options = {
      maxWidth: 2000,
      maxHeight: 2000,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    const result = await launchImageLibrary(options);
    setImage(result.assets[0].uri);
  };

  const uploadImage = async () => {
    const filename = image.substring(image.lastIndexOf('/') + 1);
    const uploadUri =
      Platform.OS === 'ios' ? image.replace('file://', '') : image;
    setImage(null);
    const task = storage()
      .ref(id_ks + '/' + filename)
      .putFile(uploadUri);
    // set progress state
    try {
      await task;
    } catch (e) {
      console.error(e);
    }
  };

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
    uploadImage();
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <CustomHeader title={'change-information-hotel'} />
      <Text
        style={{
          fontSize: 16,
          fontWeight: '700',
          marginTop: 20,
          marginHorizontal: 10,
          color: COLORS.dark,
        }}
      >
        Tên khách sạn
      </Text>
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
      <Text
        style={{
          fontSize: 16,
          fontWeight: '700',
          marginTop: 10,
          alignSelf: 'flex-start',
          marginHorizontal: 10,
          color: COLORS.dark,
        }}
      >
        Thuận lợi
      </Text>
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
      <Text
        style={{
          fontSize: 16,
          fontWeight: '700',
          marginTop: 10,
          alignSelf: 'flex-start',
          marginHorizontal: 10,
          color: COLORS.dark,
        }}
      >
        Hình ảnh
      </Text>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
        }}
      >
        <TextInput
          placeholder="Hình phòng"
          style={{
            height: 50,
            borderWidth: 1,
            borderColor: COLORS.grey,
            width: '95%',
            borderRadius: 15,
            alignSelf: 'flex-start',
            backgroundColor: 'white',
            marginTop: 15,
            marginHorizontal: 10,
          }}
          value={image}
        />
        <Icon
          name="clouduploado"
          size={30}
          style={{ position: 'absolute', top: 25, zIndex: 1, right: 25 }}
          onPress={selectImage}
        />
      </View>
      <Text
        style={{
          fontSize: 16,
          fontWeight: '700',
          marginTop: 10,
          alignSelf: 'flex-start',
          marginHorizontal: 10,
          color: COLORS.dark,
        }}
      >
        Mô tả
      </Text>
      <TextInput
        placeholder="Mô tả"
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
