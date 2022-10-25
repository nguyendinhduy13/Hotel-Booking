import React, { useState,useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import Auth from '@react-native-firebase/auth';
import CheckBox from '@react-native-community/checkbox';
import COLORS from '../../consts/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';

const DetailInfoBooking = ({ navigation }) => {
    const user=Auth().currentUser;
    const [toggleCheckBox, setToggleCheckBox] = useState(false);

    return (
        <ScrollView>
            <View style={{ flex: 1 }}>
                <Text
                    style={{
                        fontSize: 15,
                        marginTop: 10,
                        color: COLORS.dark,
                        left: 10,
                    }}>
                    Thông tin
                </Text>
                <View
                    style={{
                        backgroundColor: COLORS.white,
                        width: '100%',
                        marginTop: 10,
                    }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}>
                        <View
                            style={{
                                marginTop: 4,
                                flexDirection: 'row',
                                left: 10,
                            }}>
                            <CheckBox
                                disabled={false}
                                value={toggleCheckBox}
                                onValueChange={newValue =>
                                    setToggleCheckBox(newValue)
                                }
                            />
                            <View
                                style={{
                                    flexDirection: 'row',
                                    marginTop: 4,
                                    left: 4,
                                }}>
                                <Text
                                    style={{
                                        color: COLORS.dark,
                                        fontWeight: '600',
                                        fontSize: 16,
                                    }}>
                                    {user.displayName?user.displayName:""}{'  '}
                                </Text>
                                <View
                                    style={{
                                        borderWidth: 0.5,
                                        borderColor: COLORS.grey,
                                        height: 20,
                                    }}
                                />
                                <Text
                                    style={{
                                        fontSize: 16,
                                        fontWeight: '500',
                                    }}>
                                    {'  '}048394347347
                                </Text>
                            </View>
                        </View>
                        <TouchableOpacity style={{ marginTop: 6, right: 8 }}>
                            <Text
                                style={{ fontSize: 17, color: COLORS.primary }}>
                                Sửa
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={{ marginHorizontal: 46, fontWeight: '500' }}>
                        dia chi{' '}
                    </Text>
                    <View
                        style={{
                            borderWidth: 1,
                            height: 22,
                            borderColor: COLORS.primary,
                            width: 67,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginHorizontal: 46,
                            marginTop: 8,
                        }}>
                        <Text
                            style={{
                                color: COLORS.primary,
                                fontWeight: '500',
                            }}>
                            Mặc định
                        </Text>
                    </View>
                    <View
                        style={{
                            borderWidth: 1,
                            width: '100%',
                            borderColor: '#d0d0d0',
                            marginTop: 20,
                        }}
                    />
                </View>
                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 15,
                        backgroundColor: COLORS.white,
                        height: 50,
                    }}
                    onPress={() => {
                        navigation.navigate('Thông tin mới');
                    }}>
                    <Icon
                        name="ios-add-circle-outline"
                        size={30}
                        style={{ color: COLORS.primary }}
                    />
                    <Text
                        style={{
                            fontWeight: '500',
                            color: COLORS.primary,
                            left: 15,
                            fontSize: 16,
                        }}>
                        Thêm thông tin mới
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default DetailInfoBooking;
