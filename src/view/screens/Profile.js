import React,{useContext} from "react";
import {View,Text,Image,StyleSheet, TouchableOpacity, Alert} from "react-native"
import { Avatar, Switch } from "react-native-elements";
import COLORS from "../../consts/colors";
import Icon1 from "react-native-vector-icons/MaterialIcons"
import Icon from "react-native-vector-icons/Ionicons"
import auth from "@react-native-firebase/auth"
import { SignInContext } from "../../contexts/authContext";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
export default function Profile(){
        const { dispatchSignedIn } = useContext(SignInContext)
        async function signOut(){
                try{
                        auth().signOut().then(
                                ()=>{
                                         GoogleSignin.revokeAccess();
                                         GoogleSignin.signOut();
                                        dispatchSignedIn({ type: "UPDATE_SIGN_IN", payload: { userToken: null } })
                                }
                        )
                }
                catch(error){
                        Alert.alert("Error",error.message)
                }
        }

        return (
                <View style={{flex:1,backgroundColor:COLORS.white}}>
                        <View style={{flexDirection:"row",paddingTop:"4%"}}>
                        <Image source={require("../../assets/logo.png")} 
                        style={{width:40,height:40,borderRadius:20,marginLeft:10}}
                        />
                        <Text style={{fontSize:22,fontWeight:"bold",color:COLORS.dark,paddingTop:4,marginLeft:10}}>Profile</Text>
                       </View>
                       <View style={{alignItems:"center",paddingTop:"5%"}}>
                        <Avatar
                        size={130}
                        rounded
                        source={require("../../assets/logo.png")}
                        />
                        <Text style={{fontSize:20,marginTop:7,fontWeight:"bold",color:COLORS.dark}}>Nguyen Dinh Duy</Text>
                        <Text style={{fontWeight:"600",marginTop:5}}>nguyendinhduy9602@gmail.com</Text>
                       </View>
                       <View style={{paddingTop:"10%"}}>
                          <TouchableOpacity style={{flexDirection:"row",marginHorizontal:20}}>
                                <Icon 
                                name="person-outline"
                                size={30}
                                />
                                <Text style={styles.text}>
                                        Edit Profile
                                </Text>
                          </TouchableOpacity>
                          <TouchableOpacity style={{flexDirection:"row",paddingTop:"7%",marginHorizontal:20}}>
                                <Icon
                                name="notifications-outline"
                                size={30}
                                />
                                <Text style={styles.text}>
                                        Notifications
                                </Text>
                          </TouchableOpacity>
                          <TouchableOpacity style={{flexDirection:"row",paddingTop:"7%",marginHorizontal:20}}>
                                <Icon
                                name="help-circle-outline"
                                size={30}
                                />
                                <Text style={styles.text}>
                                        Help
                                </Text>
                          </TouchableOpacity>
                          <TouchableOpacity style={{flexDirection:"row",paddingTop:"7%",marginHorizontal:20}}>
                                <Icon
                                name="eye-outline"
                                size={30}
                                />
                                <Text style={styles.text}>
                                        Dark Theme
                                </Text>
                                <Switch style={{paddingHorizontal:40}}
                               
                                />
                          </TouchableOpacity>
                          <TouchableOpacity 
                          style={{flexDirection:"row",paddingTop:"7%",marginHorizontal:20}}
                          onPress={()=>signOut()}
                          >
                                <Icon1
                                name="logout"
                                size={30}
                                style={{color:"red"}}
                                />
                                <Text style={[styles.text,{color:"red"}]}>
                                        Logout
                                </Text>
                          </TouchableOpacity>
                       </View>
                </View>
        )
}

const styles = StyleSheet.create({
        text:{
                fontSize:17,
                fontWeight:"600",
                marginTop:5,
                marginHorizontal:15
        }
})
