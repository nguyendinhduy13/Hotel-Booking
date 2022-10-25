import React,{useState} from 'react'
import {View,TextInput,TouchableOpacity,Text} from "react-native"
import COLORS from '../../consts/colors'
import {useDispatch,useSelector} from "react-redux"
import BookingHotel from '../../redux/BookingHotel';
import Auth from '@react-native-firebase/auth';
const EditUserBooking = ({navigation}) => {
    const dispatch=useDispatch();
    const {userbooking}=useSelector(state=>state.BookingHotel);
    const userinfo=Auth().currentUser;
    const adduserbooking=()=>{
        const a={
            name:name,
            phone:phone,
            birthday:birthday,
            email:email,
        };
        dispatch(BookingHotel.actions.addBookingHotelUser(a));
        navigation.goBack();
    }

    const [name,setName]=useState(userinfo.displayName?userinfo.displayName:"");
    const [phone,setPhone]=useState(userbooking.phone?userbooking.phone:"");
    const [birthday,setBirthday]=useState(userbooking.birthday?userbooking.birthday:"");
    const [email,setEmail]=useState(userinfo.email);
  return (
    <View>
        <TextInput
        placeholder='Họ và tên'
        style={{
                borderWidth: 1,
                borderRadius: 10,
                borderColor: 'gray',
                width: 350,
                height:55,
                alignSelf: 'center',
                borderColor: '#d0d0d0',
                marginTop:30,
                backgroundColor:"white"
            }}
            value={name}
            onChangeText={(text)=>setName(text)}
        />
         <TextInput
        placeholder='Số điện thoại'
        style={{
                borderWidth: 1,
                borderRadius: 10,
                borderColor: 'gray',
                width: 350,
                height:55,
                alignSelf: 'center',
                borderColor: '#d0d0d0',
                backgroundColor:"white",
                marginVertical:30
            }}
            value={phone}
            onChangeText={(text)=>setPhone(text)}
        />
         <TextInput
        placeholder='Ngày sinh'
        style={{
                borderWidth: 1,
                borderRadius: 10,
                borderColor: 'gray',
                width: 350,
                height:55,
                alignSelf: 'center',
                borderColor: '#d0d0d0',
                backgroundColor:"white"
            }}
            value={birthday}
            onChangeText={(text)=>setBirthday(text)}
        />
        <TextInput
        placeholder='Email'
        style={{
                borderWidth: 1,
                borderRadius: 10,
                borderColor: 'gray',
                width: 350,
                height:55,
                alignSelf: 'center',
                borderColor: '#d0d0d0',
                backgroundColor:"white",
                marginTop:30
            }}
            value={email}
            onChangeText={(text)=>setEmail(text)}
        />
        <TouchableOpacity
                    style={{
                        backgroundColor: COLORS.primary,
                        height: 45,
                        width: 350,
                        alignSelf: 'center',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 20,
                        marginTop: 20,
                    }}
                    onPress={() => {adduserbooking();}}>
                    <Text
                        style={{
                            fontSize: 15,
                            fontWeight: 'bold',
                            color: COLORS.white,
                        }}>
                        Hoàn thành
                    </Text>
                </TouchableOpacity>
    </View>
  )
}

export default EditUserBooking