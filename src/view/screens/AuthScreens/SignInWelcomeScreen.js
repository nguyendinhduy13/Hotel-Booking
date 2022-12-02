import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import COLORS from '../../../consts/colors';
import { useTranslation } from 'react-i18next';
const SignInWelcomeScreen = ({ navigation }) => {
  const { t } = useTranslation();
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
          <TouchableOpacity onPress={() => navigation.navigate('SignInScreen')}>
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
