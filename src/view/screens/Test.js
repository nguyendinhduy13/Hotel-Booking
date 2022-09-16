import React, { useEffect, useState, useRef } from 'react'
import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import firestore, { firebase } from '@react-native-firebase/firestore';
import { createIconSetFromFontello } from 'react-native-vector-icons';
export default function Test() {
    const [data, setData] = useState([])
    const [a, setA] = useState([])
    useEffect(() => {
        firestore()
            .collection('Hotel')
            .doc('AaronHotel')
            .get()
            .then(documentSnapshot => {
                if (documentSnapshot.exists) {
                    console.log(documentSnapshot.data())
                }
                const data = documentSnapshot.data();
                setA(data.Room)
            });
    }, [])

    return (
        <View>
            <TouchableOpacity>
                <Text>Load</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text>Log</Text>
            </TouchableOpacity>
            {item &&
                console.log("aaaaaaaaa   ")
            }
            <FlatList
                data={a}
                renderItem={({ item }) => <Text>{item.name}</Text>}
                keyExtractor={item => item.id}
            />
        </View>
    )
}