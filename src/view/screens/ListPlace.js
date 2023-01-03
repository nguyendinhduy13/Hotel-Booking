import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/EvilIcons';
import Icon1 from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
const { width, height } = Dimensions.get('window');

const ListPlace = ({ navigation }) => {
  const { dataProvince } = useSelector((state) => state.Globalreducer);
  const [codeSelected, setCodeSelected] = useState(0);
  const { t } = useTranslation();
  const { colors } = useTheme();
  return (
    <View style={{ backgroundColor: colors.bg, flex: 1 }}>
      <View style={{ padding: 15 }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            height: 50,
            justifyContent: 'space-between',
          }}
        >
          <Icon
            onPress={() => {
              navigation.goBack();
            }}
            name="close"
            size={30}
            color={colors.text}
          />
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: colors.text,
            }}
          >
            {t('please-choice-place')}
          </Text>
          <Icon name="close" size={0} color="black" />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            height: 50,
            borderBottomWidth: 0.5,
            borderBottomColor: 'gray',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Icon1 name="md-location-sharp" size={25} color="orange" />
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: colors.text,
                marginLeft: 10,
              }}
            >
              Tp. Hồ Chí Minh
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('PlaceHotel', {
                name: 'Hồ Chí Minh',
                data: [],
              });
            }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: colors.special,
              borderRadius: 10,
              padding: 4,
            }}
          >
            <Text style={{ paddingHorizontal: 5, color: colors.text }}>
              {t('near-you')}
            </Text>
            <Icon2
              name="target"
              size={20}
              color={colors.icon}
              style={{
                marginLeft: 2,
              }}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: width,
            height: height - 100,
          }}
        >
          <View
            style={{
              width: width * 0.35,
              height: '100%',
              borderRightWidth: 0.5,
              borderRightColor: 'gray',
            }}
          >
            <ScrollView showsVerticalScrollIndicator={false}>
              {dataProvince.map((item, index) => {
                return (
                  <Pressable
                    key={index}
                    onPress={() => {
                      setCodeSelected(index);
                      console.log(index);
                    }}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '100%',
                      height: 50,
                      borderBottomWidth: 0.5,
                      borderBottomColor: 'gray',
                    }}
                  >
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 16,
                          color:
                            index === codeSelected ? 'orange' : colors.text,
                          marginLeft: 10,
                          width: width * 0.3,
                        }}
                      >
                        {item.name}
                      </Text>
                    </View>
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>
          <View
            style={{
              width: width * 0.65,
              height: '100%',
            }}
          >
            <ScrollView showsVerticalScrollIndicator={false}>
              {dataProvince[codeSelected].districts.map((item, index) => {
                return (
                  <View key={index}>
                    {item.data.length > 0 ? (
                      <Pressable
                        onPress={() => {
                          navigation.navigate('PlaceHotel', {
                            name: item.name,
                            data: item.data,
                          });
                        }}
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          width: '100%',
                          height: 50,
                          borderBottomWidth: 0.5,
                          borderBottomColor: 'gray',
                        }}
                      >
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 16,
                              color: colors.text,
                              marginLeft: 10,
                              width: width * 0.6,
                            }}
                          >
                            {' ' + item.name}
                            <Text style={{ color: 'orange' }}>
                              {` (` + item.data.length + `)`}
                            </Text>
                          </Text>
                        </View>
                        <Icon
                          name="chevron-right"
                          size={20}
                          color="gray"
                          style={{
                            marginRight: 10,
                          }}
                        />
                      </Pressable>
                    ) : (
                      <>
                        {index === 0 ? (
                          //return view no have hotel available in this province
                          <View
                            style={{
                              width: '100%',
                              height: 50,
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 16,
                                color: colors.text,
                              }}
                            >
                              {t('no-have-hotel-available')}
                            </Text>
                          </View>
                        ) : null}
                      </>
                    )}
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ListPlace;

const styles = StyleSheet.create({});
