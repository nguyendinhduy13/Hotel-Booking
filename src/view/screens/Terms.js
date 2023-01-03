import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, View } from 'react-native';
import CustomHeader from '../components/CustomHeader';
const Terms = () => {
  const { t } = useTranslation();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}
    >
      <CustomHeader title={t('terms-and-conditions')} />
      <View style={{ padding: 10 }}>
        <Image
          source={require('../../assets/pngegg.png')}
          style={{
            width: '100%',
            height: '100%',
            alignSelf: 'center',
            backgroundColor: 'white',
            resizeMode: 'contain',
          }}
        />
      </View>
    </View>
  );
};

export default Terms;

const styles = StyleSheet.create({});
