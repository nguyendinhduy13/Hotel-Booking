import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import FontAwe5 from 'react-native-vector-icons/FontAwesome5';
const windowWidth = Dimensions.get('window').width;

const CustomHeader = ({ title }) => {
  const navigation = useNavigation();
  return (
    <View style={[styles.header]}>
      <View
        style={[
          styles.bgicon,
          {
            borderColor: 'black',
            backgroundColor: 'white',
          },
        ]}
      >
        <FontAwe5
          name="chevron-left"
          size={25}
          color={'black'}
          onPress={() => navigation.goBack()}
        />
      </View>
      <Text style={[styles.headerText, { color: 'black' }]}>{title}</Text>
    </View>
  );
};
export default CustomHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    marginHorizontal: 20,
    alignItems: 'center',
    marginTop: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 26,
    width: windowWidth - 115,
    textAlign: 'center',
  },
  bgicon: {
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    height: 35,
    width: 35,
  },
});
