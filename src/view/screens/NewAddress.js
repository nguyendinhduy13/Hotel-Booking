import React from 'react'
import {View,TextInput,TouchableOpacity,Text} from "react-native"
import COLORS from '../../consts/colors'
const NewAddress = () => {
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
                    onPress={() => {}}>
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

export default NewAddress