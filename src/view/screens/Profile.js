import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import React, { useContext, useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Switch } from 'react-native-elements';
import Icon5 from 'react-native-vector-icons/AntDesign';
import Icon3 from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import { SignInContext } from '../../contexts/authContext';

import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { setAsyncStorage } from '../../functions/asyncStorageFunctions';
import '../../i18n/18n';
import Globalreducer from '../../redux/Globalreducer';
export default function Profile({ navigation }) {
  const { t, i18n } = useTranslation();
  const { colors } = useTheme();
  const { dispatchSignedIn } = useContext(SignInContext);
  const { nameUser, theme } = useSelector((state) => state.Globalreducer);
  const dispatch = useDispatch();
  async function signOut() {
    try {
      auth()
        .signOut()
        .then(() => {
          GoogleSignin.revokeAccess();
          GoogleSignin.signOut();
          dispatch(Globalreducer.actions.setEmailHasSignIn('none'));
          dispatchSignedIn({
            type: 'UPDATE_SIGN_IN',
            payload: { userToken: null, _id: '' },
          });
        });
      setAsyncStorage('userToken', '');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  }
  const [isEnabled, setIsEnabled] = useState(theme === 'dark' ? true : false);
  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    if (isEnabled) {
      dispatch(Globalreducer.actions.setTheme('light'));
      setAsyncStorage('theme', 'light');
    } else {
      dispatch(Globalreducer.actions.setTheme('dark'));
      setAsyncStorage('theme', 'dark');
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <View
        style={{
          backgroundColor: colors.bg,
          elevation: 15,
          shadowColor: colors.text,
          shadowOffset: {
            width: 0,
            height: 12,
          },
          shadowOpacity: 0.58,
        }}
      >
        <View style={styles.heaerProfile}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginRight: 20,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text
                style={{ fontSize: 27, fontWeight: 'bold', color: colors.text }}
              >
                {nameUser.name}
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('InfoProfile')}
              >
                <Icon2
                  name="edit-3"
                  size={25}
                  color="red"
                  style={{ marginLeft: 5 }}
                />
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {isEnabled ? (
                <Icon3
                  name="moon"
                  size={25}
                  color="#f5dd4b"
                  style={{ marginRight: 5 }}
                />
              ) : (
                <Icon3
                  name="light-up"
                  size={25}
                  color="#f5dd4b"
                  style={{ marginRight: 5 }}
                />
              )}
              <Switch
                trackColor={{ false: '#81b0ff', true: '#767577' }}
                thumbColor={isEnabled ? '#f4f3f4' : '#f5dd4b'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>
          </View>
          <Text
            style={{
              color: colors.text,
              fontSize: nameUser.phone ? 15 : 0,
              paddingTop: nameUser.phone ? 5 : 0,
            }}
          >
            {nameUser.phone}
          </Text>
          <Text style={{ color: colors.text, fontSize: 15, paddingTop: 5 }}>
            {nameUser.email}
          </Text>
        </View>
      </View>
      <ScrollView style={{ backgroundColor: colors.bg, marginVertical: 10 }}>
        <View style={styles.bodyProfile}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: colors.text,
              marginTop: 10,
            }}
          >
            {t('my-booking')}
          </Text>
          <TouchableOpacity
            style={styles.view}
            onPress={() => {
              navigation.navigate('Booking');
            }}
          >
            <Icon3 name="back-in-time" size={25} color={colors.icon} />
            <Text
              style={{
                fontSize: 16,
                paddingHorizontal: 15,
                color: colors.text,
              }}
            >
              {t('my-booking-history')}
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: colors.text,
              marginTop: 10,
            }}
          >
            {t('setting')}
          </Text>
          <TouchableOpacity
            style={[styles.view, { justifyContent: 'space-between' }]}
            onPress={() => navigation.navigate('ChangeLanguage')}
          >
            <View style={{ flexDirection: 'row' }}>
              <Icon1 name="language" size={25} color={colors.icon} />
              <Text
                style={{
                  fontSize: 16,
                  paddingHorizontal: 15,
                  color: colors.text,
                }}
              >
                {t('language')}
              </Text>
            </View>
            <Icon3
              name="chevron-right"
              size={25}
              style={{
                color: 'orange',
                width: 30,
                textAlign: 'right',
              }}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: colors.text,
              marginTop: 10,
            }}
          >
            {t('information')}
          </Text>
          <TouchableOpacity
            style={styles.view}
            onPress={() => {
              navigation.navigate('Terms');
            }}
          >
            <Icon
              name="shield-checkmark-outline"
              size={25}
              color={colors.icon}
            />
            <Text
              style={{
                fontSize: 16,
                paddingHorizontal: 15,
                color: colors.text,
              }}
            >
              {t('terms-and-conditions')}
            </Text>
          </TouchableOpacity>
          <View style={[styles.view, { justifyContent: 'space-between' }]}>
            <View style={{ flexDirection: 'row' }}>
              <Icon1 name="phonelink-setup" size={25} color={colors.icon} />
              <Text
                style={{
                  fontSize: 16,
                  paddingHorizontal: 15,
                  color: colors.text,
                }}
              >
                {t('version')}
              </Text>
            </View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                textAlign: 'right',
                color: 'orange',
              }}
            >
              14.3.1
            </Text>
          </View>
          <TouchableOpacity
            style={styles.view}
            onPress={() => {
              navigation.navigate('About');
            }}
          >
            <Icon1 name="info-outline" size={25} color={colors.icon} />
            <Text
              style={{
                fontSize: 16,
                paddingHorizontal: 15,
                color: colors.text,
              }}
            >
              {t('contact-us')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.view}
            onPress={() => {
              signOut();
            }}
          >
            <Icon5 name="logout" size={25} color={colors.icon} />
            <Text
              style={{
                fontSize: 16,
                paddingHorizontal: 15,
                color: colors.text,
              }}
            >
              {t('logout')}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 17,
    fontWeight: '600',
    marginTop: 5,
    marginHorizontal: 15,
  },
  heaerProfile: {
    width: '100%',
    paddingBottom: 15,
    marginHorizontal: 20,
    marginTop: 10,
  },
  bodyProfile: {
    marginHorizontal: 20,
  },
  tittle: {},
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#d9cccc',
    paddingTop: 15,
    paddingBottom: 15,
  },
});
