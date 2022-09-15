import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import firestore, { firebase } from '@react-native-firebase/firestore';
export default function Test() {
    const [data, setData] = useState([])
    const [item, setItem] = useState(false)
    const a = [
        {
            "id": "1",
            "name": "A",
            "age": [
                {
                    "id": "1",
                    "name": "A1",
                    "age": [
                        {
                            "id": "1",
                            "name": "A11",
                        }
                    ]
                }
            ]
        }
    ]
    useEffect(() => {
        firestore()
            .collection('Hotel')
            .doc('AaronHotel')
            .get()
            .then(documentSnapshot => {
                if (documentSnapshot.exists) {
                    setData(a)
                    setItem(!item)
                }
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
                console.log("aaaaaaaaa   ", a.age.id)
            }
        </View>
    )
}