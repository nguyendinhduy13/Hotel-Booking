import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Modal } from 'react-native';
import COLORS from '../../consts/colors';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Fontisto';
import { ScrollView } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Auth from "@react-native-firebase/auth"
export default function Booking() {
    const [button, setbutton] = useState(1);
    const [modalVisible, setModalVisible] = useState(false);
    const [data, setdata] = useState([]);
    const user=Auth().currentUser;
    const navigation = useNavigation();
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
        firestore()
        .collection('Booking')
        .doc(user.uid)
        .get()
        .then(documentSnapshot => {
            const data = documentSnapshot.data();
            setdata(data.data);
        });
    });
    return () => {
        unsubscribe;
    };
    },[navigation])

    const CardBooking = ({ item, index }) => {
        return (
            <View
                key={index}
                style={{
                    marginTop: 20,
                    elevation: 10,
                    borderRadius: 20,
                    backgroundColor: COLORS.white,
                    width: 350,
                    alignSelf: 'center',
                    height: 165,
                }}>
                <View
                    style={{
                        flexDirection: 'row',
                    }}>
                    <Image
                        source={{ uri: item.image }}
                        style={{ width: 100, height: 100, borderRadius: 20 }}
                    />
                    <View style={{ marginLeft: 15 }}>
                        <View
                            style={{
                                justifyContent: 'space-between',
                                height: 85,
                            }}>
                            <View>
                                <Text
                                    style={{
                                        fontSize: 20,
                                        color: COLORS.dark,
                                        fontWeight: '600',
                                    }}>
                                    {item.name}
                                </Text>
                                <Text
                                    style={{
                                        width: 230,
                                        fontWeight: '400',
                                        color: COLORS.dark,
                                        fontSize: 15,
                                    }}>
                                    {item.roomname}
                                </Text>
                            </View>
                            <Text style={{ fontSize: 18, fontWeight: '700' }}>
                                {item.total} VNĐ
                            </Text>
                        </View>
                    </View>
                </View>
                <View
                    style={{
                        borderWidth: 0.2,
                        height: 0,
                        width: 350,
                        borderColor: COLORS.grey,
                        marginTop: 8,
                    }}
                />
                {item.status === 'ongoing' && button === 1 ? (
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginHorizontal: 10,
                            marginTop: 10,
                        }}>
                        <TouchableOpacity
                            style={{
                                borderWidth: 2,
                                borderColor: COLORS.primary,
                                borderRadius: 20,
                                width: 150,
                                height: 37,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                            onPress={() => {
                                setModalVisible(true);
                            }}>
                            <Text
                                style={{
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                    color: COLORS.primary,
                                }}>
                                Hủy đặt phòng
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                backgroundColor: COLORS.primary,
                                borderRadius: 15,
                                width: 150,
                                height: 37,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <Text
                                style={{
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                    color: COLORS.white,
                                }}>
                                Xem thông tin
                            </Text>
                        </TouchableOpacity>
                    </View>
                ) : null}
            </View>
        );
    };
    return (
        <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
            <View
                style={{
                    flexDirection: 'row',
                    paddingTop: '4%',
                    justifyContent: 'space-between',
                }}>
                <View style={{ flexDirection: 'row' }}>
                    <Image
                        source={require('../../assets/logo.png')}
                        style={{
                            width: 40,
                            height: 40,
                            borderRadius: 20,
                            marginLeft: 10,
                        }}
                    />
                    <Text
                        style={{
                            fontSize: 22,
                            fontWeight: 'bold',
                            color: COLORS.dark,
                            paddingTop: 2,
                            marginLeft: 15,
                        }}>
                        My Booking
                    </Text>
                </View>
                <Icon
                    name="search"
                    size={22}
                    color={COLORS.dark}
                    style={{ right: 20 }}
                />
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: 320,
                    alignSelf: 'center',
                    marginTop: 20,
                }}>
                <TouchableOpacity
                    style={
                        button === 1
                            ? {
                                  backgroundColor: COLORS.primary,
                                  borderRadius: 20,
                                  width: 95,
                                  height: 37,
                                  justifyContent: 'center',
                                  alignItems: 'center',
                              }
                            : {
                                  borderWidth: 2,
                                  borderColor: COLORS.primary,
                                  borderRadius: 20,
                                  width: 95,
                                  height: 37,
                                  justifyContent: 'center',
                                  alignItems: 'center',
                              }
                    }
                    onPress={() => setbutton(1)}>
                    <Text
                        style={
                            button === 1
                                ? {
                                      fontSize: 16,
                                      fontWeight: 'bold',
                                      color: COLORS.white,
                                  }
                                : {
                                      fontSize: 16,
                                      fontWeight: 'bold',
                                      color: COLORS.primary,
                                  }
                        }>
                        Ongoing
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={
                        button === 2
                            ? {
                                  backgroundColor: COLORS.primary,
                                  borderRadius: 20,
                                  width: 95,
                                  height: 37,
                                  justifyContent: 'center',
                                  alignItems: 'center',
                              }
                            : {
                                  borderWidth: 2,
                                  borderColor: COLORS.primary,
                                  borderRadius: 20,
                                  width: 95,
                                  height: 37,
                                  justifyContent: 'center',
                                  alignItems: 'center',
                              }
                    }
                    onPress={() => setbutton(2)}>
                    <Text
                        style={
                            button === 2
                                ? {
                                      fontSize: 16,
                                      fontWeight: 'bold',
                                      color: COLORS.white,
                                  }
                                : {
                                      fontSize: 16,
                                      fontWeight: 'bold',
                                      color: COLORS.primary,
                                  }
                        }>
                        Completed
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={
                        button === 3
                            ? {
                                  backgroundColor: COLORS.primary,
                                  borderRadius: 20,
                                  width: 95,
                                  height: 37,
                                  justifyContent: 'center',
                                  alignItems: 'center',
                              }
                            : {
                                  borderWidth: 2,
                                  borderColor: COLORS.primary,
                                  borderRadius: 20,
                                  width: 95,
                                  height: 37,
                                  justifyContent: 'center',
                                  alignItems: 'center',
                              }
                    }
                    onPress={() => setbutton(3)}>
                    <Text
                        style={
                            button === 3
                                ? {
                                      fontSize: 16,
                                      fontWeight: 'bold',
                                      color: COLORS.white,
                                  }
                                : {
                                      fontSize: 16,
                                      fontWeight: 'bold',
                                      color: COLORS.primary,
                                  }
                        }>
                        Canceled
                    </Text>
                </TouchableOpacity>
            </View>

            {data.map((item, index) =>
                item.hotelinfo.status === 'ongoing' && button === 1 ? (
                    <View key={index}>
                        <CardBooking item={item.hotelinfo} index={index} />
                    </View>
                ) : item.hotelinfo.status === 'completed' && button === 2 ? (
                    <View key={index}>
                        <CardBooking item={item.hotelinfo} index={index} />
                    </View>
                ) : item.hotelinfo.status === 'cancelled' && button === 3 ? (
                    <View key={index}>
                        <CardBooking item={item.hotelinfo} index={index} />
                    </View>
                ) : null,
            )}
        </ScrollView>
    );
}
