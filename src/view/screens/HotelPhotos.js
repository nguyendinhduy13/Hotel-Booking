import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, Modal, ScrollView, TouchableNativeFeedback, TouchableHighlight } from "react-native"
import Icon from "react-native-vector-icons/AntDesign"
import COLORS from "../../consts/colors";
export default function HotelPhotos({ route, navigation }) {
        const [item, setItem] = useState(route.params)
        const [index, setIndex] = useState(0)
        const [itemzoom, setitemzoom] = useState([])
        const [modalVisible, setModalVisible] = useState(false)
        return (
                <ScrollView contentContainerStyle={!modalVisible ? {
                        backgroundColor: COLORS.white,
                        flex: 1,
                        paddingBottom: 20,
                } : {
                        backgroundColor: COLORS.grey,
                        flex: 1,
                        paddingBottom: 20,
                }}>
                        <View style={{ paddingTop: "10%", marginHorizontal: 15, flexDirection: "row" }}>
                                <Icon
                                        name="arrowleft"
                                        size={30}
                                        onPress={() => navigation.goBack()}
                                />
                                <Text style={{ fontSize: 19, fontWeight: "bold", color: COLORS.black, marginHorizontal: 20, marginTop: 2 }}>
                                        Gallery Hotel Photos
                                </Text>
                        </View>

                        <View  style={{flexDirection:"row", flexWrap:"wrap"}}>
                                {!modalVisible&&
                                        item.image.map((image, index) => (
                                                <TouchableOpacity onPress={() => { setModalVisible(!modalVisible), setitemzoom(item), setIndex(index) }}>
                                                        <Image
                                                                source={{ uri: image }}
                                                                style={{ width: 160, height: 150, marginTop: 20, marginHorizontal: 15, borderRadius: 20 }}
                                                        />
                                                </TouchableOpacity>
                                        ))}
                                </View>
                        <Modal
                                transparent={true}
                                visible={modalVisible}
                                onRequestClose={() => {
                                        setModalVisible(!modalVisible);
                                }}
                        >
                                <TouchableOpacity style={{ alignItems: "center", marginTop: "50%" }} onPress={()=>{setModalVisible(!modalVisible)}}>
                                        <Image
                                                source={{ uri: modalVisible ? itemzoom.image[index] : item.image[0] }}
                                                style={{ width: 300, height: 290, borderRadius: 20 }}
                                        />
                                </TouchableOpacity>
                        </Modal>
                </ScrollView>
        )
}