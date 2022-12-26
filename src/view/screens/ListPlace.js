import React, { useState } from 'react';
import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import Icon1 from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';

const { width, height } = Dimensions.get('window');

const ListPlace = ({ navigation }) => {
  const { dataProvince } = useSelector((state) => state.Globalreducer);
  const [codeSelected, setCodeSelected] = useState(0);

  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
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
            color="black"
          />
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: 'black',
            }}
          >
            Vui lòng chọn khu vực
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
            <Icon1
              name="md-location-sharp"
              size={25}
              color="orange"
              style={{}}
            />
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: 'black',
                marginLeft: 10,
              }}
            >
              Tp. Hồ Chí Minh
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#eeeeee',
              borderRadius: 10,
              padding: 4,
            }}
          >
            <Text style={{ paddingHorizontal: 5 }}>Gần bạn</Text>
            <Icon2
              name="target"
              size={20}
              color="gray"
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
                          color: index === codeSelected ? 'orange' : 'black',
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
                              color: 'black',
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
                                color: 'black',
                              }}
                            >
                              Không có khách sạn nào
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
