import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SocialIcon } from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
import COLORS from '../../../consts/colors';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { SignInContext } from '../../../contexts/authContext';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
GoogleSignin.configure({
  webClientId:
    '769620033857-f8q7uohvdpb5hcan4tlir04iusgc27jd.apps.googleusercontent.com',
});
export default function SignInScreen({ navigation }) {
  const { dispatchSignedIn } = useContext(SignInContext);
  const { t } = useTranslation();
  async function onGoogleButtonPress() {
    try {
      // Get the users ID token
      const { idToken } = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      const user = await auth().signInWithCredential(googleCredential);
      if (user) {
        dispatchSignedIn({
          type: 'UPDATE_SIGN_IN',
          payload: { userToken: 'user' },
        });
      }
      if (user.additionalUserInfo.isNewUser) {
        firestore()
          .collection('Users')
          .doc(auth().currentUser.uid)
          .set({
            email: user.user.email,
            name: user.user.displayName,
            phone: user.user.phoneNumber,
            language: 'vi',
            theme: 'light',
          })
          .then(() => {
            console.log('User added!');
          });
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  }
  return (
    <View>
      <Icon
        onPress={() => navigation.goBack()}
        name="arrowleft"
        size={30}
        style={{ color: COLORS.dark, marginLeft: 15, marginTop: 15 }}
      />
      <View
        style={{
          alignContent: 'center',
          alignItems: 'center',
          paddingTop: '20%',
        }}
      >
        <Text style={{ fontSize: 35, fontWeight: 'bold', color: COLORS.dark }}>
          {t(`sign-in`)}
        </Text>
      </View>
      <View style={{ alignItems: 'center', paddingTop: 50 }}>
        <View>
          <SocialIcon
            title={t(`sign-in-with-facebook`)}
            button
            type="facebook"
            style={styles.SocialIcon}
          />
        </View>
        <View style={{ marginTop: 5 }}>
          <SocialIcon
            title={t(`sign-in-with-google`)}
            button
            type="google"
            style={styles.SocialIcon}
            onPress={() => {
              onGoogleButtonPress();
            }}
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 50,
        }}
      >
        <View style={{ flex: 1, height: 0.5, backgroundColor: COLORS.grey }} />
        <View>
          <Text
            style={{
              fontSize: 17,
              textAlign: 'center',
              color: COLORS.dark,
            }}
          >
            {t(`or`)}
          </Text>
        </View>
        <View style={{ flex: 1, height: 0.5, backgroundColor: COLORS.grey }} />
      </View>
      <TouchableOpacity
        style={{ alignItems: 'center', paddingTop: 55 }}
        onPress={() => navigation.navigate('SignInScreenTT')}
      >
        <View style={styles.button}>
          <Text
            style={{ fontSize: 16, fontWeight: 'bold', color: COLORS.white }}
          >
            {t(`sign-in-with-account`)}
          </Text>
        </View>
      </TouchableOpacity>
      <View>
        <View
          style={{
            paddingTop: '30%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ fontSize: 14, color: COLORS.grey }}>
            {t('dont-have-an-account')}{' '}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
            <Text
              style={{
                color: COLORS.primary,
                fontSize: 14,
                fontWeight: 'bold',
              }}
            >
              {t('sign-up')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  SocialIcon: {
    borderRadius: 12,
    height: 50,
    width: 270,
  },
  button: {
    height: 50,
    width: 270,
    marginTop: 10,
    borderRadius: 12,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
  },
});
