import React from "react";
import { ImageBackground, ScrollView,Text,StyleSheet, StatusBar,View, TouchableOpacity,Image } from "react-native";
import COLORS from "../../consts/colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import Icon1 from "react-native-vector-icons/FontAwesome5"
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons"
import Icon3 from "react-native-vector-icons/FontAwesome"

export default function DetailsScreen({navigation,route}) {
        const item=route.params
        return(
                <ScrollView contentContainerStyle={{
                        backgroundColor: COLORS.white,
                        paddingBottom:20,
                }}> 
                <StatusBar barStyle="light-content" translucent backgroundColor="rgba(0,0,0,0)"/>
                <ImageBackground style={styles.headerImage}
                 source={{uri:item.image[0]}}>
                        <View style={styles.header}>
                                <Icon name="arrow-back-ios" size={28} color={COLORS.white} onPress={navigation.goBack}/>
                                <Icon name="bookmark-border" size={28} color={COLORS.white} />
                        </View>
                </ImageBackground>
                <View>
                        <View style={{marginTop:15,paddingHorizontal:20}}>
                                <Text style={{fontSize:27,fontWeight:"bold",color:COLORS.dark}}>{item.name}</Text>
                                <View style={{flexDirection:"row",marginTop:10}}>
                                 <Icon name="location-pin" size={25} color={COLORS.primary}/>
                                <Text style={{fontSize:14,fontWeight:"600",color:COLORS.black,marginTop:4,marginHorizontal:7}}>{item.location}</Text>
                                </View>
                                <View style={{height:0.25,backgroundColor:COLORS.grey,marginTop:20}}/>
                                <View style={{paddingTop:"10%"}}>
                                        <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                                                <Text style={{fontSize:18,color:COLORS.dark,fontWeight:"bold"}}>Gallery Photos</Text>
                                                <TouchableOpacity onPress={()=>navigation.navigate("HotelPhotos",item)}>
                                                <Text style={{fontSize:18,fontWeight:"bold",color:COLORS.primary}}>See All</Text>
                                                </TouchableOpacity>
                                        </View>
                                        <View style={{paddingTop:"5%"}}>
                                                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                                        {item.image.map((image,index)=>(
                                                        <Image
                                                         source={{uri:image}}
                                                         style={{width:160,height:115,borderRadius:20,marginHorizontal:10}}
                                                        />
                                                        ))}
                                                </ScrollView>
                                        </View>
                                </View>
                                <View style={{paddingTop:"7%"}}>
                                        <Text style={{fontSize:18,color:COLORS.dark,fontWeight:"bold"}}>Details</Text>
                                </View>
                                <View style={{flexDirection:"row",paddingTop:"5%",marginHorizontal:18,justifyContent:"space-between"}}>
                                        <View style={{flexDirection:"column",alignItems:"center"}}>
                                                <Icon1 
                                                name="hotel"
                                                size={30}
                                                color={COLORS.primary}
                                                />
                                                <Text style={{fontWeight:"400",color:COLORS.black,fontSize:13,marginTop:5}}>Hotels</Text>
                                        </View>
                                        <View style={{flexDirection:"column",alignItems:"center"}}>
                                                <Icon1 
                                                name="bed"
                                                size={30}
                                                color={COLORS.primary}
                                                />
                                                <Text style={{fontWeight:"400",color:COLORS.black,fontSize:13,marginTop:5}}>Bedrooms</Text>
                                        </View>
                                        <View style={{flexDirection:"column",alignItems:"center"}}>
                                                <Icon1 
                                                name="bath"
                                                size={30}
                                                color={COLORS.primary}
                                                />
                                                <Text style={{fontWeight:"400",color:COLORS.black,fontSize:13,marginTop:5}}>Bathrooms</Text>
                                        </View>
                                        <View style={{flexDirection:"column",alignItems:"center"}}>
                                                <Icon2 
                                                name="social-distance-6-feet"
                                                size={30}
                                                color={COLORS.primary}
                                                />
                                                <Text style={{fontWeight:"400",color:COLORS.black,fontSize:13,marginTop:5}}>Hotels</Text>
                                        </View>
                                </View>
                                <View style={{paddingTop:"5%"}}>
                                      <View>
                                        <Text style={{fontSize:18,color:COLORS.dark,fontWeight:"bold"}}>Description</Text>
                                        </View>  
                                        <View style={{marginTop:12}}>
                                        <Text style={{lineHeight:20,color:COLORS.black}}>
                                                {item.detail}
                                        </Text>
                                </View>
                                </View>
                        <View style={{paddingTop:10}}>
                                <View>
                                        <Text style={{fontSize:18,color:COLORS.dark,fontWeight:"bold"}}>Location</Text>
                                </View>
                        </View>
                        <View style={{paddingTop:10,flexDirection:"row",justifyContent:"space-between"}}>
                                <View style={{flexDirection:"row"}}>
                                        <Text style={{fontSize:18,color:COLORS.dark,fontWeight:"bold"}}>Review</Text>
                                        <View style={{flexDirection:"row", marginHorizontal:10,marginTop:3}}>
                                        <Icon3
                                        name="star"
                                        size={20}
                                        style={{color:COLORS.orange}}
                                        />    
                                        <Text style={{color:COLORS.black,marginHorizontal:5}}>4.8 (4981 reviews)</Text>
                                       </View>
                                </View>
                                <View>
                                   <Text style={{fontSize:18,fontWeight:"bold",color:COLORS.primary}}>See All</Text>
                                </View> 
                        </View>
                        <View style={{paddingTop:10,flexDirection:"row",justifyContent:"space-between"}}>
                                <Text style={{fontSize:18,color:COLORS.dark,fontWeight:"bold",marginTop:2}}>
                                        Price per night
                                </Text>
                                <Text style={{fontSize:22,fontWeight:"bold",color:COLORS.primary}}>
                                        VNĐ {item.price}
                                </Text> 
                        </View>
                        <TouchableOpacity style={{alignItems:"center",paddingTop:"4%"}}>
                                <View style={{backgroundColor:COLORS.primary,width:"80%",height:47,justifyContent:"center",borderRadius:18}}>
                                <Text style={{fontSize:18,color:COLORS.white,textAlign:"center",fontWeight:"bold"}}>Book Now !</Text>
                                </View>
                        </TouchableOpacity>
                        </View>
                </View>
                </ScrollView>
        )
}

const styles=StyleSheet.create({
        headerImage:{
                height:400,
                borderBottomRightRadius:40,
                borderBottomLeftRadius:40,
                overflow:"hidden",
        },
        header:{
                marginTop:60,
                flexDirection:"row",
                alignItems:"center",
                marginHorizontal:20,
                justifyContent:"space-between",
        },
        iconContainer:{
                position:"absolute",
                height:60,
                width:60,
                backgroundColor:COLORS.primary,
                top:-30,
                right:20,
                borderRadius:30,
                justifyContent:"center",
                alignItems:"center",                
        },
        priceTag:{
                height:40,
                alignItems:"center",
                marginLeft:40,
                paddingLeft:20,
                flex:1,
                backgroundColor:COLORS.secondary,
                borderTopLeftRadius:20,
                borderBottomLeftRadius:20,
                flexDirection:"row"
        },
        btn:{
              height:55,
              justifyContent:"center",
              alignItems:"center",
              marginTop:40,
              backgroundColor:COLORS.primary,
              marginHorizontal:20,
              borderRadius:10
        }
})