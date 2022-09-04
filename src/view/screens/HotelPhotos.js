import React, { useEffect, useState } from "react";
import {View,Text,Image, TouchableOpacity, Modal, ScrollView} from "react-native"
import { FlatList } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/AntDesign"
import COLORS from "../../consts/colors";
import hotels from "../../consts/hotels";

export default function HotelPhotos({route}){
        const [item,setItem]=useState(route.params)
        const [itemzoom,setitemzoom]=useState("")
        const [modalVisible,setModalVisible]=useState(false)
        const ListImage=({hotel})=>{
              if(hotel.id==item.id){
                return (
                        <View>
                                <TouchableOpacity onPress={()=>{setModalVisible(!modalVisible),setitemzoom(item)}}>
                                {hotel.image.map((image,index)=>(
                                <Image
                                 source={{uri:image}}
                                 style={{width:160,height:150,marginTop:20,marginHorizontal:15,borderRadius:20}}
                                /> 
                                ))}
                                </TouchableOpacity>
                        </View>
                )
        }}

        return(
                <ScrollView contentContainerStyle={!modalVisible?{
                        backgroundColor: COLORS.white,
                        flex:1,
                        paddingBottom:20,
                }:{backgroundColor: COLORS.grey,
                        flex:1,
                        paddingBottom:20,}}>
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
                                data={!modalVisible?hotels:""}
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
                        <View style={{alignItems:"center",marginTop:"50%"}}>
                        <Image
                                 source={{uri:itemzoom.image}}
                                 style={{width:300,height:290,borderRadius:20}}
                                /> 
                        </View>
                     </Modal>                    
                </ScrollView>
        )
}