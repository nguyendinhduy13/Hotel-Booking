import React, { useState, useRef, useEffect } from 'react'
import Icon from "react-native-vector-icons/MaterialIcons";
import Icon1 from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Ionicons'
import firestore from '@react-native-firebase/firestore';
import { TouchableOpacity, View, SafeAreaView, ScrollView, Text, Animated, Image, StyleSheet, Dimensions } from "react-native"
import COLORS from '../../consts/colors';
const width = Dimensions.get('screen').width;
const ListRoom = ({ navigation, route }) => {
        const item = route.params
        const [DataRoom, setDataRoom] = useState([])
        const [Pos, setPos] = useState(true)
        let PosY = 0
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
                <SafeAreaView style={{ backgroundColor: 'white' }}>

                        <View style={styles.HeaderBack}>
                                <Icon1 name="chevron-left" size={25} color={!Pos ? COLORS.primary : 'white'} style={{}} onPress={() => navigation.goBack()} />
                                <Icon1 name={"bookmark"} size={25} color={!Pos ? COLORS.primary : 'white'} style={{}} />
                        </View>
                        <ScrollView
                                onScroll={e => {
                                        PosY = e.nativeEvent.contentOffset.y,
                                                PosY < 260 ? setPos(true) : setPos(false)
                                }}
                                scrollEventThrottle={16}
                                style={{ padding: 10 }}
                        >
                                <Image source={{ uri: item.image }} style={{ width: width, height: 300, resizeMode: 'cover' }} />
                                <View style={{ borderBottomWidth: 1, borderBottomColor: COLORS.primary, paddingVertical: 10 }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Icon1 name="star" size={20} color="orange" style={{}} />
                                                <Text style={{ fontSize: 17, fontWeight: 'bold', paddingHorizontal: 5, color: 'black' }}>{item.review} <Text style={{ color: 'gray' }}>(n đánh giá)</Text></Text>
                                        </View>
                                        <Text style={{ fontSize: 25, fontWeight: '400', color: 'black', paddingVertical: 10 }}>{item.name}</Text>
                                        <View style={{ flexDirection: 'row' }}>
                                                <Icon2 name="md-location-sharp" size={25} color="orange" style={{}} />
                                                <View style={{ paddingHorizontal: 2 }}>
                                                        <Text style={{ color: 'black', fontSize: 15 }}><Text style={{ color: 'orange' }}>6.6km</Text> | {item.location}</Text>
                                                </View>
                                        </View>
                                </View>
                                <View style={{ borderBottomWidth: 1, borderBottomColor: COLORS.primary, }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between',marginTop:10}}>
                                                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>Mô tả</Text>
                                        </View>
                                        <Text style={{ color: 'black', fontSize: 15, paddingVertical: 10 }}>{item.description}</Text>
                                </View> 
                                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black',marginTop:10 }}>Danh sách phòng</Text>
                                {DataRoom.map((items, index) => (
                                        <View>
                                                <TouchableOpacity style={styles.RecentlyBox} key={index} onPress={() => { }}>
                                                        <View style={{ width: "98%", height: 200, alignSelf: 'center' }}>
                                                                <Image style={styles.IMGRecent} source={{ uri: items.image[0] }} />
                                                        </View>
                                                        <View style={{ marginTop: 25 }}>
                                                                <View style={{ paddingHorizontal: 20 }}>
                                                                        <Text style={{ fontSize: 20, height: 25, color: "black" }}>{items.name}</Text>
                                                                        <Text style={{ fontSize: 20, paddingVertical: 10, fontWeight: "700", color: COLORS.primary }}>{items.price} <Text style={{ fontSize: 14, color: 'gray' }}>VND/đêm</Text></Text>
                                                                </View>
                                                        </View>
                                                </TouchableOpacity>
                                                <Icon name="bookmark-border" size={26} style={{ position: 'absolute', top: 265, left: 330 }} color={COLORS.black} />
                                        </View>
                                ))}
                        </ScrollView>
                </SafeAreaView>
        )
}

const styles = StyleSheet.create({
        RecentlyBox: {
                width: "100%",
                height: 300,
                color: "black",
                backgroundColor: COLORS.white,
                marginBottom: 15,
                alignSelf: 'center',
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
                elevation: 15,
                shadowColor: COLORS.black,

        },
        IMGRecent: {
                height: '100%',
                width: '100%',
                borderRadius: 10,
                alignItems: 'center',
                marginTop: 20
        },
        HeaderBack: {
                width: width,
                height: 50,
                paddingHorizontal: 15,
                position: 'absolute',
                zIndex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
        },
        HeaderTitle: {
                width: width,
                height: 50,
                paddingHorizontal: 15,
                position: 'absolute',
                zIndex: 1,
                backgroundColor: 'white',
                elevation: 20,
        },
})

export default ListRoom

