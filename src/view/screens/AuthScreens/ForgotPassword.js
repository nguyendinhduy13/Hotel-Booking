import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import Icon2 from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../../../consts/colors';
const ForgotPassword = ({ navigation }) => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  let dataUser = [];
  let type = '';
  const checkemail = () => {
    type = '';
    let check = false;
    dataUser.forEach((item) => {
      if (item.email === email) {
        check = true;
        type = item.type;
      }
    });
    return check;
  };

  const handleForgotPassword = async () => {
    dataUser = [];
    await firestore()
      .collection('Users')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((documentSnapshot) => {
          dataUser.push(documentSnapshot.data());
        });
      });
    if (checkemail()) {
      if (type === 'google') {
        ToastAndroid.show(
          t('we-can-not-change-password-of-google-account'),
          ToastAndroid.SHORT,
        );
      } else {
        firebase
          .auth()
          .sendPasswordResetEmail(email)
          .then(function () {
            ToastAndroid.show(
              t(
                'have-sent-email-change-password-to-you-please-check-your-email',
              ),
              ToastAndroid.SHORT,
            );
            navigation.goBack();
          })
          .catch(function (error) {
            ToastAndroid.show(error.message, ToastAndroid.SHORT);
          });
      }
    } else {
      ToastAndroid.show(t('email-not-found'), ToastAndroid.SHORT);
    }
  };

  return (
    <Pressable
      style={{
        flex: 1,
        backgroundColor: colors.bg,
        padding: 20,
      }}
      onPress={() => Keyboard.dismiss()}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Icon2
          onPress={() => navigation.goBack()}
          name="arrowleft"
          size={30}
          color={colors.text}
          style={{}}
        />
        <Text
          style={{
            color: colors.text,
            fontSize: 20,
            fontWeight: 'bold',
            marginLeft: 20,
          }}
        >
          {t('forgot-password1')}
        </Text>
      </View>
      <View style={{ marginTop: 20 }}>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            alignItems: 'center',
          }}
        >
          <Icon1 name="email" color={'gray'} size={28} />
          <TextInput
            style={{
              height: 45,
              borderBottomWidth: 1,
              borderBottomColor: '#69b9f5',
              width: '90%',
              marginLeft: 10,
              fontSize: 16,
              color: colors.text,
            }}
            placeholder={t('input-your-email')}
            placeholderTextColor={colors.icon}
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
        </View>
      </View>
      <TouchableOpacity
        style={{
          width: '100%',
          height: 45,
          backgroundColor: COLORS.primary,
          borderRadius: 15,
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
          marginTop: 20,
        }}
        onPress={() => {
          handleForgotPassword();
        }}
      >
        <Text
          style={{
            fontSize: 15,
            fontWeight: 'bold',
            color: COLORS.white,
          }}
        >
          {t('change-password')}
        </Text>
      </TouchableOpacity>
    </Pressable>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({});
