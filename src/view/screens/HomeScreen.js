import React, { useRef, useState,useEffect } from "react";
import { SafeAreaView, Text, StyleSheet, View, ScrollView, TextInput, TouchableOpacity, FlatList, Dimensions, Image, Animated, LogBox } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Icon1 from "react-native-vector-icons/MaterialCommunityIcons";
import Icon2 from "react-native-vector-icons/Entypo";
import Icon3 from "react-native-vector-icons/Feather";
import Icon4 from "react-native-vector-icons/Ionicons";
import COLORS from "../../consts/colors";
import firestore, { firebase } from '@react-native-firebase/firestore';
import auth from "@react-native-firebase/auth"

const { width } = Dimensions.get('screen');
const cardWidth = width / 1.8
export default function HomeScreen({ navigation }) {
        const [ListHotelData, setListHotelData] = useState([])
        useEffect(()=>{
                firestore()
                .collection("ListHotel")
                .doc("ListHotel")
                .get()
                .then(documentSnapshot=>{
                       setListHotelData(documentSnapshot.data().ListHotel)
                })
        },[])

        const categories = ['All', 'Popular', 'Top Rated', 'Featured', 'Luxury'];
        const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
        const [activeCardIndex, setActiveCardIndex] = useState(0);
        const scrollX = useRef(new Animated.Value(0)).current;
        const [countShow, setCountShow] = useState(0);
        const user = auth().currentUser;
        const CategoryList = ({ navigation }) => {

                return (
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', backgroundColor: "#fff2cc", width: 360, height: 140, alignSelf: 'center', borderRadius: 20, paddingBottom: 5, marginTop: 20 }}>
                                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                        <TouchableOpacity>
                                                <View style={{ alignItems: 'center', paddingTop: 10 }}>
                                                        <Icon2 name="hour-glass" size={25} color={COLORS.orange} />
                                                        <Text style={{ paddingTop: 5, fontSize: 15, fontWeight: 'bold' }}>Theo giờ</Text>
                                                </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity>
                                                <View style={{ alignItems: 'center', paddingTop: 10 }}>
                                                        <Icon1 name="heart-multiple-outline" size={25} color={COLORS.orange} />
                                                        <Text style={{ paddingTop: 5, fontSize: 15, fontWeight: 'bold' }}>Tình yêu</Text>
                                                </View>
                                        </TouchableOpacity>
                                </View>
                                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                        <TouchableOpacity>
                                                <View style={{ alignItems: 'center', paddingTop: 10 }}>
                                                        <Icon3 name="moon" size={25} color={COLORS.orange} />
                                                        <Text style={{ paddingTop: 5, fontSize: 15, fontWeight: 'bold' }}>Theo đêm</Text>
                                                </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity>
                                                <View style={{ alignItems: 'center', paddingTop: 10 }}>
                                                        <Icon1 name="airplane-marker" size={25} color={COLORS.orange} />
                                                        <Text style={{ paddingTop: 5, fontSize: 15, fontWeight: 'bold' }}>Du lịch</Text>
                                                </View>
                                        </TouchableOpacity>
                                </View>
                                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                        <TouchableOpacity>
                                                <View style={{ alignItems: 'center', paddingTop: 10 }}>
                                                        <Icon4 name="today" size={25} color={COLORS.orange} />
                                                        <Text style={{ paddingTop: 5, fontSize: 15, fontWeight: 'bold' }}>Theo ngày</Text>
                                                </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity>
                                                <View style={{ alignItems: 'center', paddingTop: 10 }}>
                                                        <Icon2 name="dots-three-horizontal" size={25} color={COLORS.orange} />
                                                        <Text style={{ paddingTop: 5, fontSize: 15, fontWeight: 'bold' }}>Tất cả</Text>
                                                </View>
                                        </TouchableOpacity>
                                </View>
                        </View>
                )
        }
        const Card = ({ hotel, index }) => {
                const inputRange = [(index - 1) * cardWidth, index * cardWidth, (index + 1) * cardWidth];
                const opacity = scrollX.interpolate({ inputRange, outputRange: [0.7, 0, 0.7] });
                const scale = scrollX.interpolate({ inputRange, outputRange: [0.8, 1, 0.8] });
                return (
                        <View>
                                <TouchableOpacity disabled={activeCardIndex != index} activeOpacity={1} onPress={() => navigation.navigate("DetailsScreen", hotel.id)}>
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
        const TopHotelCard = ({ hotel }) => {
                return (
                        <TouchableOpacity style={styles.topHotelCard} onPress={() => navigation.navigate("DetailsScreen", hotel.id)}>
                                <View style={{ position: "absolute", top: 5, right: 10, zIndex: 1, flexDirection: "row", alignItems: 'center', }}>
                                        <Icon name="star" size={15} color={COLORS.orange} />
                                        <Text style={{ color: COLORS.white, fontWeight: "bold", fontSize: 15, marginLeft: 3 }}>5.0</Text>
                                </View>
                                <Image style={styles.topHotelCardImage} source={{ uri: hotel.image }} />
                                <View style={{ paddingHorizontal: 10 }}>
                                        <Text style={{ fontsize: 10, fontWeight: "bold", color: COLORS.dark, height: 35 }}>{hotel.name}</Text>
                                        <Text style={{ fontSize: 12, marginTop: 3, fontWeight: "bold", color: COLORS.grey }}>{hotel.location}</Text>
                                </View>
                        </TouchableOpacity>
                )
        }
        const RecentlyBookedCard = ({ hotel }) => {
                return (
                        <View>
                                <TouchableOpacity style={styles.RecentlyBox} onPress={() => navigation.navigate("DetailsScreen", hotel.id)}>
                                        <View style={{ width: 120, height: 120 }}>
                                                <Image style={styles.IMGRecent} source={{ uri: hotel.image }} />
                                        </View>
                                        <View>
                                                <View style={{ marginTop: 10, flexDirection: 'row' }}>
                                                        <View style={{ width: 130 }}>
                                                                <View style={{ width: 120, height: 45 }}>
                                                                        <Text style={{ fontSize: 17, fontWeight: 'bold', color: "black" }}>{hotel.name}</Text>
                                                                </View>
                                                                <Text style={{ fontSize: 15 }}>{hotel.location}</Text>
                                                        </View>
                                                        <View style={{ width: 100, alignItems: 'center', marginTop: 10 }}>

                                                        </View>
                                                </View>
                                                <View style={{ flexDirection: 'row', width: 180, marginTop: 10 }}>
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
                                        <Icon name="bookmark-border" size={26} style={{ marginLeft: 30, top: -50, left: 300, position: 'absolute' }} color="black" />
                                </TouchableOpacity>
                        </View>
                )
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
                                                <Icon1 name="bell-ring-outline" size={26} color={COLORS.grey} />
                                        </View>
                                </View>
                                <TouchableOpacity onPress={() => { navigation.navigate("Test") }}>
                                        <View style={{ marginTop: 15 }}>
                                                <Text style={{ fontWeight: 'bold', fontSize: 28, color: 'black' }}>Hello, {auth().currentUser.displayName}
                                                        <Icon1
                                                                name="hand-wave-outline"
                                                                size={26}
                                                                color={"#FF6347"}

                                                        />
                                                </Text>
                                        </View>
                                </TouchableOpacity>
                        </View>
                        <ScrollView showsHorizontalScrollIndicator={false} style={{ height: "100%" }}>
                                <View style={styles.searchInputContainer}>
                                        <Icon name="search"
                                                size={30}
                                                style={{ marginLeft: 20 }}
                                        />
                                        <TextInput
                                                placeholder="Search"
                                                style={{ fontSize: 18, paddingLeft: 10 }}
                                        />
                                </View>
                                <CategoryList />
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
                                        <TouchableOpacity>
                                                <Text style={{ fontWeight: "bold", color: COLORS.primary }}>See All</Text>
                                        </TouchableOpacity>
                                </View>
                                <FlatList horizontal
                                        data={ListHotelData}
                                        showsHorizontalScrollIndicator={false}
                                        contentContainerStyle={{ paddingLeft: 10, marginTop: 20, paddingBottom: 30 }}
                                        renderItem={({ item }) => <TopHotelCard hotel={item} />}
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
                </SafeAreaView>
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
                height: 50,
                backgroundColor: COLORS.light,
                marginTop: 5,
                marginLeft: 20,
                marginRight: 20,
                borderRadius: 20,
                flexDirection: "row",
                alignItems: "center",
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
                height: 150,
                width: 140,
                backgroundColor: COLORS.white,
                elevation: 15,
                marginHorizontal: 10,
                borderRadius: 15,
        },
        topHotelCardImage: {
                height: 90,
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
})