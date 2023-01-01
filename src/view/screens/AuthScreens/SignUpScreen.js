import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Alert,
  Image,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Icon } from 'react-native-elements';
import Icon2 from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../../../consts/colors';
export default function SignUpScreen({ navigation }) {
  const [getVisible, setVisible] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function signUp() {
    try {
      await auth().createUserWithEmailAndPassword(email, password);
      firestore()
        .collection('Users')
        .doc(auth().currentUser.uid)
        .set({
          email: email,
          name: name,
          phone: '',
          type: 'account',
        })
        .then(() => {
          console.log('User added!');
          navigation.navigate('SignInScreenTT');
        });
    } catch (error) {
      if (error.code == 'auth/email-already-in-use') {
        Alert.alert('That email address is already inuse');
      }
      if (error.code == 'auth/invalid-email') {
        Alert.alert('That email address is invalid');
      } else {
        Alert.alert(error.code);
      }
    }
  }
  const { t } = useTranslation();
  return (
    <Pressable
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}
      onPress={() => Keyboard.dismiss()}
    >
      <Icon2
        onPress={() => navigation.goBack()}
        name="arrowleft"
        size={30}
        color={COLORS.dark}
        style={{ position: 'absolute', top: 20, left: 20, zIndex: 1 }}
      />
      <View>
        <Image
          source={require('../../../assets/Logo1.png')}
          style={{
            width: 200,
            height: 200,
            alignSelf: 'center',
            marginTop: 50,
          }}
        />
      </View>
      <View style={{ paddingHorizontal: 25, paddingTop: 20 }}>
        <Text
          style={{
            fontSize: 30,
            fontWeight: 'bold',
            color: 'black',
          }}
        >
          {t('sign-up')}
        </Text>
        <View style={{ marginTop: 20 }}>
          <View>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                alignItems: 'center',
              }}
            >
              <Image
                source={require('../../../assets/name_icon.png')}
                style={{
                  width: 28,
                  height: 28,
                }}
              />
              <View
                style={{
                  flexDirection: 'row',
                  marginLeft: 10,
                  alignItems: 'center',
                  width: '90%',
                  borderBottomWidth: 1,
                  borderBottomColor: '#69b9f5',
                }}
              >
                <TextInput
                  placeholder={t('name')}
                  style={{ width: '90%' }}
                  onChangeText={(text) => setName(text)}
                  value={name}
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                alignItems: 'center',
                marginTop: 15,
              }}
            >
              <Icon1 name="email" color={COLORS.grey} size={28} />
              <TextInput
                style={{
                  height: 45,
                  borderBottomWidth: 1,
                  borderBottomColor: '#69b9f5',
                  width: '90%',
                  marginLeft: 10,
                  fontSize: 16,
                }}
                placeholder={t('email')}
                onChangeText={(text) => setEmail(text)}
                value={email}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                alignItems: 'center',
                marginTop: 15,
              }}
            >
              <Icon1 name="lock" size={28} color={COLORS.grey} />
              <View
                style={{
                  flexDirection: 'row',
                  marginLeft: 10,
                  alignItems: 'center',
                  width: '90%',
                  borderBottomWidth: 1,
                  borderBottomColor: '#69b9f5',
                }}
              >
                <TextInput
                  placeholder={t('password')}
                  style={{ width: '90%' }}
                  secureTextEntry={getVisible ? false : true}
                  onChangeText={(text) => setPassword(text)}
                  value={password}
                />
                <Icon
                  name={getVisible ? 'visibility' : 'visibility-off'}
                  iconStyle={{
                    color: COLORS.grey,
                  }}
                  type="material"
                  onPress={() => setVisible(!getVisible)}
                />
              </View>
            </View>
          </View>
          <View
            style={{
              marginTop: 20,
            }}
          >
            <Text style={{ color: COLORS.grey, marginTop: 10 }}>
              {t('by-creating-an-account')}
              <Text
                style={{
                  color: COLORS.primary,
                  fontWeight: 'bold',
                  marginTop: 5,
                  lineHeight: 20,
                }}
              >
                {' '}
                {t('terms-of-service')}{' '}
                <Text style={{ color: COLORS.grey, marginTop: 5 }}>
                  {t('and')}{' '}
                  <Text
                    style={{
                      color: COLORS.primary,
                      fontWeight: 'bold',
                      marginTop: 5,
                    }}
                  >
                    {t('privacy-policy')}
                  </Text>
                </Text>
              </Text>
            </Text>
          </View>
          <View style={{ marginTop: 35 }}>
            <TouchableOpacity
              style={{
                height: 50,
                width: '100%',
                borderRadius: 12,
                alignItems: 'center',
                alignContent: 'center',
                justifyContent: 'center',
                backgroundColor: COLORS.primary,
              }}
              onPress={() => {
                signUp();
              }}
            >
              <Text
                style={{
                  color: COLORS.white,
                  fontSize: 18,
                  fontWeight: 'bold',
                }}
              >
                {t('sign-up')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'center',
          justifyContent: 'center',
          marginTop: 20,
        }}
      >
        <Text
          style={{
            color: COLORS.grey,
            marginTop: 15,
            alignSelf: 'center',
            fontSize: 16,
          }}
        >
          {t('already-have-an-account')}
          <Text
            style={{
              color: COLORS.primary,
              fontWeight: 'bold',
              marginTop: 5,
              fontSize: 16,
            }}
            onPress={() => {
              navigation.navigate('SignInScreenTT');
            }}
          >
            {' '}
            {t('sign-in')}
          </Text>
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  textinput2: {
    borderWidth: 1,
    borderRadius: 12,
    marginHorizontal: 20,
    borderColor: '#86939e',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    paddingLeft: 15,
    marginBottom: 17,
  },
  button: {
    height: 50,
    width: '90%',
    marginTop: 10,
    borderRadius: 12,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
  },
});
