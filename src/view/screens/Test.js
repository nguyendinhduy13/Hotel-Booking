import React, { useEffect, useState, useRef } from 'react'
import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import firestore, { firebase } from '@react-native-firebase/firestore';
export default function Test() {
    const [data, setData] = useState([])
    const [a, setA] = useState([])
    useEffect(() => {
        firestore()
            .collection('Hotel')
            .doc('AaronHotel')
            .get()
            .then(documentSnapshot => {
                const data = documentSnapshot.data();
                setA(data.Room)
            });
    }, [])

    return (
        <View>
            <FlatList
                data={a}
                renderItem={({ item }) => <Text>{item.name}</Text>}
                keyExtractor={item => item.id}
            />
        </View>
    )
}