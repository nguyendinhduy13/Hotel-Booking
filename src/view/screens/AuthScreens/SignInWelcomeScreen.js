import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ImageBackground,
  PermissionsAndroid,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch } from 'react-redux';
import COLORS from '../../../consts/colors';
import { setAsyncStorage } from '../../../functions/asyncStorageFunctions';
import Globalreducer from '../../../redux/Globalreducer';
const SignInWelcomeScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const handleStart = () => {
    setAsyncStorage('isShow', 'false');
    dispatch(Globalreducer.actions.setisShowStartScreen('false'));
    navigation.navigate('SignInScreenTT');
  };
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
    requestLocation();
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <StatusBar translucent backgroundColor="rgba(0,0,0,0)" />
      <ImageBackground
        style={{ flex: 1 }}
        source={require('../../../assets/onboardImage.jpg')}
      >
        <View style={styles.details}>
          <Text
            style={{ color: COLORS.white, fontSize: 30, fontWeight: 'bold' }}
          >
            {t('discover')}
          </Text>
          <Text
            style={{ color: COLORS.white, fontSize: 30, fontWeight: 'bold' }}
          >
            {t('world-with-our-app')}
          </Text>
          <Text
            style={{
              color: COLORS.white,
              fontWeight: 'bold',
              lineHeight: 25,
              marginTop: 15,
            }}
          >
            {t('first-description')}
          </Text>
          <TouchableOpacity onPress={() => handleStart()}>
            <View style={styles.button}>
              <Text
                style={{ fontWeight: 'bold', fontSize: 15, color: COLORS.dark }}
              >
                {t('get-started')}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default SignInWelcomeScreen;

const styles = StyleSheet.create({
  details: {
    height: '50%',
    bottom: 0,
    position: 'absolute',
    paddingHorizontal: 40,
  },
  button: {
    height: 45,
    width: 120,
    backgroundColor: COLORS.white,
    marginTop: 20,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
