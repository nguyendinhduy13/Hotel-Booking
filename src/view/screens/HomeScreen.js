import React, { useRef, useState, useEffect } from "react";
import { SafeAreaView, Text, StyleSheet, View, ScrollView, Alert, TextInput, TouchableOpacity, FlatList, Dimensions, Image, Animated, LogBox, Modal } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Icon1 from "react-native-vector-icons/MaterialCommunityIcons";
import Icon2 from "react-native-vector-icons/Entypo";
import Icon3 from "react-native-vector-icons/Feather";
import Icon4 from "react-native-vector-icons/Ionicons";
import Icon5 from "react-native-vector-icons/EvilIcons";
import COLORS from "../../consts/colors";
import firestore, { firebase } from '@react-native-firebase/firestore';
import auth from "@react-native-firebase/auth"
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get('screen');
const cardWidth = width / 1.8
export default function HomeScreen({ navigation }) {
        const [ListHotelData, setListHotelData] = useState([]);
        useEffect(() => {
                firestore()
                        .collection("ListHotel")
                        .doc("ListHotel")
                        .get()
                        .then(documentSnapshot => {
                                setListHotelData(documentSnapshot.data().ListHotel)
                        })
        }, [])
        const [isShow, setIsShow] = useState(false);
        const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
        const [activeCardIndex, setActiveCardIndex] = useState(0);
        const scrollX = useRef(new Animated.Value(0)).current;
        const [countShow, setCountShow] = useState(0);
        const user = auth().currentUser;
        const [modalVisible, setModalVisible] = useState(false);

        const Card = ({ hotel, index }) => {
                const inputRange = [(index - 1) * cardWidth, index * cardWidth, (index + 1) * cardWidth];
                const opacity = scrollX.interpolate({ inputRange, outputRange: [0.7, 0, 0.7] });
                const scale = scrollX.interpolate({ inputRange, outputRange: [0.8, 1, 0.8] });
                return (
                        <View>
                                <TouchableOpacity disabled={activeCardIndex != index} activeOpacity={1} onPress={() => navigation.navigate("ListRoom", hotel)}>
                                        <Animated.View style={{ ...styles.card, transform: [{ scale }] }}>
                                                <Animated.View style={{ ...styles.cardOverplay, opacity }} />
                                                <View style={styles.priceTag}>
                                                        <Icon name="star" size={15} color={COLORS.orange} />
                                                        <Text style={{ color: 'white', fontWeight: 'bold' }}>4.8</Text>
                                                </View>
                                                <Image source={{ uri: hotel.image }} style={styles.cardImage} />
                                                <View style={styles.cardDetails}>
                                                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
                                                                <View>
                                                                        <View style={{ height: 20 }}><Text style={{ fontWeight: "bold", fontSize: 17, color: COLORS.white }}>{hotel.name}</Text></View>
                                                                        <View style={{ marginTop: 5 }}><Text style={{ fontSize: 14, color: COLORS.white }}>{hotel.location}</Text></View>
                                                                </View>
                                                        </View>

                                                </View>

                                        </Animated.View>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                        <Icon style={{ position: 'absolute', top: -42, left: 170 }} name="bookmark-border" size={26} color={COLORS.white} />
                                </TouchableOpacity>
                        </View>
                )
        }
        const TopHotelCard = ({ hotel, index }) => {
                if (index < 3) {
                        return (
                                <TouchableOpacity style={styles.topHotelCard} onPress={() => navigation.navigate("ListRoom", hotel)}>
                                        <View style={{ position: "absolute", top: 5, right: 10, zIndex: 1, flexDirection: "row", alignItems: 'center', }}>
                                                <Icon name="star" size={15} color={COLORS.orange} />
                                                <Text style={{ color: COLORS.white, fontWeight: "bold", fontSize: 15, marginLeft: 3 }}>5.0</Text>
                                        </View>
                                        <Image style={styles.topHotelCardImage} source={{ uri: hotel.image }} />
                                        <View style={{ paddingHorizontal: 10, paddingVertical: 5 }}>
                                                <Text style={{ fontsize: 17, fontWeight: "bold", color: COLORS.dark, height: 30 }}>{hotel.name}</Text>
                                                <View style={{ flexDirection: 'row', height: 35, }}>
                                                        <Image
                                                                style={{ width: 20, height: 20, resizeMode: "cover", alignSelf: 'center' }}
                                                                source={{ uri: 'https://cdn2.iconfinder.com/data/icons/picons-basic-2/57/basic2-059_pin_location-256.png' }} />
                                                        <Text style={{ fontSize: 14, paddingHorizontal: 3, fontWeight: "bold", color: COLORS.grey, alignSelf: 'center' }}>{hotel.location}</Text>
                                                </View>
                                        </View>
                                </TouchableOpacity>
                        )
                }
        }
        const RecentlyBookedCard = ({ hotel }) => {
                return (
                        <View>
                                <TouchableOpacity style={styles.RecentlyBox} onPress={() => navigation.navigate("ListRoom", hotel)}>
                                        <View style={{ width: 120, height: 120 }}>
                                                <Image style={styles.IMGRecent} source={{ uri: hotel.image }} />
                                        </View>
                                        <View>
                                                <View style={{ marginTop: 10, flexDirection: 'row' }}>
                                                        <View style={{ width: 200 }}>
                                                                <View style={{ width: 120, height: 29 }}>
                                                                        <Text style={{ fontSize: 17, fontWeight: 'bold', color: "black" }}>{hotel.name}</Text>
                                                                </View>
                                                                <View style={{ height: 40, justifyContent: 'center' }}>
                                                                        <Text style={{ fontSize: 15, }}>{hotel.location}</Text>
                                                                </View>
                                                        </View>
                                                </View>
                                                <View style={{ flexDirection: 'row', width: 180, paddingVertical: 10 }}>
                                                        <View style={{ flexDirection: 'row', alignItems: 'center', width: 160 }}>
                                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                                        <Icon name="star" size={15} color={COLORS.orange} />
                                                                        <Text style={{ color: COLORS.primary, fontWeight: "bold", fontSize: 15, marginLeft: 5 }}>5.0</Text>
                                                                </View>
                                                                <Text style={{ marginLeft: 15, }}>(5 reviews)</Text>
                                                        </View>
                                                </View>
                                        </View>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                        <Icon name="bookmark-border" size={26} style={{ marginLeft: 35, top: -50, left: 300, position: 'absolute' }} color="black" />
                                </TouchableOpacity>
                        </View>
                )
        }
        const textInput = useRef(0)
        const [data, setData] = useState([])
        const [search, setSearch] = useState("")
        const handleSearch = (text) => {
                if (text) {
                        const newData = ListHotelData.filter(item => {
                                const itemData = item.name ?
                                        item.name.toUpperCase()
                                        : ''.toUpperCase();
                                const textData = text.toUpperCase();
                                return itemData.indexOf(textData) > -1;
                        });
                        setData(newData);
                        setSearch(text);
                } else {
                        setData([]);
                        setSearch("");
                }
        }

        const [historySearch, setHistorySearch] = useState([])
        const readItemFromStorage = async newValue => {
                const value = await AsyncStorage.getItem('hotel')
                setHistorySearch(JSON.parse(value))
        };
        useEffect(() => {
                readItemFromStorage();
        }, []);
        const addItemToSearchHistory = async (item) => {
                const value = await AsyncStorage.getItem('hotel')
                const arr = JSON.parse(value)
                if (arr) {
                        const index = arr.findIndex((e) => e.id === item.id)
                        if (index === -1) {
                                arr.push(item)
                        }
                        else {
                                arr.splice(index, 1)
                                arr.push(item)
                        }
                }
                await AsyncStorage.setItem('hotel', JSON.stringify(arr))
                readItemFromStorage()
        }
        const removeItemFromSearchHistory = async (item) => {
                const value = await AsyncStorage.getItem('hotel')
                const arr = JSON.parse(value)
                if (arr) {
                        const index = arr.findIndex((e) => e.id === item.id)
                        if (index !== -1) {
                                arr.splice(index, 1)
                        }
                }
                await AsyncStorage.setItem('hotel', JSON.stringify(arr))
                readItemFromStorage()
        }
        const navigateTo = (item) => {
                navigation.navigate("ListRoom", item)
                setModalVisible(false)
                // setData([])
                // setSearch("")
                addItemToSearchHistory(item)
        }
        const ShowModal = async () => {
                setModalVisible(true)
        }
        return (
                <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
                        <View style={{ paddingHorizontal: 20, height: 100, }}>
                                <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Image source={require("../../assets/logo.png")} style={{ width: 30, height: 30, resizeMode: 'cover' }} />
                                                <Text style={{ marginLeft: 10, fontSize: 18, fontWeight: '700', color: 'black' }}>App Name</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <TouchableOpacity onPress={(() => { ShowModal() })}>
                                                        <Icon5 name="search" size={32} color="#FF6347" style={{ paddingRight: 10, height: isShow ? 'auto' : 0 }} />
                                                </TouchableOpacity>
                                                <Icon1 name="bell-ring-outline" size={26} color={COLORS.grey} />
                                        </View>
                                </View>
                                <View style={{ marginTop: 15 }}>
                                        <Text style={{ fontWeight: 'bold', fontSize: 28, color: 'black' }}>Hello, {auth().currentUser.displayName}
                                                < Icon1
                                                        name="hand-wave-outline"
                                                        size={26}
                                                        color={"#FF6347"}
                                                        style={{ marginLeft: 10 }}
                                                />
                                        </Text>
                                </View>
                        </View>
                        <ScrollView
                                showsHorizontalScrollIndicator={false}
                                style={{ height: "100%" }}
                                onScroll={(e) => {
                                        if (e.nativeEvent.contentOffset.y > 30) {
                                                setIsShow(true)
                                        } else {
                                                setIsShow(false)
                                        }
                                }}
                        >
                                <TouchableOpacity onPress={(() => { ShowModal() })}>
                                        <View style={styles.searchInputContainer}>
                                                <Icon5 name="search"
                                                        size={30}
                                                        style={{ marginLeft: 10 }}
                                                        color="#FF6347"
                                                />
                                                <Text style={{ fontSize: 17, paddingLeft: 10 }}>Tìm địa điểm, khách sạn</Text>
                                        </View>
                                </TouchableOpacity>
                                <View>
                                        <Animated.FlatList
                                                onMomentumScrollEnd={(e) => {
                                                        setActiveCardIndex(
                                                                Math.round(e.nativeEvent.contentOffset.x / cardWidth)
                                                        )
                                                }}
                                                onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: true })}
                                                data={ListHotelData}
                                                horizontal
                                                contentContainerStyle={{ paddingVertical: 30, paddingLeft: 20, paddingRight: cardWidth / 2 - 40 }}
                                                showsHorizontalScrollIndicator={false}
                                                renderItem={({ item, index }) =>
                                                        <Card
                                                                hotel={item}
                                                                index={index}
                                                        />
                                                }
                                                snapToInterval={cardWidth}
                                        />
                                </View>
                                <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 20 }}>
                                        <Text style={{ fontWeight: "bold", color: "black", fontSize: 16 }}>Top Hotels</Text>
                                        <TouchableOpacity onPress={() => { navigation.navigate("Test") }}>
                                                <Text style={{ fontWeight: "bold", color: COLORS.primary }}>See All</Text>
                                        </TouchableOpacity>
                                </View>
                                <FlatList horizontal
                                        data={ListHotelData}
                                        showsHorizontalScrollIndicator={false}
                                        contentContainerStyle={{ paddingLeft: 10, marginTop: 20, paddingBottom: 30 }}
                                        renderItem={({ item, index }) => <TopHotelCard hotel={item} index={index} />}
                                />
                                <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 20 }}>
                                        <Text style={{ fontWeight: "bold", color: "black", fontSize: 16 }}>Recently Booked</Text>
                                        <TouchableOpacity>
                                                <Text style={{ fontWeight: "bold", color: COLORS.primary }}>See All</Text>
                                        </TouchableOpacity>
                                </View>


                                <View>
                                        {ListHotelData.map((item, index) =>
                                        (<View key={index}>
                                                <RecentlyBookedCard hotel={item} />
                                        </View>)
                                        )}
                                </View>
                        </ScrollView>
                        <Modal
                                animationType="slide"
                                transparent={true}
                                visible={modalVisible}
                                onRequestClose={() => {
                                        setModalVisible(!modalVisible);
                                }}>
                                <View style={styles.centeredView}>
                                        <View style={styles.modalView}>
                                                <View style={styles.generalView}>
                                                        <View style={{ flexDirection: 'row', marginTop: 15, alignItems: 'center', }}>
                                                                <TouchableOpacity onPress={() => { setModalVisible(!modalVisible) }}>
                                                                        <Icon4 name="chevron-back-outline"
                                                                                size={30}
                                                                                style={{ marginLeft: 10 }}
                                                                                color="#FF6347"
                                                                        />
                                                                </TouchableOpacity>
                                                                <View style={styles.searchInputContainer1}>
                                                                        <TouchableOpacity onPress={() => { }}>
                                                                                <Icon5 name="search"
                                                                                        size={30}
                                                                                        style={{ marginLeft: 10 }}
                                                                                        color="#FF6347"
                                                                                />
                                                                        </TouchableOpacity>
                                                                        <TextInput
                                                                                style={{ fontSize: 17, paddingLeft: 10 }}
                                                                                placeholder="Tìm địa điểm, khách sạn"
                                                                                autoFocus={true}
                                                                                ref={textInput}
                                                                                value={search}
                                                                                onChangeText={(text) => { handleSearch(text) }}
                                                                        />
                                                                </View>
                                                        </View>

                                                        {data.length > 0 ?
                                                                <></> :
                                                                <View>
                                                                        {historySearch.length > 0 ?
                                                                                <Text style={{ marginLeft: 20, marginTop: 10, marginBottom: 10, fontSize: 16, fontWeight: 'bold' }}>Ghé thăm gần đây</Text>
                                                                                : <></>}
                                                                        {
                                                                                historySearch.map((item, index) => (
                                                                                        <TouchableOpacity
                                                                                                key={index}
                                                                                                style={{ flexDirection: 'row', height: 50, borderBottomWidth: 1, borderBottomColor: '#C8D8C3', alignItems: 'center', width: '90%', alignSelf: 'center', marginBottom: 12 }}
                                                                                                onPress={() => { navigateTo(item) }}
                                                                                        >
                                                                                                <Image source={{ uri: item.image }} style={{ width: 30, height: 30, resizeMode: 'cover' }} />
                                                                                                <View>
                                                                                                        <Text style={{ marginLeft: 10, fontSize: 17, height: 22, color: 'black', fontWeight: 'bold' }}>{item.name}</Text>
                                                                                                        <Text style={{ marginLeft: 10, fontSize: 15, height: 20 }}>{item.location}</Text>
                                                                                                </View>
                                                                                                <TouchableOpacity style={{ position: 'absolute', right: 0, }} onPress={() => { removeItemFromSearchHistory(item) }}>
                                                                                                        <Icon5 name='close' size={22} style={{ color: 'black' }} />
                                                                                                </TouchableOpacity>
                                                                                        </TouchableOpacity>
                                                                                )).reverse()
                                                                        }
                                                                </View>
                                                        }

                                                        {data.length > 0 ?
                                                                <ScrollView>
                                                                        <Text style={{ marginLeft: 20, marginTop: 10, marginBottom: 10, fontSize: 16, fontWeight: 'bold' }}>Khách sạn</Text>
                                                                        {data.map((item, index) =>
                                                                                <TouchableOpacity key={index} style={{ paddingBottom: 20 }} onPress={() => navigateTo(item)}>
                                                                                        <View style={styles.ModalBoxes}>
                                                                                                <Image source={{ uri: item.image }} style={{ width: 75, height: 75, marginLeft: 7.5, borderRadius: 10, }} />
                                                                                                <View style={{ height: 70, paddingHorizontal: 7, width: '79%' }}>
                                                                                                        <Text style={{ fontSize: 17, fontWeight: 'bold', color: 'black' }}>{item.name}</Text>
                                                                                                        <Text style={{ height: 40, lineHeight: 20, marginTop: 10, }}>{item.location}</Text>
                                                                                                </View>
                                                                                        </View>
                                                                                </TouchableOpacity>
                                                                        )}
                                                                </ScrollView>
                                                                :
                                                                <></>}
                                                </View>
                                        </View>
                                </View>
                        </Modal>
                </SafeAreaView >
        )
}

