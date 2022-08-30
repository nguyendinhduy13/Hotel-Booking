import React, { useRef, useState } from "react";
import { SafeAreaView, Text, StyleSheet, View, ScrollView, TextInput, TouchableOpacity, FlatList, Dimensions, Image, Animated } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../../consts/colors";
import hotels from "../../consts/hotels";
const { width } = Dimensions.get('screen');
const cardWidth = width / 1.8
export default function HomeScreen({navigation}) {
        const categories = ['All', 'Popular', 'Top Rated', 'Featured', 'Luxury'];
        const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
        const [activeCardIndex, setActiveCardIndex] = useState(0);
        const scrollX = useRef(new Animated.Value(0)).current;


        const CategoryList = ({navigation}) => {
                return (
                        <View style={styles.CategoryListContainer}>
                                {categories.map((item, index) => (
                                        <TouchableOpacity key={index} activeOpacity={0.8} onPress={() => setSelectedCategoryIndex(index)}>
                                                <View>
                                                        <Text style={{ ...styles.categoryListText, color: setSelectedCategoryIndex == index ? COLORS.primary : COLORS.grey }}>
                                                                {item}
                                                        </Text>
                                                        {selectedCategoryIndex == index && (
                                                                <View style={{ height: 3, width: 30, backgroundColor: COLORS.primary, marginTop: 2 }}>

                                                                </View>
                                                        )}
                                                </View>
                                        </TouchableOpacity>
                                ))}
                        </View>
                )
        }

        const Card = ({ hotel, index }) => {
                const inputRange = [(index - 1) * cardWidth, index * cardWidth, (index + 1) * cardWidth];
                const opacity = scrollX.interpolate({ inputRange, outputRange: [0.7, 0, 0.7] });
                const scale = scrollX.interpolate({ inputRange, outputRange: [0.8, 1, 0.8] });
                return (
                        <TouchableOpacity disabled={activeCardIndex!=index} activeOpacity={1} onPress={()=>navigation.navigate("DetailsScreen",hotel)}>
                                <Animated.View style={{ ...styles.card, transform: [{ scale }] }}>
                                <Animated.View style={{ ...styles.cardOverplay, opacity }} />
                                <View style={styles.priceTag}>
                                        <Text style={{ color: COLORS.white, fontSize: 20, fontWeight: "bold" }}>VNĐ {hotel.price}</Text>
                                </View>
                                <Image source={{ uri: hotel.image }} style={styles.cardImage} />
                                <View style={styles.cardDetails}>
                                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                                <View>
                                                        <Text style={{ fontWeight: "bold", fontSize: 17, color: COLORS.dark }}>{hotel.name}</Text>
                                                        <Text style={{ fontWeight: "bold", fontSize: 14, color: COLORS.grey }}>{hotel.location}</Text>
                                                </View>
                                                <Icon name="bookmark-border" size={26} color={COLORS.primary} />
                                        </View>
                                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
                                                <View style={{ flexDirection: "row" }}>
                                                        <Icon name="star" size={15} color={COLORS.orange} />
                                                        <Icon name="star" size={15} color={COLORS.orange} />
                                                        <Icon name="star" size={15} color={COLORS.orange} />
                                                        <Icon name="star" size={15} color={COLORS.orange} />
                                                        <Icon name="star" size={15} color={COLORS.grey} />
                                                </View>
                                                <Text style={{ fontSize: 10, color: COLORS.grey }}>365 reviews</Text>
                                        </View>
                                </View>
                        </Animated.View>
                        </TouchableOpacity>
                )
        }
        const TopHotelCard = ({ hotel }) => {
                return (
                        <View style={styles.topHotelCard}>
                                <View style={{ position: "absolute", top: 5, right: 5, zIndex: 1, flexDirection: "row" }}>
                                        <Icon name="star" size={15} color={COLORS.orange} />
                                        <Text style={{color:COLORS.white,fontWeight:"bold",fontSize:15}}>5.0</Text>
                                </View>
                                <Image style={styles.topHotelCardImage} source={{ uri: hotel.image }} />
                                <View style={{ paddingVertical: 5, paddingHorizontal: 10 }}>
                                        <Text style={{ fontsize: 10, fontWeight: "bold",color:COLORS.dark }}>{hotel.name}</Text>
                                        <Text style={{ fontSize:10, fontWeight: "bold", color: COLORS.grey }}>{hotel.location}</Text>
                                </View>
                        </View>
                )
        }
        return (
                <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
                        <View style={styles.header}>
                                <View style={{ paddingBottom: 15 }}>
                                        <Text style={{ fontSize: 22, fontWeight: "bold", color: COLORS.dark }}>
                                                Tìm khách sạn của bạn
                                        </Text>
                                        <View style={{ flexDirection: "row" }}>
                                                <Text style={{ fontSize: 22, fontWeight: "bold", color: COLORS.dark }}>
                                                        trong
                                                </Text>
                                                <Text style={{ fontSize: 22, fontWeight: "bold", color: COLORS.primary }}>
                                                        {' '}Việt Nam
                                                </Text>
                                        </View>
                                </View>
                                <Icon name="person-outline" size={38} color={COLORS.grey} />
                        </View>
                        <ScrollView showsHorizontalScrollIndicator={false}>
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
                                                onMomentumScrollEnd={(e)=>{
                                                      setActiveCardIndex(
                                                        Math.round(e.nativeEvent.contentOffset.x / cardWidth)
                                                      )
                                                }}
                                                onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: true })}
                                                data={hotels}
                                                horizontal
                                                contentContainerStyle={{ paddingVertical: 30, paddingLeft: 20, paddingRight: cardWidth /2-40}}
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
                                        <Text style={{ fontWeight: "bold", color: COLORS.grey }}>
                                                Top hotels
                                        </Text>
                                        <Text style={{ fontWeight: "bold", color: COLORS.grey }}>
                                                Show All
                                        </Text>
                                </View>
                                <FlatList horizontal
                                        data={hotels}
                                        showsHorizontalScrollIndicator={false}
                                        contentContainerStyle={{ paddingLeft: 20, marginTop: 20, paddingBottom: 30 }}
                                        renderItem={({ item }) => <TopHotelCard hotel={item} />}
                                />
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
                marginTop: 15,
                marginLeft: 20,
                borderBottomLeftRadius: 30,
                flexDirection: "row",
                alignItems: "center",
        },
        CategoryListContainer: {
                flexDirection: "row",
                justifyContent: "space-between",
                marginHorizontal: 20,
                marginTop: 30,
        },
        categoryListText: {
                fontSize: 17,
                fontWeight: "bold",
                color: COLORS.dark
        },
        card: {
                height: 280,
                width: cardWidth,
                elevation: 15,
                marginRight: 20,
                borderRadius: 15,
                backgroundColor: COLORS.white,
        },
        cardImage: {
                height: 200,
                width: '100%',
                borderTopRightRadius: 15,
                borderTopLeftRadius: 15,
        },
        priceTag: {
                height: 60,
                width: 80,
                backgroundColor: COLORS.primary,
                position: "absolute",
                zIndex: 1,
                right: 0,
                borderTopRightRadius: 15,
                borderBottomLeftRadius: 15,
                justifyContent: "center",
                alignItems: "center",
        },
        cardDetails: {
                height: 100,
                borderRadius: 15,
                backgroundColor: COLORS.white,
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
                borderRadius: 15,
        },
        topHotelCard: {
                height: 140,
                width: 120,
                backgroundColor: COLORS.white,
                elevation: 15,
                marginHorizontal: 10,
                borderRadius: 10,
        },
        topHotelCardImage: {
                height: 80,
                width: "100%",
                borderTopRightRadius: 10,
                borderTopLeftRadius: 10
        }
})