import React,{useState} from "react";
import {View,Text,TouchableOpacity,Image} from "react-native"
import COLORS from "../../consts/colors"
import Icon from "react-native-vector-icons/Fontisto"
export default function Booking (){
        const [button,setbutton]=useState(1)
        return (
                <View style={{flex:1,backgroundColor:"white"}}>
                         <View style={{ flexDirection: "row", paddingTop: "4%",justifyContent:"space-between"}}>
                                <View style={{flexDirection:"row"}}>
                                <Image source={require("../../assets/logo.png")}
                                        style={{ width: 40, height: 40, borderRadius: 20, marginLeft: 10 }}
                                />
                                <Text style={{ fontSize: 22, fontWeight: "bold", color: COLORS.dark, paddingTop: 2, marginLeft: 15 }}>My Booking</Text>
                                </View>
                                <Icon name="search" size={22} color={COLORS.dark} style={{right:20}}/>
                        </View>
                        <View style={{flexDirection:"row",justifyContent:"space-between",width:320,alignSelf:"center",marginTop:20}}>
                                <TouchableOpacity 
                                style={button===1?{
                                        backgroundColor:COLORS.primary,
                                        borderRadius:20,
                                        width:95,
                                        height:37,
                                        justifyContent:"center",
                                        alignItems:"center"
                                }:{
                                        borderWidth:2,
                                        borderColor:COLORS.primary,
                                        borderRadius:20,
                                        width:95,
                                        height:37,
                                        justifyContent:"center",
                                        alignItems:"center"
                                }}
                                onPress={()=>setbutton(1)}
                                >
                                        <Text 
                                        style={button===1?{
                                                fontSize:16,
                                                fontWeight:"bold",
                                                color:COLORS.white
                                                }:{
                                                fontSize:16,
                                                fontWeight:"bold",
                                                color:COLORS.primary
                                                }}>
                                                Ongoing
                                        </Text>
                                </TouchableOpacity>

                                <TouchableOpacity 
                                style={button===2?{
                                        backgroundColor:COLORS.primary,
                                        borderRadius:20,
                                        width:95,
                                        height:37,
                                        justifyContent:"center",
                                        alignItems:"center"
                                }:{
                                        borderWidth:2,
                                        borderColor:COLORS.primary,
                                        borderRadius:20,
                                        width:95,
                                        height:37,
                                        justifyContent:"center",
                                        alignItems:"center"
                                }}
                                onPress={()=>setbutton(2)}
                                >
                                        <Text 
                                        style={button===2?{
                                                fontSize:16,
                                                fontWeight:"bold",
                                                color:COLORS.white
                                                }:{
                                                fontSize:16,
                                                fontWeight:"bold",
                                                color:COLORS.primary
                                                }}>
                                                Completed
                                        </Text>
                                </TouchableOpacity>

                                <TouchableOpacity 
                                style={button===3?{
                                        backgroundColor:COLORS.primary,
                                        borderRadius:20,
                                        width:95,
                                        height:37,
                                        justifyContent:"center",
                                        alignItems:"center"
                                }:{
                                        borderWidth:2,
                                        borderColor:COLORS.primary,
                                        borderRadius:20,
                                        width:95,
                                        height:37,
                                        justifyContent:"center",
                                        alignItems:"center"
                                }}
                                onPress={()=>setbutton(3)}
                                >
                                        <Text 
                                        style={button===3?{
                                                fontSize:16,
                                                fontWeight:"bold",
                                                color:COLORS.white
                                                }:{
                                                fontSize:16,
                                                fontWeight:"bold",
                                                color:COLORS.primary
                                                }}>
                                                Canceled
                                        </Text>
                                </TouchableOpacity>
                        </View>
                </View>
        )
}