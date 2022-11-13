import {
    StyleSheet,
    Text,
    View,
    TextInput,
    ScrollView,
    ToastAndroid,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import React, { useState, useEffect } from 'react';

export default function AddHotel({ navigation, route }) {
    const dataAccountFireBase = route.params.data;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [roll, setRoll] = useState('adminks');

    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [advantages, setAdvantages] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [location, setLocation] = useState('');
    const [position, setPosition] = useState([]);
    const [review, setReview] = useState(0);
    const [isActive, setIsActive] = useState(false);

    const checkAccount = () => {
        let check = true;
        dataAccountFireBase.forEach(item => {
            if (item.email === email || item._id === id) {
                check = false;
            }
        });
        return check;
    };
    const setNull = () => {
        setId('');
        setName('');
        setAdvantages('');
        setDescription('');
        setImage('');
        setLocation('');
        setPosition([]);
        setReview(0);
        setIsActive(false);
        setEmail('');
        setPassword('');
    };
    const handleAddHotel = async () => {
        console.log('Email: ' + email, 'Password: ' + password);
        if (
            email === '' ||
            password === '' ||
            id === '' ||
            name === '' ||
            advantages === '' ||
            description === '' ||
            image === '' ||
            location === '' ||
            Number(position[0]) === 0 ||
            Number(position[1]) === 0
        ) {
            ToastAndroid.show(
                'Vui lòng nhập đầy đủ thông tin',
                ToastAndroid.SHORT,
            );
        } else if (checkAccount()) {
            try {
                await auth()
                    .createUserWithEmailAndPassword(email, password)
                    .then(() => {
                        console.log('Admin account created!');
                    })
                    .catch(error => {
                        console.log(error);
                    });
                let dataAccount = {
                    _id: id,
                    email: email,
                    roll: roll,
                    uid: auth().currentUser.uid,
                };
                await firestore()
                    .collection('AdminAccounts')
                    .doc(id)
                    .set(dataAccount)
                    .then(() => {
                        console.log('Admin hotel added!');
                    });
                await firestore()
                    .collection('ListHotel')
                    .doc('ListHotel')
                    .update({
                        ListHotel: firestore.FieldValue.arrayUnion({
                            id: id,
                            name: name,
                            advantage: advantages,
                            description: description,
                            image: image,
                            location: location,
                            position: position,
                            review: review,
                            isActive: isActive,
                        }),
                    })
                    .then(() => {
                        console.log('Data hotel added!');
                    });
                ToastAndroid.show(
                    'Thêm khách sạn thành công',
                    ToastAndroid.SHORT,
                );
                navigation.navigate('HomeScreen');
                setNull();
            } catch (error) {
                console.log(error);
            }
        } else {
            // ToastAndroid.show(
            //     'Thông tin khách sạn đã có trên hệ thống vui lòng kiểm tra lại',
            //     ToastAndroid.SHORT,
            // );
            console.log(
                'Thông tin khách sạn đã có trên hệ thống vui lòng kiểm tra lại',
            );
        }

        //delete a feild in array of object in firebase
        // const arrayRemove = firestore.FieldValue.arrayRemove({
        //     id: id,
        //     name: name,
        //     advantage: advantages,
        //     description: description,
        //     image: image,
        //     location: location,
        //     position: position,
        //     review: review,
        // });
        // firestore()
        //     .collection('ListHotel')
        //     .doc('ListHotel')
        //     .update({
        //         ListHotel: arrayRemove,
        //     })
        //     .then(() => {
        //         console.log('Data deleted!');
        //     });
    };

    return (
        <View style={{ backgroundColor: 'white', flex: 1 }}>
            <View style={{ padding: 10 }}>
                <View style={styles.header}>
                    <Icon
                        name="ios-chevron-back-outline"
                        size={30}
                        onPress={() => {
                            navigation.goBack();
                        }}
                    />
                    <Text
                        style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            color: 'black',
                        }}>
                        Thêm khách sạn
                    </Text>
                    <Icon name="ios-chevron-back-outline" size={0} />
                </View>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={styles.body}>
                    <View style={styles.account}>
                        <Text style={styles.title}>Tài khoản</Text>
                        <View style={{ marginTop: 10 }}>
                            <View>
                                <Text style={styles.text}>ID khách sạn</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Nhập ID khách sạn"
                                    value={id}
                                    onChangeText={text => {
                                        setId(text);
                                    }}
                                />
                            </View>
                            <View>
                                <Text style={styles.text}>Email đăng nhập</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Nhập email đăng nhập"
                                    value={email}
                                    onChangeText={text => {
                                        setEmail(text);
                                    }}
                                />
                            </View>
                            <View>
                                <Text style={styles.text}>Mật khẩu</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Nhập mật khẩu"
                                    value={password}
                                    onChangeText={text => {
                                        setPassword(text);
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={styles.info}>
                        <Text style={styles.title}>Thông tin</Text>
                        <View style={{ marginTop: 10 }}>
                            <View>
                                <Text style={styles.text}>
                                    Nhập tên khách sạn
                                </Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Nhập tên khách sạn"
                                    value={name}
                                    onChangeText={text => {
                                        setName(text);
                                    }}
                                />
                            </View>
                            <View>
                                <Text style={styles.text}>Nhập advantages</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Nhập advantages"
                                    value={advantages}
                                    onChangeText={text => {
                                        setAdvantages(text);
                                    }}
                                />
                            </View>
                            <View>
                                <Text style={styles.text}>Nhập mô tả</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Nhập mô tả"
                                    value={description}
                                    onChangeText={text => {
                                        setDescription(text);
                                    }}
                                />
                            </View>
                            <View>
                                <Text style={styles.text}>Nhập URL ảnh</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="URL"
                                    value={image}
                                    onChangeText={text => {
                                        setImage(text);
                                    }}
                                />
                            </View>
                            <View>
                                <Text style={styles.text}>Nhập địa chỉ</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Nhập địa chỉ"
                                    value={location}
                                    onChangeText={text => {
                                        setLocation(text);
                                    }}
                                />
                            </View>
                            <View>
                                <Text style={styles.text}>
                                    Nhập Position code
                                </Text>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                    }}>
                                    <TextInput
                                        style={{
                                            width: '45%',
                                            height: 40,
                                            borderWidth: 1,
                                            borderRadius: 5,
                                            paddingLeft: 10,
                                        }}
                                        placeholder="Nhập latitude"
                                        value={position[0]}
                                        onChangeText={text => {
                                            //to number
                                            setPosition([
                                                Number(text),
                                                position[1],
                                            ]);
                                        }}
                                    />
                                    <TextInput
                                        style={{
                                            width: '45%',
                                            height: 40,
                                            borderWidth: 1,
                                            borderRadius: 5,
                                            paddingLeft: 10,
                                        }}
                                        placeholder="Nhập longitude"
                                        value={position[1]}
                                        onChangeText={text => {
                                            //to number
                                            setPosition([
                                                position[0],
                                                Number(text),
                                            ]);
                                        }}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        // console.log(accountname, password, id, name, advantages, description, image, location, position, review);
                        handleAddHotel();
                    }}>
                    <Text style={{ color: 'white', fontSize: 20 }}>Thêm</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: 'white',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    body: {
        width: '100%',
        backgroundColor: 'white',
        marginTop: 20,
        marginBottom: 100,
    },
    info: {
        marginTop: 20,
    },
    account: {},
    title: {
        color: 'black',
        fontSize: 17,
        fontWeight: 'bold',
    },
    text: {
        color: 'black',
        fontSize: 15,
        marginVertical: 10,
    },
    input: {
        backgroundColor: '#f2f2f2',
        width: '100%',
        borderRadius: 10,
        padding: 10,
        marginTop: 5,
    },
    footer: {
        width: '100%',
        height: 60,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0,
        right: 0,
    },
    button: {
        width: '90%',
        height: '80%',
        backgroundColor: '#4da7ec',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
