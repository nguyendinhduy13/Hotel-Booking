import React,{useState,useEffect} from "react";
import {View,Text} from "react-native"
import Icon2 from "react-native-vector-icons/AntDesign"
import COLORS from "../../consts/colors";
import Calendar from "react-native-calendars/src/calendar";
export default function Booked({navigation}){
        const [day,setDay]=useState("")
        const [dateString,setDateString]=useState("")
        return(
                <View>
                        <View style={{flexDirection:"row"}}>
                        <Icon2
                        onPress={()=> {}}
                                name="arrowleft"
                                size={30}
                                style={{ color: COLORS.dark, marginLeft: 15, marginTop: 15 }}
                        />
                        <Text style={{fontSize:19,fontWeight:"bold",marginTop:16,marginLeft:10,color:COLORS.black}}>Select Date</Text>
                        </View>  
                        <Calendar
                        onDayPress={(day)=>{setDay(day),setDateString(day.dateString)}}
                        markedDates={
                                {
                                     dateString:{marked:true,dotColor:"red",selectedColor:"purple",selected:true}   
                                }
                        }
                        />
                </View>
        )
}