import Auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import COLORS from '../../consts/colors';
import CustomHeader from '../components/CustomHeader';
const EditUserBooking = ({ navigation }) => {
  const { t } = useTranslation();
  const userinfo = Auth().currentUser;
  const adduserbooking = () => {
    const a = {
      name: name,
      phone: phone,
      birthday: birthday,
      email: email,
    };
    firestore().collection('UserBooking').doc(userinfo.uid).set(a);
    navigation.goBack();
  };
  useEffect(() => {
    firestore()
      .collection('UserBooking')
      .doc(userinfo.uid)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          setName(documentSnapshot.data().name);
          setPhone(documentSnapshot.data().phone);
          setBirthday(documentSnapshot.data().birthday);
          setEmail(documentSnapshot.data().email);
        }
      });
  }, []);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [birthday, setBirthday] = useState('');
  const [email, setEmail] = useState('');
  return (
    <View style={{ backgroundColor: 'white' }}>
      <CustomHeader title={'information-user-booking'} />
      <TextInput
        placeholder={t('name')}
        style={{
          borderWidth: 1,
          borderRadius: 10,
          borderColor: 'gray',
          width: 350,
          height: 55,
          alignSelf: 'center',
          borderColor: '#d0d0d0',
          marginTop: 30,
          paddingLeft: 10,
          backgroundColor: 'white',
        }}
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        placeholder={t('phone')}
        style={{
          borderWidth: 1,
          borderRadius: 10,
          borderColor: 'gray',
          width: 350,
          height: 55,
          alignSelf: 'center',
          paddingLeft: 10,
          borderColor: '#d0d0d0',
          backgroundColor: 'white',
          marginVertical: 30,
        }}
        value={phone}
        onChangeText={(text) => setPhone(text)}
      />
      <TextInput
        placeholder={t('age')}
        style={{
          borderWidth: 1,
          borderRadius: 10,
          borderColor: 'gray',
          width: 350,
          paddingLeft: 10,
          height: 55,
          alignSelf: 'center',
          borderColor: '#d0d0d0',
          backgroundColor: 'white',
        }}
        value={birthday}
        onChangeText={(text) => setBirthday(text)}
      />
      <TextInput
        placeholder={t('email')}
        style={{
          borderWidth: 1,
          borderRadius: 10,
          borderColor: 'gray',
          width: 350,
          height: 55,
          paddingLeft: 10,
          alignSelf: 'center',
          borderColor: '#d0d0d0',
          backgroundColor: 'white',
          marginTop: 30,
        }}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TouchableOpacity
        style={{
          backgroundColor: COLORS.primary,
          height: 45,
          width: 350,
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 20,
          marginTop: 20,
        }}
        onPress={() => {
          adduserbooking();
        }}
      >
        <Text
          style={{
            fontSize: 15,
            fontWeight: 'bold',
            color: COLORS.white,
          }}
        >
          {t('save')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditUserBooking;
