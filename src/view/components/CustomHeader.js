import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import '../../i18n/18n';
const windowWidth = Dimensions.get('window').width;
const CustomHeader = ({ title }) => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  return (
    <View style={styles.header}>
      <Icon
        name="arrow-back-ios"
        size={25}
        color={'black'}
        onPress={() => navigation.goBack()}
      />
      <Text style={[styles.headerText, { color: 'black' }]}>{t(title)}</Text>
      <Icon name="arrow-back-ios" size={0} color={'black'} />
    </View>
  );
};
export default CustomHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    elevation: 5,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 26,
    textAlign: 'center',
  },
});
