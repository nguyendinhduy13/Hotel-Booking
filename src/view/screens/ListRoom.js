import React,{useState,useEffect} from 'react'
import Icon from "react-native-vector-icons/MaterialIcons";
import firestore from '@react-native-firebase/firestore';
import {TouchableOpacity,View,Text,Image,StyleSheet} from "react-native"
import COLORS from '../../consts/colors';
const ListRoom = ({navigation,route}) => {
        const item=route.params
        const [DataRoom, setDataRoom] = useState([])
        useEffect(() => {
                    firestore()
                        .collection('HotelList')
                        .doc(item.id)
                        .get()
                        .then(documentSnapshot => {
                            const data = documentSnapshot.data();
                            setDataRoom(data.Room)
                        });
        }, [])
  return (
    <View>
        {DataRoom.map((items,index)=>(
                                <TouchableOpacity style={styles.RecentlyBox} key={index} onPress={()=>{navigation.navigate("DetailsScreen",DataRoom)}}>  
                                        <View style={{ width: 120, height: 120 }}>
                                                <Image style={styles.IMGRecent} source={{ uri: items.image[0] }} />
                                        </View>
                                        <View>
                                                <View style={{ marginTop: 10, flexDirection: 'row'}}>
                                                        <View style={{width:180,height: 45 }}>
                                                                <Text style={{ fontSize: 17, fontWeight: 'bold', color: "black" }}>{items.name}</Text>
                                                        </View>
                                                        <View style={{marginLeft:18}}>
                                                        <Icon name="bookmark-border" size={26} color={COLORS.black} />
                                                        </View>
                                                </View>
                                                <View style={{marginTop:15,marginLeft:7}}>
                                                        <Text style={{fontSize:20,fontWeight:"700",color:COLORS.primary}}>{items.price} {"VNĐ/1 Đêm"}</Text>
                                                </View>
                                        </View>
                                       
                                </TouchableOpacity>
))}                                        
    </View>
  )
}

const styles=StyleSheet.create({
        RecentlyBox: {
                width: "90%",
                height: 120,
                color: "black",
                backgroundColor: COLORS.white,
                marginBottom: 10,
                marginTop: 10,
                alignSelf: 'center',
                borderRadius: 20,
                elevation: 15,
                flexDirection: 'row'
        },
        IMGRecent: {
                height: 95,
                width: 95,
                borderRadius: 20,
                alignSelf: 'center',
                marginTop: 12,
        },
})

export default ListRoom