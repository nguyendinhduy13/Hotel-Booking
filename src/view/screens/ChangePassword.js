import React from 'react'
import {View,TextInput,Text,TouchableOpacity,StyleSheet} from 'react-native'
import COLORS from '../../consts/colors'

const ChangePassword = () => {
  return (
    <View style={{flex:1,backgroundColor:"white"}}>
        <TextInput
        placeholder='Mật khẩu hiện tại'
        style={{
                borderWidth: 1,
                borderRadius: 10,
                borderColor: 'gray',
                width: 350,
                height:55,
                alignSelf: 'center',
                borderColor: '#d0d0d0',
                marginTop:30
            }}
        />
         <TextInput
        placeholder='Mật khẩu mới'
        style={{
                borderWidth: 1,
                borderRadius: 10,
                borderColor: 'gray',
                width: 350,
                height:55,
                alignSelf: 'center',
                borderColor: '#d0d0d0',
                marginVertical:30
            }}
        />
         <TextInput
        placeholder='Xác nhận mật khẩu mới'
        style={{
                borderWidth: 1,
                borderRadius: 10,
                borderColor: 'gray',
                width: 350,
                height:55,
                alignSelf: 'center',
                borderColor: '#d0d0d0',
            }}
        />
        <TouchableOpacity style={{borderWidth:1,borderColor: '#d0d0d0',height:45,width:370,alignItems:"center",justifyContent:"center",alignSelf:"center",borderRadius:10,backgroundColor:COLORS.primary,marginTop:25}}>
                <Text style={{fontSize:17,fontWeight:"600",color:"white"}}>Hoàn thành</Text>
        </TouchableOpacity>
    </View>
  )
}

export default ChangePassword