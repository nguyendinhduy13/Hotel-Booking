import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Image,
} from 'react-native';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/EvilIcons';
import COLORS from '../../consts/colors';
import BookingHotel from '../../redux/BookingHotel';
import firestore from '@react-native-firebase/firestore';
import Auth from '@react-native-firebase/auth';
export default function Booked({ navigation, route }) {
    const item = route.params;
    const dispatch = useDispatch();
    const [Number, setNumber] = useState(1);
    const { dayamount, startday, endday, namehotel,idhotel } = useSelector(
        state => state.Globalreducer,
    );
    const { userbooking } = useSelector(state => state.BookingHotel);
    const user=Auth().currentUser;
    const addbooking = () => {
        let x=start.getDate()+'/'+(start.getMonth())+'/'+start.getFullYear()
        let y=end.getDate()+'/'+(end.getMonth())+'/'+end.getFullYear()
        const a = [
            {
                name: namehotel,
                roomname: item.name,
                price: item.price,
                checkin: x,
                checkout: y,
                dayamount: amount,
                status:'ongoing',
                guess: Number,
                image: item.image[1],
                total: sum,
            },
        ];
        dispatch(BookingHotel.actions.addBookingHotel(a));
        firestore()
            .collection(user.uid+'Booking')
            .add({
                name: namehotel,
                roomname: item.name,
                price: item.price,
                checkin: x,
                checkout: y,
                dayamount: amount,
                status:'ongoing',
                guess: Number,
                image: item.image[1],
                total: sum,
            })
            .then(() => {
                console.log('Booking added!');
            });
        firestore()
        .collection('ListBooking')
        .doc(idhotel)
        .set({
            data:a
        }
        )
        .then(() => {
            console.log('Booking added!');
        });
    };

    const day = new Date();
    const amount = dayamount > 0 ? dayamount : 1;
    const day1 = day.setDate(day.getDate() + 1);
    console.log(userbooking.email);
    const start = new Date(startday !== '' ? startday : Date.now());
    const end = new Date(endday !== '' ? endday : day1);
    const sum = Math.floor(
        item.price * amount + (item.price * amount * (Number * 2)) / 1000,
    );
    return (
        <ScrollView style={{ flex: 1 }}>
            <View
                style={{
                    width: '100%',
                    height: 100,
                    backgroundColor: COLORS.white,
                }}>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <Icon
                        name="location"
                        size={22}
                        color={COLORS.primary}
                        style={{ left: 10 }}
                    />
                    <Text
                        style={{
                            left: 20,
                            fontSize: 15,
                            bottom: 2,
                            color: COLORS.dark,
                        }}>
                        Thông tin đặt phòng
                    </Text>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 5,
                    }}>
                    <Text style={{ left: 43, color: COLORS.dark }}>
                        {userbooking.name} {'\n'}
                        {userbooking.phone} {'\n'}
                        {userbooking.birthday} {'\n'}
                        {userbooking.email} {'\n'}
                    </Text>
                    <Icon1
                        name="arrow-forward-ios"
                        size={20}
                        style={{ right: 7 }}
                        onPress={() => {
                            navigation.navigate('Chỉnh sửa thông tin');
                        }}
                    />
                </View>
            </View>
            <View style={styles.RecentlyBox}>
                <View
                    style={{
                        width: '98%',
                        height: 200,
                        alignSelf: 'center',
                    }}>
                    <Image
                        style={styles.IMGRecent}
                        source={{ uri: item.image[1] }}
                    />
                </View>
                <View style={{ marginTop: 25 }}>
                    <View style={{ paddingHorizontal: 20 }}>
                        <Text
                            style={{
                                fontSize: 20,
                                height: 25,
                                color: COLORS.dark,
                                fontWeight: '600',
                            }}>
                            {item.name}
                        </Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text
                                style={{
                                    fontSize: 20,
                                    paddingVertical: 10,
                                    fontWeight: '700',
                                    color: COLORS.primary,
                                }}>
                                {item.price}
                            </Text>
                            <Text
                                style={{
                                    fontSize: 16,
                                    color: COLORS.dark,
                                    paddingVertical: 13,
                                    fontWeight: '600',
                                }}>
                                {' '}
                                VND/đêm
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
            <View
                style={{
                    backgroundColor: COLORS.white,
                    height: 140,
                    borderRadius: 15,
                    width: '95%',
                    alignSelf: 'center',
                }}>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: 330,
                        alignSelf: 'center',
                        marginTop: 20,
                    }}>
                    <Text style={{ fontWeight: '500', fontSize: 17 }}>
                        Check in
                    </Text>
                    <Text
                        style={{
                            fontWeight: 'bold',
                            fontSize: 17,
                            color: COLORS.dark,
                        }}>
                        {start.getDate()}/{start.getMonth()}/
                        {start.getFullYear()}
                    </Text>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: 330,
                        alignSelf: 'center',
                        marginTop: 20,
                    }}>
                    <Text style={{ fontWeight: '500', fontSize: 17 }}>
                        Check out
                    </Text>
                    <Text
                        style={{
                            fontWeight: 'bold',
                            fontSize: 17,
                            color: COLORS.dark,
                        }}>
                        {end.getDate()}/{end.getMonth()}/{end.getFullYear()}
                    </Text>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: 330,
                        alignSelf: 'center',
                        marginTop: 20,
                    }}>
                    <Text style={{ fontWeight: '500', fontSize: 17 }}>
                        Khách
                    </Text>
                    <Text
                        style={{
                            fontWeight: 'bold',
                            fontSize: 17,
                            color: COLORS.dark,
                        }}>
                        {Number}
                    </Text>
                </View>
            </View>
            <View
                style={{
                    backgroundColor: COLORS.white,
                    height: 180,
                    borderRadius: 15,
                    width: '95%',
                    alignSelf: 'center',
                    marginTop: 20,
                }}>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: 330,
                        alignSelf: 'center',
                        marginTop: 20,
                    }}>
                    <Text style={{ fontWeight: '500', fontSize: 17 }}>
                        {amount} ngày
                    </Text>
                    <Text
                        style={{
                            fontWeight: 'bold',
                            fontSize: 17,
                            color: COLORS.dark,
                        }}>
                        {item.price * amount} VNĐ
                    </Text>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: 330,
                        alignSelf: 'center',
                        marginTop: 20,
                    }}>
                    <Text style={{ fontWeight: '500', fontSize: 17 }}>
                        Phụ thu
                    </Text>
                    <Text
                        style={{
                            fontWeight: 'bold',
                            fontSize: 17,
                            color: COLORS.dark,
                        }}>
                        {Math.floor(
                            (item.price * amount * (Number * 2)) / 1000,
                        )}{' '}
                        VNĐ
                    </Text>
                </View>
                <View
                    style={{
                        borderWidth: 0.2,
                        borderColor: '#d0d0d0',
                        marginTop: 20,
                    }}
                />
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: 330,
                        alignSelf: 'center',
                        marginTop: 20,
                    }}>
                    <Text style={{ fontWeight: '500', fontSize: 17 }}>
                        Tổng tiền
                    </Text>
                    <Text
                        style={{
                            fontWeight: 'bold',
                            fontSize: 17,
                            color: COLORS.dark,
                        }}>
                        {sum} VNĐ
                    </Text>
                </View>
            </View>
            <View style={{ marginVertical: 12 }}>
                <Text
                    style={{
                        fontSize: 18,
                        color: COLORS.dark,
                        fontWeight: 'bold',
                        marginLeft: 23,
                    }}>
                    Khách
                </Text>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        width: 350,
                        alignSelf: 'center',
                        height: 55,
                        alignItems: 'center',
                        borderRadius: 10,
                        marginTop: 10,
                    }}>
                    <TouchableOpacity
                        style={{
                            width: 50,
                            backgroundColor: COLORS.blurprimary,
                            height: 40,
                            alignItems: 'center',
                            borderRadius: 15,
                        }}
                        onPress={() => {
                            setNumber(Number > 0 ? Number - 1 : Number);
                        }}>
                        <Text style={{ fontSize: 30, color: COLORS.primary }}>
                            -
                        </Text>
                    </TouchableOpacity>
                    <Text
                        style={{
                            fontSize: 20,
                            marginTop: 3,
                            fontWeight: 'bold',
                            color: COLORS.black,
                            marginHorizontal: 30,
                        }}>
                        {Number}
                    </Text>
                    <TouchableOpacity
                        style={{
                            width: 50,
                            backgroundColor: COLORS.blurprimary,
                            height: 40,
                            alignItems: 'center',
                            borderRadius: 15,
                        }}
                        onPress={() => setNumber(Number + 1)}>
                        <Text style={{ fontSize: 30, color: COLORS.primary }}>
                            +
                        </Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    style={{
                        backgroundColor: COLORS.primary,
                        height: 45,
                        width: 350,
                        alignSelf: 'center',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 20,
                        marginTop: 15,
                    }}
                    onPress={() => {
                        addbooking();
                    }}>
                    <Text
                        style={{
                            fontSize: 15,
                            fontWeight: 'bold',
                            color: COLORS.white,
                        }}>
                        Xác nhận đặt phòng
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    Text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.dark,
    },
    RecentlyBox: {
        width: '100%',
        height: 300,
        color: 'black',
        backgroundColor: COLORS.white,
        marginBottom: 15,
        alignSelf: 'center',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        elevation: 15,
        marginTop: 10,
        shadowColor: COLORS.black,
    },
    IMGRecent: {
        height: '100%',
        width: '100%',
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
});
