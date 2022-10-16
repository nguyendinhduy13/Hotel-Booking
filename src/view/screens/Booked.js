
import React,{useState,useEffect} from "react";
import {View,Text,StyleSheet, TouchableOpacity,TextInput,ScrollView} from "react-native"
import Icon2 from "react-native-vector-icons/AntDesign"
import Icon1 from 'react-native-vector-icons/Entypo';
import COLORS from "../../consts/colors";
import DatetimePicker from "@react-native-community/datetimepicker"

export default function Booked({navigation,route}){
        const item=route.params
        const [Number,setNumber]=useState(0)
        const [startDate, setstartDate] = useState(new Date());
        const [endDate, setendDate] = useState(new Date());
        const [showDatetime, setshowDatetime] = useState(false);
        const [showDatetime1, setshowDatetime1] = useState(false);
        const [mode, setMode] = useState("date");
        const showDatepicker = () => {
                showMode("date");
        };
        const showDatepicker1 = () => {
                showMode1("date");
        };
        
        const onChange = (event, selectedDate) => {
                const currentDate = selectedDate || date;
                setshowDatetime(false);
                const formattedDate = currentDate.getDate() + "/" + (currentDate.getMonth() + 1) + "/" + currentDate.getFullYear()
                setstartDate(formattedDate);
        };

        const onChange1 = (event, selectedDate) => {
                const currentDate = selectedDate || date;
                setshowDatetime1(false);
                const formattedDate = currentDate.getDate() + "/" + (currentDate.getMonth() + 1) + "/" + currentDate.getFullYear()
                setendDate(formattedDate);
        };
            
        const showMode = (currentMode) => {
                setshowDatetime(true);
                setMode(currentMode);
        };
        const showMode1 = (currentMode) => {
                setshowDatetime1(true);
                setMode(currentMode);
        };
        
        const addbooking=()=>{
                
        }

        return (
                <ScrollView style={{backgroundColor:COLORS.white,flex:1}}>
                        <View style={{flexDirection:"row",marginVertical:30}}>
                        <Icon2
                        onPress={()=> {}}
                                name="arrowleft"
                                size={30}
                                style={{ color: COLORS.dark, marginLeft: 15, marginTop: 15 }}
                        />
                        <Text style={{fontSize:20,fontWeight:"bold",marginTop:16,marginLeft:10,color:COLORS.dark}}>Select Date</Text>
                        </View>  
                        <View style={{flexDirection:"row",justifyContent:"space-between",marginHorizontal:23,marginTop:20}}>
                                <Text style={styles.Text}>Check in</Text>
                                <Text style={styles.Text}>Check out</Text>
                        </View>
                        <View style={{flexDirection:"row",marginHorizontal:15,justifyContent:"space-between",marginTop:10}}>
                                <View style={{flexDirection:"row",borderWidth:2,borderRadius:10,width:160,height:40,alignItems:"center",justifyContent:"space-between",borderColor:COLORS.primary}}>
                                <Text style={{fontWeight:"600",color:COLORS.dark,fontSize:17}}>{startDate.toString()}</Text>
                               <Icon1
                                    name="calendar"
                                    size={24}
                                    onPress={showDatepicker}
                                    style={{color:COLORS.primary,marginRight:7}}
                                />
                                {showDatetime && (
                                    <DatetimePicker
                                        testID="dateTimePicker"
                                        value={startDate}
                                        mode={mode}
                                        is24Hour={true}
                                        display="default"
                                        onChange={onChange}
                                    />
                                )}
                                </View>
                                <View style={{flexDirection:"row",borderWidth:2,borderRadius:10,alignItems:"center",justifyContent:"space-between",width:150,height:40,borderColor:COLORS.primary}}>
                                <Text style={{fontWeight:"600",color:COLORS.dark,fontSize:17}}>{endDate.toString()}</Text>
                                <Icon1
                                    name="calendar"
                                    size={24}
                                    onPress={showDatepicker1}
                                    style={{ color: COLORS.primary,marginRight:7 }}
                                />
                                {showDatetime1 && (
                                    <DatetimePicker
                                        testID="dateTimePicker"
                                        value={endDate}
                                        mode={mode}
                                        is24Hour={true}
                                        display="default"
                                        onChange={onChange1}
                                    />
                                )}
                                </View>
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
    
                        <View style={{marginVertical:25}}>
                        <Text style={{fontSize:18,color:COLORS.dark, fontWeight:"bold",marginTop:15,marginLeft:23}}>Guest</Text>
                        <View style={{flexDirection:"row",justifyContent:"center",width:350,alignSelf:"center",height:55,alignItems:"center",borderRadius:10,marginTop:10}}>
                                <TouchableOpacity style={{width:50,backgroundColor:COLORS.blurprimary,height:40,alignItems:"center",borderRadius:15}} onPress={()=>{setNumber(Number>0?Number-1:Number)}}>
                                        <Text style={{fontSize:30,color:COLORS.primary}}>-</Text>
                                </TouchableOpacity>
                                <Text style={{fontSize:20,marginTop:3,fontWeight:"bold",color:COLORS.black,marginHorizontal:30}}>{Number}</Text>
                                <TouchableOpacity style={{width:50,backgroundColor:COLORS.blurprimary,height:40,alignItems:"center",borderRadius:15}} onPress={()=>setNumber(Number+1)}>
                                        <Text style={{fontSize:30,color:COLORS.primary}}>+</Text>
                                </TouchableOpacity>
                        </View>
                        <Text style={{alignSelf:"center",paddingTop:30,fontSize:20,fontWeight:"bold",color:COLORS.dark}}>Total: $435</Text>
                        <TouchableOpacity style={{backgroundColor:COLORS.primary,height:45,width:350,alignSelf:"center",alignItems:"center",justifyContent:"center",borderRadius:20,marginTop:15}} onPress={()=>{navigation.navigate("BookedFinal",item)}}>
                                <Text style={{fontSize:15,fontWeight:"bold",color:COLORS.white}}>Continue</Text>
                        </TouchableOpacity>
                        </View>
                </ScrollView>
        )
}
const styles = StyleSheet.create({
  Text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.dark,
  },
});
