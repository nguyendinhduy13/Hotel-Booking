import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    Image,
    StyleSheet,
    TouchableHighlight,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import COLORS from '../../consts/colors';
import auth from '@react-native-firebase/auth';
import Icon1 from 'react-native-vector-icons/FontAwesome';
const InfoProfile = ({ navigation }) => {
    const user = auth().currentUser;
    const [loadingImg, setLoadingImg] = useState(false);
    const [imageUri, setImageUri] = useState('');
    const [email, setEmail] = useState(user.email ? user.email : '');
    const [password, setPassword] = useState('**************');
    const [name, setName] = useState(user.displayName ? user.displayName : '');

    const pickImage = ({ navigation }) => {
        setLoadingImg(true);

        setTimeout(() => {
            setLoadingImg(false);
        }, 2000);
    };

    useEffect(() => {
        if (user) {
            setImageUri(user.photoURL);
        }
    });
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ flexDirection: 'row' }}>
                <Icon
                    onPress={() => {
                        navigation.goBack();
                    }}
                    name="arrowleft"
                    size={30}
                    style={{
                        color: COLORS.dark,
                        marginLeft: 15,
                        marginTop: 15,
                    }}
                />
                <Text
                    style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        marginTop: 15,
                        marginLeft: 10,
                        color: COLORS.dark,
                    }}>
                    Thông tin tài khoản
                </Text>
            </View>
            <TouchableHighlight
                underlayColor="white"
                onPress={() => {
                    pickImage();
                }}
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    top: 50,
                    backgroundColor: 'white',
                }}>
                <>
                    {loadingImg ? (
                        <View style={styles.wrapLoading}>
                            <View
                                style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                <ActivityIndicator
                                    animating={loadingImg}
                                    size={28}
                                    color="rgba(239, 73, 73, 1)"
                                />
                            </View>
                        </View>
                    ) : (
                        <Image
                            style={styles.imgAvtInfo}
                            source={
                                imageUri
                                    ? { uri: imageUri }
                                    : {
                                        uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEOYhim6YXtwZUy9_SFOSldir4qH23VR5oaJImJXrj-Q&s',
                                    }
                            }
                        />
                    )}
                    <View style={styles.wrapIconCamera}>
                        <Icon1
                            style={{
                                position: 'absolute',
                                color: COLORS.dark,
                            }}
                            name="camera"
                            size={22}
                        />
                    </View>
                </>
            </TouchableHighlight>
            <View>
                <TextInput
                    placeholder="Email"
                    style={{
                        borderWidth: 1,
                        borderRadius: 10,
                        paddingLeft: 10,
                        width: 350,
                        alignSelf: 'center',
                        marginTop: 50,
                        borderColor: '#d0d0d0',
                    }}
                    value={email}
                />
                <TextInput
                    placeholder="Tên"
                    style={{
                        borderWidth: 1,
                        borderRadius: 10,
                        paddingLeft: 10,
                        width: 350,
                        alignSelf: 'center',
                        marginVertical: 50,
                        borderColor: '#d0d0d0',
                    }}
                    value={name}
                />
                <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                    <TextInput
                        placeholder="Mật khẩu"
                        style={{
                            borderWidth: 1,
                            borderRadius: 10,
                            paddingLeft: 10,
                            width: 350,
                            alignSelf: 'center',
                            borderColor: '#d0d0d0',
                        }}
                        value={password}
                        editable={false}
                    />
                    <Icon
                        name="edit"
                        size={25}
                        style={{
                            position: 'absolute',
                            right: 15,
                            alignSelf: 'center',
                        }}
                        onPress={() => { navigation.navigate("Change Password") }}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    imgAvtInfo: {
        width: 120,
        height: 120,
        borderColor: '#d0d0d0',
        borderWidth: 1,
        borderRadius: 80,
        marginRight: 10,
    },
    wrapIconCamera: {
        alignSelf: 'center',
        backgroundColor: 'white',
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 40,
        left: 33,
    },
    wrapLoading: {
        width: 120,
        height: 120,
        borderColor: '#d0d0d0',
        borderWidth: 1,
        borderRadius: 80,
        marginRight: 10,
    },
});

export default InfoProfile;
