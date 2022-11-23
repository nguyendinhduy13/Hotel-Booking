import React,{useEffect,useState} from 'react';
import { View, Text,Image,TouchableOpacity,ScrollView } from 'react-native';
import COLORS from '../../consts/colors';
import firestore from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';
export default function AddItem({navigation}) {
    const [data,setdata]=useState([]);
    const {id_ks}=useSelector(state=>state.Globalreducer);
    useEffect(()=>{
        firestore()
        .collection('HotelList')
        .doc(id_ks)
        .get()
        .then(documentSnapshot => {
            const data = documentSnapshot.data();
            setdata(data.Room);
        });  
    },[data])
    return (
        <View>
            <ScrollView>
            <Text
                style={{
                    fontSize: 17,
                    color: COLORS.dark,
                    fontWeight:"600",
                    justifyContent: 'center',
                    alignSelf:'center',
                    marginTop:10
                }}>
                DANH SÁCH PHÒNG CỦA KHÁCH SẠN
            </Text>
            {data.map((item,index)=>(
                 <View key={index} style={{height:150,width:'95%',flexDirection:"row",backgroundColor:'white',marginTop:15,alignSelf:"center",borderRadius:20}}>
                 <Image
                 source={{uri:item.image[0]}}
                 style={{height:140,width:140,alignSelf:"center",borderRadius:15}}
                 />
                 <View style={{top:5,left:10}}>
                 <Text style={{fontWeight:'500',fontSize:17,color:'black'}}>
                    {item.name}
                 </Text>
                 <Text style={{marginVertical:10,fontWeight:'400',fontSize:16,color:"black"}}>{item.price} VNĐ</Text>
                 {item.icon.map((items,index)=>(
                    <View key={index} style={{flexDirection:"row",marginTop:5}}>
                    <Image
                    source={{uri:index<3?items:null}}
                    style={{width:20,height:20}}
                    />
                    <Text style={{left:15,fontWeight:"600"}}>{index<3?item.tienich[index]:null}</Text>
                 </View>
                 ))}
                 </View>
             </View>
            ))}
        </ScrollView>
        <TouchableOpacity style={{
                borderWidth: 1,
                borderColor: "#03A9F4",
                position: "absolute",
                width: 56,
                height: 56,
                alignItems: 'center',
                justifyContent: 'center',
                right: 20,
                bottom: 30,
                backgroundColor: 'white',
                borderRadius: 30,
                elevation: 8,
            }}
            onPress={()=>{navigation.navigate('ItemInfo')}}
            >
                <Text style={{fontSize:40,bottom:2}}>+</Text>
            </TouchableOpacity>
        </View>
    );
}
