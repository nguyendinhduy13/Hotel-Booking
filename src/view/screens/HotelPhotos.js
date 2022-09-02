import React, { useEffect, useState } from "react";
import {View,Text,Image, TouchableOpacity, Modal} from "react-native"
import { FlatList } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/AntDesign"
import COLORS from "../../consts/colors";
import hotels from "../../consts/hotels";

export default function HotelPhotos({route}){
        const [item,setItem]=useState(route.params)
        const [modalVisible,setModalVisible]=useState(false)
        const ListImage=({hotel})=>{
                if(hotel.id==item.id){
                return (
                        <View>
                                <TouchableOpacity onPress={()=>setModalVisible(!modalVisible)}>
                                <Image
                                 source={{uri:hotel.image}}
                                 style={{width:160,height:150,marginTop:20,marginHorizontal:15,borderRadius:20}}
                                /> 
                                </TouchableOpacity>
                        </View>
                )
        }
        }

        return(
                <View>
                        <View style={{paddingTop:"10%",marginHorizontal:15,flexDirection:"row"}}>
                                <Icon
                                 name="arrowleft"
                                 size={30}
                                />  
                                <Text style={{fontSize:19,fontWeight:"bold",color:COLORS.black,marginHorizontal:20,marginTop:2}}>
                                        Gallery Hotel Photos
                                </Text>
                        </View>  
                        
                        <View>
                                <FlatList
                                data={hotels}
                                horizontal={false}
                                showsHorizontalScrollIndicator={false}
                                numColumns={1}
                                renderItem={({ item }) => <ListImage hotel={item} />}
                                />
                        </View>   
                        <Modal
                     
                     transparent={true}
                     visible={modalVisible}
                     onRequestClose={() => {
                        setModalVisible(!modalVisible);
                     }}
                     >
                        <View>
                        <Image
                                 source={{uri:"https://pix10.agoda.net/hotelImages/338405/-1/0a8728c27c3139c4c1cc4b7b767db501.jpg?ca=0&ce=1&s=1024x768"}}
                                 style={{width:300,height:290,marginTop:20,marginHorizontal:15,borderRadius:20}}
                                /> 
                        </View>
                     </Modal>                    
                </View>
        )
}