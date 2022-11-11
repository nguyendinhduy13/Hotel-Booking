import React,{useEffect,useState} from 'react';
import { View, Text,Image,TouchableOpacity,ScrollView } from 'react-native';
import COLORS from '../../consts/colors';
import firestore from '@react-native-firebase/firestore';
export default function AddItem() {
    const [data,setdata]=useState([]);
    useEffect(()=>{
        firestore()
        .collection('HotelList')
        .doc('AmisHotel')
        .get()
        .then(documentSnapshot => {
            const data = documentSnapshot.data();
            setdata(data.Room);
        });  
    },[data])
    const addroom=()=>{
        firestore()
        .collection('Test')
        .doc('Test')
        .update({
            data:firestore.FieldValue.arrayRemove(1)
        })
        console.log('Room Deleted');
    }
    return (
        <ScrollView>
            <Text
                style={{
                    fontSize: 17,
                    color: COLORS.dark,
                    justifyContent: 'center',
                    alignSelf:'center',
                    marginTop:10
                }}>
                DANH SÁCH PHÒNG CỦA KHÁCH SẠN
            </Text>
            {data.map((item,index)=>(
                 <View key={index} style={{height:150,width:'100%'}}>
                 <Text style={{}}>
                    {item.name}
                 </Text>
                 <Image
                 source={{uri:item.image[0]}}
                 style={{height:100,width:100}}
                 />
                 <Text>{item.price}</Text>
                 <View key={index} style={{justifyContent:"space-between",flexDirection:"row"}}>
                    <Image
                    source={{uri:index<3?item.icon[index]:null}}
                    />
                    <Text>{index<3?item.tienich[index]:null}</Text>
                 </View>
             </View>
            ))}
             <TouchableOpacity>
                <Text onPress={addroom}>Thêm phòng</Text>
             </TouchableOpacity>
        </ScrollView>
    );
}
