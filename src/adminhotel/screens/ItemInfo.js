import React, { useState } from 'react'
import { View, TextInput, TouchableOpacity, Text,Image } from 'react-native'
import COLORS from '../../consts/colors'
import { launchImageLibrary } from 'react-native-image-picker'
import { useSelector } from 'react-redux'
import SelectDropdown from 'react-native-select-dropdown'
import storage from '@react-native-firebase/storage'
import Icon from 'react-native-vector-icons/AntDesign'
import uuid from 'react-native-uuid';
import firestore from "@react-native-firebase/firestore"
const ItemInfo = () => {
    const countries = ['Ban công','Tầm nhìn ra khung cảnh', 'Điều hòa không khí', 'Phòng tắm riêng trong phòng', 'TV màn hình phẳng', 'Sân hiên', 'Nhìn ra hồ bơi','Nhìn ra núi','Nhìn ra biển','Hồ bơi trên sân thượng','Wifi miễn phí']
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [area, setArea] = useState('')
    const [description, setDescription] = useState('')
    const [benefit, setBenefit] = useState([])
    const [listimage, setListImage] = useState([])
    const [image, setImage] = useState(null)
    const { id_ks } = useSelector(state => state.Globalreducer)
    const selectImage = async () => {
        const options = {
            maxWidth: 2000,
            maxHeight: 2000,
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        }
        const result = await launchImageLibrary(options)
        setImage(result.assets[0].uri)
    }

    const uploadImage = async () => {
        const filename = image.substring(image.lastIndexOf('/') + 1)
        listimage.push(filename);
        const uploadUri = Platform.OS === 'ios' ? image.replace('file://', '') : image
        setImage(null)
        const task = storage()
            .ref(id_ks + '/' + '6' + '/' + filename)
            .putFile(uploadUri)
        // set progress state
        try {
            await task
        } catch (e) {
            console.error(e)
        }
    }

    const addroom=()=>{
        firestore()
        .collection('HotelList')
        .doc(id_ks)
        .update({
            Room: firestore.FieldValue.arrayUnion({
                date:1,
                description: description,
                id:uuid.v4(),
                image: listimage,
                isavailable: null,
                name: name,
                price: price,
                tienich:benefit
            })
        })
        .then(() => {
          listimage=[];
          benefit=[];
        })
    }

    return (
        <View>
            <Text style={{ alignSelf: 'center', fontSize: 18, fontWeight: '500', marginTop: 10 }}>
                Thêm thông tin phòng
            </Text>
            <View style={{ alignItems: 'center' }}>
                <TextInput
                    placeholder="Tên phòng"
                    style={{
                        height: 50,
                        backgroundColor: 'white',
                        width: '95%',
                        borderRadius: 15,
                        marginTop: 10,
                    }}
                    value={name}
                    onChangeText={text => setName(text)}
                />
                <TextInput
                    placeholder="Giá phòng"
                    style={{
                        height: 50,
                        width: '95%',
                        borderRadius: 15,
                        backgroundColor: 'white',
                        marginTop: 15,
                    }}
                    value={price}
                    onChangeText={text => setPrice(text)}
                />
                <View style={{ flexDirection: 'row', width: '100%' }}>
                    <TextInput
                        placeholder="Hình phòng"
                        style={{
                            height: 50,
                            width: '70%',
                            borderRadius: 15,
                            alignSelf: 'flex-start',
                            backgroundColor: 'white',
                            marginTop: 15,
                            marginHorizontal: 10,
                        }}
                        value={image}
                    />
                    <Icon
                        name="clouduploado"
                        size={30}
                        style={{ position: 'absolute', top: 25, zIndex: 1, right: 120 }}
                        onPress={selectImage}
                    />
                    <TouchableOpacity
                        style={{
                            width: '22%',
                            backgroundColor: COLORS.primary,
                            borderRadius: 20,
                            height: 45,
                            justifyContent: 'center',
                            alignItems: 'center',
                            alignSelf: 'center',
                            marginTop: 15,
                        }}
                        onPress={uploadImage}>
                        <Text style={{ fontSize: 15, color: 'white', fontWeight: '600' }}>Lưu</Text>
                    </TouchableOpacity>
                </View>
                <TextInput
                        placeholder="Diện tích phòng"
                        style={{
                            height: 50,
                            width: '95%',
                            borderRadius: 15,
                            alignSelf: 'flex-start',
                            backgroundColor: 'white',
                            marginTop: 15,
                            marginHorizontal: 10,
                        }}
                        value={area}
                        onChangeText={text => setArea(text)}
                    />
                <View style={{ flexDirection: 'row', width: '100%' }}></View>
                <View
                    style={{
                        justifyContent: 'space-between',
                        marginHorizontal: 10,
                        backgroundColor: 'white',
                        borderRadius: 15,
                        width: '95%',
                        marginTop: 10,
                        flexDirection:"row",
                        alignItems:"center"

                    }}>
                    <SelectDropdown
                        buttonStyle={{ backgroundColor: 'white', borderRadius: 15,width:"100%" }}
                        data={countries}
                        onSelect={(selectedItem, index) => {
                            benefit.push(selectedItem)
                        }}
                        dropdownStyle={{ width: '95%',borderRadius:15 }}
                        defaultButtonText="Tiện ích"
                        buttonTextStyle={{fontSize: 14, color: COLORS.grey,textAlign:"left",left:10 }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem
                        }}
                        rowTextForSelection={(item, index) => {
                            return item
                        }}
                    />
                    <Icon
                    name='circledowno'
                    size={25}
                    style={{ position: 'absolute',right:15 }}
                    />
                </View>
                <TextInput
                    placeholder="Mô tả"
                    style={{
                        height: 50,
                        width: '95%',
                        borderRadius: 15,
                        backgroundColor: 'white',
                        marginTop: 15,
                    }}
                    value={description}
                    onChangeText={text => setDescription(text)}
                />
            </View>
            <TouchableOpacity
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: COLORS.primary,
                    height: 50,
                    borderRadius: 15,
                    width: '90%',
                    alignSelf: 'center',
                    marginTop: 25,
                }}
                onPress={addroom}
                >
                <Text style={{ fontSize: 15, color: 'white', fontWeight: '700' }}>Thêm phòng</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ItemInfo
