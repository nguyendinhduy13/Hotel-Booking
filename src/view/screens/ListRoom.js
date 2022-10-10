import React, { useState, useRef, useEffect } from 'react'
import Icon from "react-native-vector-icons/MaterialIcons";
import Icon1 from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/Feather';
import firestore from '@react-native-firebase/firestore';
import { TouchableOpacity, View, SafeAreaView, ScrollView, Text, Animated, Image, StyleSheet, Dimensions } from "react-native"
import COLORS from '../../consts/colors';
const width = Dimensions.get('screen').width;
const ListRoom = ({ navigation, route }) => {
        const item = route.params
        const [DataRoom, setDataRoom] = useState([])
        const [Pos, setPos] = useState(true)
        const [show, setShow] = useState(false)
        const Format = (number) => {
                return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
        };
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
        const handleShow = () => {
                setShow(!show)
        }

        return (
                <SafeAreaView style={{ backgroundColor: 'white' }}>

                        <View style={styles.HeaderBack}>
                                <Icon1 name="chevron-left" size={25} color='black' style={{}} onPress={() => navigation.goBack()} />
                                <View style={{ alignItems: 'center' }}>
                                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'orange' }}>{item.name}</Text>
                                        <Text>{item.location}</Text>
                                </View>
                                <Icon1 name={"bookmark-o"} size={25} color='black' style={{}} />
                        </View>
                        <ScrollView
                                // onScroll={e => {
                                //         PosY = e.nativeEvent.contentOffset.y,
                                //                 PosY < 260 ? setPos(true) : setPos(false)
                                // }}
                                scrollEventThrottle={16}
                                showsVerticalScrollIndicator={false}
                        >
                                <Image source={{ uri: item.image }} style={{ width: width, height: 300, resizeMode: 'cover' }} />
                                <View style={{ paddingHorizontal: 10, paddingBottom: 50 }}>
                                        <View style={{ borderBottomWidth: 1, borderBottomColor: COLORS.primary, paddingVertical: 10, }}>
                                                <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'black', paddingVertical: 10 }}>{item.name}</Text>
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                        <Icon1 name="star" size={20} color="orange" style={{ marginLeft: 2 }} />
                                                        <Text style={{ fontSize: 17, fontWeight: 'bold', paddingHorizontal: 5, color: 'black' }}>{item.review} <Text style={{ color: 'gray' }}>(n đánh giá)</Text></Text>
                                                </View>
                                                <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                                                        <Icon2 name="md-location-sharp" size={25} color="orange" style={{}} />
                                                        <View style={{ paddingHorizontal: 2 }}>
                                                                <Text style={{ color: 'black', fontSize: 15 }}><Text style={{ color: 'orange' }}>6.6km</Text> | {item.location}</Text>
                                                        </View>
                                                </View>
                                        </View>
                                        <View style={{ borderBottomWidth: 1, borderBottomColor: COLORS.primary, }}>
                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                                                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>Mô tả</Text>
                                                        <TouchableOpacity onPress={() => { handleShow() }}>
                                                                <Text style={{ fontSize: 15, color: COLORS.primary }}>More</Text>
                                                        </TouchableOpacity>
                                                </View>
                                                <Text style={{ color: 'black', fontSize: 15, paddingVertical: 10 }}>{item.description}</Text>
                                        </View>
                                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black', paddingVertical: 15 }}>Danh sách phòng</Text>
                                        {DataRoom.map((items, index) => (
                                                <View key={index}>
                                                        <TouchableOpacity style={styles.RecentlyBox} onPress={() => { navigation.navigate("DetailsScreen", items) }}>
                                                                <View style={{ width: "100%", height: 150, alignSelf: 'center' }}>
                                                                        <Image style={styles.IMGRecent} source={{ uri: items.image[0] }} />
                                                                </View>
                                                                <View style={{ marginTop: 35 }}>
                                                                        <View style={{ paddingHorizontal: 15 }}>
                                                                                <Text style={{ fontSize: 20, height: 25, color: "black" }}>{items.name}</Text>
                                                                                <Text style={{ fontSize: 18, paddingVertical: 10, fontWeight: "700", color: COLORS.primary }}>{
                                                                                        Format(items.price)
                                                                                } <Text style={{ fontSize: 14, color: 'gray' }}>VND/đêm</Text></Text>
                                                                        </View>
                                                                </View>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity style={{ position: 'absolute', backgroundColor: 'white', borderRadius: 20, top: 10, left: 335 }}>
                                                                <Icon3 name="info" size={26} color="orange" />
                                                        </TouchableOpacity>
                                                </View>
                                        ))}
                                </View>
                        </ScrollView>
                </SafeAreaView>
        )
}

const styles = StyleSheet.create({
        RecentlyBox: {
                width: "100%",
                height: 260,
                color: "black",
                backgroundColor: COLORS.white,
                marginBottom: 15,
                alignSelf: 'center',
                borderRadius: 10,
                elevation: 15,
                shadowColor: COLORS.black,

        },
        IMGRecent: {
                height: '100%',
                width: '100%',
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                alignItems: 'center',
        },
        HeaderBack: {
                width: width,
                height: 50,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 10,
                borderStyle: 'solid',
                borderBottomWidth: 1,
                borderColor: '#e0e0e0',
                elevation: 10,
                shadowColor: COLORS.black,
                backgroundColor: 'white'

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

