import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import COLORS from '../../consts/colors';
import Icon from 'react-native-vector-icons/AntDesign';
const BookedFinal = ({ navigation, route }) => {
    const item = route.params;
    return (
        <View style={{ flex: 1, backgroundColor: COLORS.white }}>
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
                        marginTop: 16,
                        marginLeft: 10,
                        color: COLORS.dark,
                    }}>
                    Payment
                </Text>
            </View>
            <View>
                F
                <TouchableOpacity style={styles.RecentlyBox} onPress={() => {}}>
                    <View
                        style={{
                            width: '98%',
                            height: 200,
                            alignSelf: 'center',
                        }}>
                        <Image
                            style={styles.IMGRecent}
                            source={{ uri: item.image[1] }}
                        />
                    </View>
                    <View style={{ marginTop: 25 }}>
                        <View style={{ paddingHorizontal: 20 }}>
                            <Text
                                style={{
                                    fontSize: 20,
                                    height: 25,
                                    color: COLORS.dark,
                                    fontWeight: '600',
                                }}>
                                {item.name}
                            </Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Text
                                    style={{
                                        fontSize: 20,
                                        paddingVertical: 10,
                                        fontWeight: '700',
                                        color: COLORS.primary,
                                    }}>
                                    {item.price}
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 16,
                                        color: COLORS.dark,
                                        paddingVertical: 13,
                                        fontWeight: '600',
                                    }}>
                                    {' '}
                                    VND/đêm
                                </Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
                <View>
                    <View>
                        <Text></Text>
                    </View>
                </View>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    RecentlyBox: {
        width: '100%',
        height: 300,
        color: 'black',
        backgroundColor: COLORS.white,
        marginBottom: 15,
        alignSelf: 'center',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        elevation: 15,
        shadowColor: COLORS.black,
    },
    IMGRecent: {
        height: '100%',
        width: '100%',
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
});
export default BookedFinal;
