import firestore from '@react-native-firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import COLORS from '../../consts/colors';
import BookingHotel from '../../redux/BookingHotel';
import CustomHeader from '../../view/components/CustomHeader';
export default function EditBenefit({ navigation, route }) {
  const { room } = useSelector((state) => state.BookingHotel);
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
  const [DataBenefit, setDataBenefit] = useState([]);
  const [benefit, setBenefit] = useState('');
  const data = route.params.item;
  const dispatch = useDispatch();
  const { id_ks } = useSelector((state) => state.Globalreducer);
  useEffect(() => {
    const newRoom = room.filter((item) => item.id === data.id);
    setDataBenefit(newRoom);
  }, []);
  const deleteBenefit = (id, index) => {
    let newRoom = DataBenefit.map((item) => {
      if (item.id === id) {
        let newBenefit = [...item.tienich];
        newBenefit.splice(index, 1);
        return { ...item, tienich: newBenefit };
      }
      return item;
    });
    let newRoom1 = room.map((item) => {
      if (item.id === id) {
        let newBenefit = [...item.tienich];
        newBenefit.splice(index, 1);
        return { ...item, tienich: newBenefit };
      }
      return item;
    });
    firestore().collection('HotelList').doc(id_ks).set({ Room: newRoom1 });
    dispatch(BookingHotel.actions.addRoom(newRoom1));
    setDataBenefit(newRoom);
  };

  const addBenefit = () => {
    let newRoom = DataBenefit.map((item) => {
      if (item.id === data.id) {
        let newBenefit = [...item.tienich, benefit];
        return { ...item, tienich: newBenefit };
      }
      return item;
    });
    let newRoom1 = room.map((item) => {
      if (item.id === data.id) {
        let newBenefit = [...item.tienich, benefit];
        return { ...item, tienich: newBenefit };
      }
      return item;
    });

    firestore().collection('HotelList').doc(id_ks).set({ Room: newRoom1 });
    dispatch(BookingHotel.actions.addRoom(newRoom1));
    setDataBenefit(newRoom);
  };

  return (
    <View style={{ flex: 1 }}>
      <CustomHeader title={'list-benefits'} />
      <ScrollView
        contentContainerStyle={{
          paddingTop: 20,
          paddingBottom: 20,
          height: '80%',
        }}
        bounces={false}
      >
        <View>
          {DataBenefit.map((item, index) =>
            item.tienich.map((item1, index1) => (
              <View
                key={index1}
                style={{
                  width: '90%',
                  height: 50,
                  backgroundColor: 'white',
                  elevation: 15,
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignSelf: 'center',
                  marginTop: 10,
                  borderRadius: 10,
                }}
              >
                <Icon
                  name="close"
                  size={25}
                  style={{
                    position: 'absolute',
                    alignSelf: 'flex-end',
                    right: 10,
                    color: 'black',
                  }}
                  onPress={() => deleteBenefit(item.id, index1)}
                />
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '500',
                    color: COLORS.black,
                  }}
                >
                  {item1}
                </Text>
              </View>
            )),
          )}
        </View>
      </ScrollView>
      <SelectDropdown
        buttonStyle={{
          backgroundColor: 'white',
          borderRadius: 15,
          width: '90%',
          alignSelf: 'center',
          elevation: 15,
          bottom: 75,
          position: 'absolute',
        }}
        data={countries}
        onSelect={(selectedItem, index) => {
          if (DataBenefit[0].tienich.includes(selectedItem)) {
            Alert.alert('Thông báo', 'Tiện ích đã tồn tại');
          } else {
            setBenefit(selectedItem);
          }
        }}
        dropdownStyle={{ width: '95%', borderRadius: 15 }}
        defaultButtonText="Tiện ích"
        buttonTextStyle={{
          fontSize: 14,
          color: COLORS.grey,
          textAlign: 'left',
          left: 10,
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          return selectedItem;
        }}
        rowTextForSelection={(item, index) => {
          return item;
        }}
      />
      <TouchableOpacity
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: COLORS.primary,
          height: 50,
          position: 'absolute',
          bottom: 10,
          borderRadius: 15,
          width: '90%',
          alignSelf: 'center',
        }}
        onPress={() => addBenefit()}
      >
        <Text style={{ fontSize: 15, color: 'white', fontWeight: '700' }}>
          Cập nhật tiện ích
        </Text>
      </TouchableOpacity>
    </View>
  );
}
