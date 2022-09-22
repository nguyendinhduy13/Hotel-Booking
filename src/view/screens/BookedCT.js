import React from 'react'
import {View,Text,TouchableOpacity,TextInput} from 'react-native'
import COLORS from '../../consts/colors'
import Icon from "react-native-vector-icons/AntDesign"
const BookedCT = ({navigation,route}) => {
  const item=route.params
  return (
    <View style={{backgroundColor:COLORS.white,flex:1}}>
    <View style={{flexDirection:"row"}}>
                        <Icon
                        onPress={()=> {navigation.goBack()}}
                                name="arrowleft"
                                size={30}
                                style={{ color: COLORS.dark, marginLeft: 15, marginTop: 15 }}
                        />
                        <Text style={{fontSize:20,fontWeight:"bold",marginTop:16,marginLeft:10,color:COLORS.dark}}>Name of Reservation</Text>
    </View>  
    <View style={{justifyContent:"center",alignItems:"center",marginTop:20}}>
        <TextInput
        placeholder='Họ tên'
        style={{width:350,height:55,borderRadius:10,marginTop:20,backgroundColor:COLORS.textinput}}
        />
       <TextInput
        placeholder='Ngày sinh'
        style={{width:350,height:55,borderRadius:10,marginTop:20,backgroundColor:COLORS.textinput}}
        />
        <TextInput
        placeholder='Email'
        style={{width:350,height:55,borderRadius:10,marginTop:20,backgroundColor:COLORS.textinput}}
        />
        <TextInput
        placeholder='Giới tính'
        style={{width:350,height:55,borderRadius:10,marginTop:20,backgroundColor:COLORS.textinput}}
        />
        <TextInput
        placeholder='Số điện thoại'
        style={{width:350,height:55,borderRadius:10,marginTop:20,backgroundColor:COLORS.textinput}}
        />
    </View>
    <TouchableOpacity style={{backgroundColor:COLORS.primary,height:45,width:350,alignSelf:"center",alignItems:"center",justifyContent:"center",borderRadius:20}} onPress={()=>navigation.navigate("BookedFinal",item)}>
         <Text style={{fontSize:15,fontWeight:"bold",color:COLORS.white}}>Continue</Text>
  </TouchableOpacity>
  </View>
  )
}

export default BookedCT