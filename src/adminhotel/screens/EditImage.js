import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import React, { useEffect, useState } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import COLORS from '../../consts/colors';
import BookingHotel from '../../redux/BookingHotel';
import CustomHeader from '../../view/components/CustomHeader';
export default function EditImage({ route }) {
  const { room } = useSelector((state) => state.BookingHotel);
  const data = route.params.item;
  const { id_ks } = useSelector((state) => state.Globalreducer);
  const dispatch = useDispatch();
  const [DataImage, setDataImage] = useState([]);
  const [Room, setRoom] = useState([]);

  const ImageDefault = (image) => {
    const parts = image.split('/');
    const fileName = decodeURIComponent(parts[parts.length - 1].split('?')[0]);
    const fileExtension = fileName.split('/');
    return fileExtension[2];
  };

  useEffect(() => {
    const newRoom = room.filter((item) => item.id === data.id);
    setDataImage(newRoom);
    let newRoom1 = room.map((item) => {
      let newImage = [...item.image];
      newImage = newImage.map((item1) => {
        let temp = ImageDefault(item1);
        return temp;
      });
      return { ...item, image: newImage };
    });
    setRoom(newRoom1);
  }, []);

  const editimage = (id, index) => {
    let newRoom = DataImage.map((item) => {
      if (item.id === id) {
        let newImage = [...item.image];
        newImage.splice(index, 1);
        return { ...item, image: newImage };
      }
      return item;
    });
    let newRoom1 = Room.map((item) => {
      if (item.id === id) {
        let newImage = [...item.image];
        newImage.splice(index, 1);
        return { ...item, image: newImage };
      }
      return item;
    });
    let newRoom2 = room.map((item) => {
      if (item.id === id) {
        let newImage = [...item.image];
        newImage.splice(index, 1);
        return { ...item, image: newImage };
      }
      return item;
    });
    firestore().collection('HotelList').doc(id_ks).set({ Room: newRoom1 });
    dispatch(BookingHotel.actions.addRoom(newRoom2));
    setDataImage(newRoom);
  };
  const addImage = async () => {
    const options = {
      maxWidth: 2000,
      maxHeight: 2000,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    const result = await launchImageLibrary(options);
    let image = result.assets[0].uri;
    const filename = image.substring(image.lastIndexOf('/') + 1);
    const uploadUri =
      Platform.OS === 'ios' ? image.replace('file://', '') : image;
    const task = storage()
      .ref(id_ks + '/' + data.id + '/' + filename)
      .putFile(uploadUri);
    try {
      await task;
    } catch (e) {
      console.error(e);
    }
    let newRoom = DataImage.map((item) => {
      if (item.id === data.id) {
        let newImage = [...item.image];
        newImage.push(image);
        return { ...item, image: newImage };
      }
      return item;
    });

    let newRoom1 = Room.map((item) => {
      if (item.id === data.id) {
        let newImage = [...item.image];
        newImage.push(image);
        return { ...item, image: newImage };
      }
      return item;
    });

    let newRoom2 = room.map((item) => {
      if (item.id === data.id) {
        let newImage = [...item.image];
        newImage.push(image);
        return { ...item, image: newImage };
      }
      return item;
    });

    dispatch(BookingHotel.actions.addRoom(newRoom2));
    firestore().collection('HotelList').doc(id_ks).set({ Room: newRoom1 });
    setDataImage(newRoom);
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <CustomHeader title={'image-hotel'} />
      <ScrollView>
        <View
          style={{
            flexWrap: 'wrap',
            flexDirection: 'row',
          }}
        >
          {DataImage.map((item, index) =>
            item.image.map((item1, index1) => (
              <View>
                <Icon
                  name="close"
                  size={25}
                  style={{
                    position: 'absolute',
                    zIndex: 2,
                    alignSelf: 'flex-end',
                    top: 15,
                    right: 15,
                    color: 'white',
                  }}
                  onPress={() => editimage(item.id, index1)}
                />
                <Image
                  key={index}
                  source={{
                    uri: item1,
                  }}
                  style={{
                    width: 170,
                    height: 170,
                    borderRadius: 10,
                    margin: 13,
                  }}
                />
              </View>
            )),
          )}
        </View>
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
        onPress={() => addImage()}
      >
        <Icon name="camerao" size={35} color={COLORS.primary} />
      </TouchableOpacity>
    </View>
  );
}
