import React from "react";
import { ImageBackground, ScrollView,Text,StyleSheet, StatusBar,View } from "react-native";
import COLORS from "../../consts/colors";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function DetailsScreen({navigation,route}) {
        const item=route.params
        return(
                <ScrollView contentContainerStyle={{
                        backgroundColor: COLORS.white,
                        paddingBottom:20,
                }}> 
                <StatusBar barStyle="light-content" translucent backgroundColor="rgba(0,0,0,0)"/>
                <ImageBackground style={styles.headerImage}
                 source={{uri:item.image}}>
                        <View style={styles.header}>
                                <Icon name="arrow-back-ios" size={28} color={COLORS.white} onPress={navigation.goBack}/>
                                <Icon name="bookmark-border" size={28} color={COLORS.white} />
                        </View>
                </ImageBackground>
                <View>
                        <View style={styles.iconContainer}>
                                <Icon name="place" color={COLORS.white} size={28}/>
                        </View>
                        <View style={{marginTop:20,paddingHorizontal:20}}>
                                <Text style={{fontSize:20,fontWeight:"bold",color:COLORS.dark}}>{item.name}</Text>
                                <Text style={{fontSize:12,fontWeight:"400",color:COLORS.grey,marginTop:5}}>{item.location}</Text>
                                <View style={{marginTop:10,justifyContent:"space-between",flexDirection:"row"}}>
                                        <View style={{flexDirection:"row"}}>
                                                <View style={{flexDirection:"row"}}>
                                                <Icon name="star" color={COLORS.orange} size={20}/>
                                                <Icon name="star" color={COLORS.orange} size={20}/>
                                                <Icon name="star" color={COLORS.orange} size={20}/>
                                                <Icon name="star" color={COLORS.orange} size={20}/>
                                                <Icon name="star" color={COLORS.grey} size={20}/>
                                                </View>
                                                <Text style={{fontWeight:"bold",fontSize:18,marginLeft:5}}>4.0</Text>
                                        </View>
                                     <Text style={{fontSize:13,color:COLORS.grey}}>365 reviews</Text>
                                </View>
                                <View style={{marginTop:20}}>
                                        <Text style={{lineHeight:20,color:COLORS.grey}}>
                                                {item.detail}
                                        </Text>
                                </View>
                        </View>
                        <View style={{margintop:20,flexDirection:"row",justifyContent:"space-between",paddingLeft:20, alignItems:"center",paddingTop:15}}>
                                <Text style={{fontSize:19,fontWeight:"bold",color:COLORS.dark}}>
                                        Price per night
                                </Text>
                                <View style={styles.priceTag}>
                                        <Text style={{fontSize:12,fontWeight:"bold",color:COLORS.grey}}>
                                                VNĐ {item.price}
                                        </Text>
                                        <Text style={{fontSize:12,fontWeight:"bold",color:COLORS.grey}}>
                                                +breakfast
                                        </Text>
                                </View>
                        </View>
                        <View style={styles.btn}>
                                <Text style={{color:COLORS.white,fontSize:18,fontWeight:"bold"}}>Book Now</Text>
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