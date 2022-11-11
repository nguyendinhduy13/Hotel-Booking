import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';

export default function HomeScreen({ navigation }) {
    const [ListHotelData, setListHotelData] = useState([]);
    useEffect(() => {
        firestore()
            .collection('ListHotel')
            .doc('ListHotel')
            .get()
            .then(documentSnapshot => {
                setListHotelData(documentSnapshot.data().ListHotel);
            });
    }, []);
    const loadAccount = async () => {
        let dataAccountFireBase = [];
        await firestore()
            .collection('AdminAccounts')
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(documentSnapshot => {
                    dataAccountFireBase.push(documentSnapshot.data());
                });
            });
        navigation.navigate('AddHotel', {
            data: dataAccountFireBase,
        });
    };
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={require('../../assets/logo.png')}
                    style={{
                        width: 35,
                        height: 35,
                        resizeMode: 'cover',
                    }}
                />
                <Text style={styles.headerText}>Admin</Text>
                <Text style={styles.headerText}></Text>
            </View>
            <View style={styles.body}>
                <Text
                    style={{
                        color: 'black',
                        fontWeight: 'bold',
                        fontSize: 20,
                    }}>
                    Danh sách khách sạn
                </Text>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{ marginTop: 10 }}>
                    {ListHotelData.map((item, index) => {
                        return (
                            <TouchableOpacity
                                style={styles.item}
                                key={index}
                                onPress={() => {
                                    navigation.navigate('InfoHotel', item);
                                }}>
                                <Image
                                    source={{
                                        uri: 'https://cdn2.iconfinder.com/data/icons/coral-building/512/property-building-architecture-05-256.png',
                                    }}
                                    style={{ width: 50, height: 50 }}
                                />
                                <View>
                                    <Text
                                        style={{
                                            color: 'black',
                                            fontSize: 15,
                                            fontWeight: 'bold',
                                        }}>
                                        {item.name}
                                    </Text>
                                    <Text
                                        style={{
                                            color: 'black',
                                            fontSize: 15,
                                            height: 20,
                                            width: '50%',
                                            marginTop: 5,
                                        }}>
                                        {item.location}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
                <TouchableOpacity
                    style={styles.fab}
                    onPress={() => {
                        loadAccount();
                    }}>
                    <Text>+</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 10,
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerText: {
        color: '#000',
        fontSize: 25,
        fontWeight: 'bold',
    },
    body: {
        flex: 1,
        width: '100%',
        marginTop: 20,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f3f6f4',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
    },
    fab: {
        position: 'absolute',
        width: 55,
        height: 55,
        backgroundColor: '#9fc5e8',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        right: 20,
        bottom: 20,
    },
});