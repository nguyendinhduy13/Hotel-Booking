import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dimensions,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import Globalreducer from '../../redux/Globalreducer';
import CustomHeader from '../components/CustomHeader';
const { width, height } = Dimensions.get('screen');
const InfoProfile = ({ navigation }) => {
  const { nameUser } = useSelector((state) => state.Globalreducer);
  const dispatch = useDispatch();
  const [name, setName] = useState(nameUser.name);
  const [email, setEmail] = useState(nameUser.email);
  const [phone, setPhone] = useState(nameUser.phone);

  const isChange = () => {
    if (
      name !== nameUser.name ||
      email !== nameUser.email ||
      phone !== nameUser.phone
    ) {
      return true;
    }
    return false;
  };

  const updateInfoUser = () => {
    //update to firebase
    const data = {
      name: name,
      email: email,
      phone: phone,
      type: 'account',
    };
    firestore()
      .collection('Users')
      .doc(auth().currentUser.uid)
      .update(data)
      .then(() => {
        console.log('User updated!');
        dispatch(Globalreducer.actions.setNameUser(data));
        ToastAndroid.show(t('update-success'), ToastAndroid.SHORT);
      });
  };
  const { t } = useTranslation();
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{}}>
        <CustomHeader title={'information-account'} />
        <Pressable
          style={{ paddingHorizontal: 20, height: height, width: '100%' }}
          onPress={() => Keyboard.dismiss()}
        >
          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
              alignItems: 'center',
              width: '100%',
              height: 60,
              borderBottomWidth: 1,
              borderBottomColor: '#d0d0d0',
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                width: '40%',
              }}
            >
              {t('user-name')}
            </Text>
            <TextInput
              style={{
                fontSize: 17,
                color: 'black',
                width: '60%',
              }}
              value={name}
              onChangeText={(text) => setName(text)}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
              alignItems: 'center',
              width: '100%',
              height: 60,
              borderBottomWidth: 1,
              borderBottomColor: '#d0d0d0',
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                width: '40%',
              }}
            >
              {t('email')}
            </Text>
            <TextInput
              style={{
                fontSize: 17,
                color: 'black',
                width: '60%',
              }}
              value={email}
              onChangeText={(text) => setEmail(text)}
              editable={false}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
              alignItems: 'center',
              width: '100%',
              height: 60,
              borderBottomWidth: 1,
              borderBottomColor: '#d0d0d0',
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                width: '40%',
              }}
            >
              {t('phone')}
            </Text>
            <TextInput
              style={{
                fontSize: 17,
                color: 'black',
                width: '60%',
              }}
              value={phone}
              onChangeText={(text) => setPhone(text)}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                alignItems: 'center',
                width: '100%',
                height: 60,
                borderBottomWidth: 1,
                borderBottomColor: '#d0d0d0',
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  width: '40%',
                }}
              >
                {t('password')}
              </Text>
              <Text style={{ fontSize: 17, color: 'black' }}>{'********'}</Text>
            </View>
            <Icon
              name="edit"
              size={25}
              style={{
                position: 'absolute',
                right: 15,
                alignSelf: 'center',
                color: 'orange',
              }}
              onPress={() => {
                navigation.navigate('Change Password');
              }}
            />
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: isChange() ? 'orange' : 'gray',
              width: '100%',
              height: 45,
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              borderRadius: 15,
              marginTop: 30,
            }}
            disabled={!isChange()}
            onPress={() => {
              updateInfoUser();
            }}
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                color: 'white',
              }}
            >
              {t('update')}
            </Text>
          </TouchableOpacity>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imgAvtInfo: {
    width: 120,
    height: 120,
    borderColor: '#d0d0d0',
    borderWidth: 1,
    borderRadius: 80,
    marginRight: 10,
  },
  wrapIconCamera: {
    alignSelf: 'center',
    backgroundColor: 'white',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 40,
    left: 33,
  },
  wrapLoading: {
    width: 120,
    height: 120,
    borderColor: '#d0d0d0',
    borderWidth: 1,
    borderRadius: 80,
    marginRight: 10,
  },
});

export default InfoProfile;