const styles = StyleSheet.create({
        header: {
                margintop: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 20,
        },
        searchInputContainer: {
                height: 45,
                backgroundColor: "white",
                marginTop: 5,
                marginLeft: 20,
                marginRight: 20,
                borderRadius: 10,
                flexDirection: "row",
                alignItems: "center",
                borderWidth: 1,
                borderColor: "#dddddd",
        },
        searchInputContainer1: {
                width: '83%',
                height: 45,
                marginLeft: 5,
                backgroundColor: "white",
                borderRadius: 10,
                flexDirection: "row",
                alignItems: "center",
                borderWidth: 1,
                borderColor: "#dddddd",
        },
        card: {
                height: 280,
                width: cardWidth,
                elevation: 15,
                marginRight: 20,
                borderRadius: 35,
                backgroundColor: COLORS.white,
        },
        cardImage: {
                height: "100%",
                width: '100%',
                borderRadius: 35
        },
        priceTag: {
                height: 27,
                width: 65,
                borderRadius: 35,
                backgroundColor: COLORS.primary,
                position: "absolute",
                zIndex: 1,
                right: 20,
                top: 25,
                justifyContent: "space-evenly",
                alignItems: "center",
                flexDirection: 'row',
        },
        cardDetails: {
                height: 100,
                borderRadius: 15,
                position: "absolute",
                bottom: 0,
                paddingLeft: 20,
                width: '100%',
        },
        cardOverplay: {
                height: 280,
                backgroundColor: COLORS.white,
                position: "absolute",
                zIndex: 100,
                width: cardWidth,
                borderRadius: 35,
        },
        topHotelCard: {
                height: 180,
                width: 200,
                backgroundColor: COLORS.white,
                elevation: 10,
                marginHorizontal: 10,
                borderRadius: 15,
        },
        topHotelCardImage: {
                height: 100,
                width: "100%",
                borderTopRightRadius: 15,
                borderTopLeftRadius: 15
        },
        RecentlyBox: {
                width: "90%",
                height: 120,
                color: "black",
                backgroundColor: COLORS.white,
                marginBottom: 10,
                marginTop: 10,
                alignSelf: 'center',
                borderRadius: 20,
                elevation: 15,
                flexDirection: 'row'
        },
        IMGRecent: {
                height: 95,
                width: 95,
                borderRadius: 20,
                alignSelf: 'center',
                marginTop: 12,
        },
        PriceShow:
        {
                flexDirection: 'row',
                position: 'absolute',
                top: cardWidth + 15,
                left: cardWidth / 2 - 90,
                justifyContent: 'space-between',
                marginTop: 5,
                alignItems: 'center'
        },
        centeredView: {
                flex: 1,
                alignItems: "center",
                justifyContent: 'flex-end'
        },
        modalView: {
                backgroundColor: '#f4eded',
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                alignItems: "center",
                shadowColor: "#000",
                shadowOffset: {
                        width: 0,
                        height: 2
                },
                shadowOpacity: 0.75,
                shadowRadius: 10,
                elevation: 5,
                width: "100%",
                height: "100%",
        },
        generalView: {
                width: '100%',
                height: '100%',
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15,
                backgroundColor: 'white',
        },
        ModalBoxes: {
                flexDirection: 'row',
                width: '90%',
                backgroundColor: 'white',
                height: 90,
                alignSelf: 'center',
                borderRadius: 10,
                alignItems: 'center',
                borderWidth: 1.25,
                borderColor: '#dddddd'
        }
})