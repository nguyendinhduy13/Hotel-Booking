import Auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Keyboard,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import COLORS from '../../consts/colors';
import CustomHeader from '../components/CustomHeader';
const EditUserBooking = ({ navigation }) => {
  const { t } = useTranslation();
  const { colors } = useTheme();
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
    <Pressable
      style={{ flex: 1, backgroundColor: colors.bg }}
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <CustomHeader title={'information-user-booking'} />
      <TextInput
        placeholder={t('name')}
        placeholderTextColor={colors.icon}
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
          backgroundColor: colors.box,
        }}
        value={name}
        onChangeText={(text) => setName(text)}
        color={colors.text}
      />
      <TextInput
        placeholder={t('phone')}
        placeholderTextColor={colors.icon}
        style={{
          borderWidth: 1,
          borderRadius: 10,
          borderColor: 'gray',
          width: 350,
          height: 55,
          alignSelf: 'center',
          paddingLeft: 10,
          borderColor: '#d0d0d0',
          backgroundColor: colors.box,
          marginVertical: 30,
        }}
        value={phone}
        onChangeText={(text) => {
          const text1 = text.replace(/\s/g, '');
          if (isNaN(text1)) {
            return;
          }
          setPhone(text1);
        }}
        color={colors.text}
        keyboardType="numeric"
      />
      <TextInput
        placeholder={t('age')}
        placeholderTextColor={colors.icon}
        style={{
          borderWidth: 1,
          borderRadius: 10,
          borderColor: 'gray',
          width: 350,
          paddingLeft: 10,
          height: 55,
          alignSelf: 'center',
          borderColor: '#d0d0d0',
          backgroundColor: colors.box,
        }}
        value={birthday}
        onChangeText={(text) => {
          //remove space and check if it is number
          const text1 = text.replace(/\s/g, '');
          if (isNaN(text1)) {
            return;
          }
          setBirthday(text1);
        }}
        color={colors.text}
        keyboardType="numeric"
      />
      <TextInput
        placeholder={t('email')}
        placeholderTextColor={colors.icon}
        style={{
          borderWidth: 1,
          borderRadius: 10,
          borderColor: 'gray',
          width: 350,
          height: 55,
          paddingLeft: 10,
          alignSelf: 'center',
          borderColor: '#d0d0d0',
          backgroundColor: colors.box,
          marginTop: 30,
        }}
        value={email}
        onChangeText={(text) => setEmail(text)}
        color={colors.text}
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
    </Pressable>
  );
};

export default EditUserBooking;
