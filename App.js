import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import React, { useEffect, useState } from 'react';
import { LogBox, PermissionsAndroid, StatusBar, View } from 'react-native';
import 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import COLORS from './src/consts/colors';
import { SignInContextProvider } from './src/contexts/authContext';
import {
  getAsyncStorage,
  setAsyncStorage,
} from './src/functions/asyncStorageFunctions';
import i18n from './src/i18n/18n';
import Globalreducer from './src/redux/Globalreducer';
import RootNavigation from './src/view/navigation/RootNavigation';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications
console.disableYellowBox = true;
export default function App() {
  const dispatch = useDispatch();
  const requestLocation = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message:
            'Hotel Booking App needs access to your location ' +
            'so you can see your current location.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
    } catch (err) {
      console.warn(err);
    }
  };
  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('User account already exists:', user.email);
        dispatch(Globalreducer.actions.setEmailHasSignIn(user.email));
        firestore()
          .collection('Users')
          .doc(user.uid)
          .get()
          .then((documentSnapshot) => {
            if (documentSnapshot.exists) {
              dispatch(
                Globalreducer.actions.setNameUser(documentSnapshot.data().name),
              );
            }
          });
      } else {
        console.log('User account does not exist');
        dispatch(Globalreducer.actions.setEmailHasSignIn('none'));
      }
    });
  }, []);

  const [wait, setWait] = useState(true);
  getAsyncStorage('isShow').then((value) => {
    if (value) {
      dispatch(Globalreducer.actions.setisShowStartScreen(value));
      console.log('isShowStartScreen: ' + value);
    }
    setWait(false);
  });

  useEffect(() => {
    getAsyncStorage('language').then((lang) => {
      console.log('languauge: ' + lang);
      if (lang) {
        i18n.changeLanguage(lang);
      } else {
        console.log('no language');
        i18n.changeLanguage('en');
        setAsyncStorage('language', 'en');
      }
    });
  }, []);
  useEffect(() => {
    requestLocation();
  }, []);

  return (
    <SignInContextProvider>
      {wait === false ? (
        <>
          <View style={{ flex: 1 }}>
            <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
            <RootNavigation />
          </View>
        </>
      ) : (
        <></>
      )}
    </SignInContextProvider>
  );
}
