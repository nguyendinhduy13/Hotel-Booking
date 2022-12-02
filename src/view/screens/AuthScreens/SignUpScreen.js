import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SocialIcon, Icon } from 'react-native-elements';
import Icon2 from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/FontAwesome';
import COLORS from '../../../consts/colors';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useTranslation } from 'react-i18next';
export default function SignUpScreen({ navigation }) {
  const [getVisible, setVisible] = useState(false);
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
          name: 'User' + auth().currentUser.uid,
          phone: '',
          language: 'vi',
          theme: 'light',
        })
        .then(() => {
          console.log('User added!');
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
    <View>
      <Icon2
        onPress={() => navigation.goBack()}
        name="arrowleft"
        size={30}
        style={{ color: COLORS.dark, marginLeft: 15, marginTop: 15 }}
      />
      <View style={{ alignItems: 'center', paddingTop: '15%' }}>
        <Text style={{ fontSize: 30, fontWeight: 'bold', color: COLORS.dark }}>
          {t('create-your-account')}
        </Text>
      </View>
      <View>
        <View style={{ paddingTop: '15%' }}>
          <View style={styles.textinput2}>
            <Icon1 name="email" color={COLORS.grey} size={20} />
            <TextInput
              placeholder={t('email')}
              style={{ width: '90%' }}
              onChangeText={(text) => setEmail(text)}
              value={email}
            />
          </View>
          <View style={[styles.textinput2, { marginTop: 10 }]}>
            <Icon3 name="lock" size={20} color={COLORS.grey} />
            <TextInput
              placeholder={t('password')}
              style={{ width: '76%' }}
              secureTextEntry={getVisible ? false : true}
              onChangeText={(text) => setPassword(text)}
              value={password}
            />
            <Icon
              name={getVisible ? 'visibility' : 'visibility-off'}
              iconStyle={{ color: COLORS.grey, marginRight: 10 }}
              type="material"
              onPress={() => setVisible(!getVisible)}
            />
          </View>
          <View style={[styles.textinput2, { marginTop: 10 }]}>
            <Icon3 name="lock" size={20} color={COLORS.grey} />
            <TextInput
              placeholder={t('repeat-password')}
              style={{ width: '76%' }}
              secureTextEntry={getVisible ? false : true}
            />
            <Icon
              name={getVisible ? 'visibility' : 'visibility-off'}
              iconStyle={{ color: COLORS.grey, marginRight: 10 }}
              type="material"
              onPress={() => setVisible(!getVisible)}
            />
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={{ alignItems: 'center', paddingTop: 10 }}
        onPress={() => {
          signUp(), navigation.navigate('SignInScreenTT');
        }}
      >
        <View style={styles.button}>
          <Text
            style={{ fontSize: 16, fontWeight: 'bold', color: COLORS.white }}
          >
            {t('sign-up')}
          </Text>
        </View>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingTop: '10%',
        }}
      >
        <View style={{ flex: 1, height: 0.5, backgroundColor: COLORS.grey }} />
        <View>
          <Text
            style={{
              width: 130,
              fontSize: 17,
              color: COLORS.dark,
              textAlign: 'center',
            }}
          >
            {t('or-continue-with')}
          </Text>
        </View>
        <View style={{ flex: 1, height: 0.5, backgroundColor: COLORS.grey }} />
      </View>
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            paddingTop: '7%',
          }}
        >
          <SocialIcon button type="google" style={{ width: 100 }} />
          <SocialIcon button type="facebook" style={{ width: 100 }} />
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          paddingTop: '4%',
        }}
      >
        <Text style={{ fontSize: 14 }}>{t('already-have-an-account')} </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignInScreenTT')}>
          <Text
            style={{ fontSize: 14, fontWeight: 'bold', color: COLORS.primary }}
          >
            {t('sign-in')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
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
