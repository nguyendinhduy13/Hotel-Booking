import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Lottie from 'lottie-react-native';
import React, { useEffect, useState } from 'react';
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';

export default function AddHotel({ navigation }) {
  const { dataProvince } = useSelector((state) => state.Globalreducer);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [roll, setRoll] = useState('adminks');

  const [advantages, setAdvantages] = useState('');
  const [comments, setComments] = useState([]);
  const [description, setDescription] = useState('');
  const [id, setId] = useState({});
  const [image, setImage] = useState({
    uri: '',
    name: '',
  });
  const [isActive, setIsActive] = useState(false);
  const [location, setLocation] = useState('');
  const [name, setName] = useState('');
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [star, setStar] = useState([]);
  const [tag, setTag] = useState({
    province: '',
    district: '',
  });

  const [data, setData] = useState([]);
  const [dataDistrict, setDataDistrict] = useState([]);
  useEffect(() => {
    let data = [];
    dataProvince.forEach((item) => {
      data.push(item.name);
    });
    setData(data);
  }, []);

  const setNull = () => {
    setEmail('');
    setPassword('');
    setAdvantages('');
    setComments([]);
    setDescription('');
    setId('');
    setImage('');
    setIsActive(false);
    setLocation('');
    setName({
      name: '',
      uri: '',
    });
    setLatitude('');
    setLongitude('');
    setStar([]);
    setTag({
      province: '',
      district: '',
    });
  };

  const CheckFormatEmail = (email1) => {
    //regex format email
    let regex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
    if (regex.test(email1) === false) {
      return false;
    } else {
      return true;
    }
  };

  const handleAddHotel = async () => {
    if (
      email === '' ||
      password === '' ||
      id === '' ||
      name === '' ||
      advantages === '' ||
      description === '' ||
      image === '' ||
      location === '' ||
      latitude === '' ||
      longitude === '' ||
      tag.province === '' ||
      tag.district === ''
    ) {
      ToastAndroid.show('Vui l??ng nh???p ?????y ????? th??ng tin', ToastAndroid.SHORT);
    } else if (CheckFormatEmail(email) === false) {
      ToastAndroid.show('Email kh??ng ????ng ?????nh d???ng', ToastAndroid.SHORT);
    } else if (password.length < 6) {
      ToastAndroid.show('M???t kh???u ph???i c?? ??t nh???t 6 k?? t???', ToastAndroid.SHORT);
    } else {
      try {
        setLoading(true);
        await auth()
          .createUserWithEmailAndPassword(email, password)
          .then(() => {
            console.log('Admin account created!');
          })
          .catch((error) => {
            console.log(error);
          });
        let dataAccount = {
          id: id,
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
        let arr = [];
        arr.push(latitude);
        arr.push(longitude);
        let string = tag.district + ', ' + tag.province;
        await firestore()
          .collection('ListHotel')
          .doc('ListHotel')
          .update({
            ListHotel: firestore.FieldValue.arrayUnion({
              advantage: advantages,
              comments: comments,
              description: description,
              id: id,
              image: image.name,
              isActive: isActive,
              location: location,
              name: name,
              position: arr,
              star: star,
              tag: string,
            }),
          })
          .then(() => {
            console.log('Data hotel added!');
          });
        const reference = storage().ref(id + '/' + image.name);
        await reference.putFile(image.uri);
        console.log('Image uploaded to the bucket!');

        ToastAndroid.show('Th??m kh??ch s???n th??nh c??ng', ToastAndroid.SHORT);
        GoogleSignin.revokeAccess();
        GoogleSignin.signOut();
        await auth().signInWithEmailAndPassword('adminapp@gmail.com', '123456');
        console.log('Admin: ' + email);
        console.log('Password: ' + password);
        setLoading(false);
        navigation.navigate('TabNavigation');
        setNull();
      } catch (error) {
        console.log(error);
        navigation.navigate('TabNavigation');
        setNull();
        ToastAndroid.show('Th??m kh??ch s???n th???t b???i', ToastAndroid.SHORT);
      }
    }
  };
  const selectImage = () => {
    const options = {
      noData: true,
    };
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        return;
      }
      const fileName = response.assets[0].fileName.split('-');
      const name = fileName[fileName.length - 1];
      const uri = response.assets[0].uri;
      setImage({ name: name, uri: uri });
    });
  };

  const handleSelectProvince = (value) => {
    const { province } = value;

    setTag({ province: province, district: '' });
    dataProvince.filter((item) => {
      if (item.name === province) {
        let data = [];
        item.districts.forEach((item) => {
          data.push(item.name);
        });
        setDataDistrict(data);
      }
    });
  };

  const removeName = (name) => {
    //remove Th??nh ph??? and Qu???n/Huy???n Th??? x?? in district
    if (name.includes('Th??nh ph???')) {
      return name.replace('Th??nh ph???', '');
    } else if (name.includes('Qu???n')) {
      return name.replace('Qu???n', '');
    } else if (name.includes('Huy???n')) {
      return name.replace('Huy???n', '');
    } else if (name.includes('Th??? x??')) {
      return name.replace('Th??? x??', '');
    } else {
      return name;
    }
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
            }}
          >
            Th??m kh??ch s???n
          </Text>

          <Icon name="ios-chevron-back-outline" size={0} />
        </View>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.body}>
          <View style={styles.account}>
            <Text style={styles.title}>T??i kho???n</Text>
            <View style={{ marginTop: 10 }}>
              <View>
                <Text style={styles.text}>Email ????ng nh???p</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Nh???p email ????ng nh???p"
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                  }}
                />
              </View>
              <View>
                <Text style={styles.text}>M???t kh???u</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Nh???p m???t kh???u"
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                  }}
                />
              </View>
            </View>
          </View>
          <View style={styles.info}>
            <Text style={styles.title}>Th??ng tin</Text>
            <View style={{ marginTop: 10 }}>
              <View>
                <Text style={styles.text}>Nh???p t??n kh??ch s???n</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Nh???p t??n kh??ch s???n"
                  value={name}
                  onChangeText={(text) => {
                    setName(text);
                    setId(text.split(' ').join(''));
                  }}
                />
              </View>
              <View>
                <Text style={styles.text}>ID kh??ch s???n</Text>
                <TextInput
                  style={styles.input}
                  editable={false}
                  placeholder="ID kh??ch s???n"
                  value={id}
                />
              </View>
              <View>
                <Text style={styles.text}>Nh???p advantages</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Nh???p advantages"
                  value={advantages}
                  onChangeText={(text) => {
                    setAdvantages(text);
                  }}
                />
              </View>
              <View>
                <Text style={styles.text}>Nh???p m?? t???</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Nh???p m?? t???"
                  value={description}
                  onChangeText={(text) => {
                    setDescription(text);
                  }}
                />
              </View>
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Text style={styles.text}>???nh b??a</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  {image.name && image.uri && (
                    <View style={{ width: 100, height: 100, marginRight: 10 }}>
                      <Image
                        source={{ uri: image.uri }}
                        style={{ width: 100, height: 100 }}
                      />
                      <View
                        style={{
                          position: 'absolute',
                          top: 0,
                          right: 5,
                        }}
                      >
                        <Pressable
                          onPress={() =>
                            setImage({
                              name: '',
                              uri: '',
                            })
                          }
                        >
                          <Text
                            style={{
                              color: 'red',
                              fontSize: 15,
                              fontWeight: 'bold',
                            }}
                          >
                            x
                          </Text>
                        </Pressable>
                      </View>
                    </View>
                  )}
                  <Pressable onPress={selectImage}>
                    <Image
                      source={{
                        uri: 'https://cdn1.iconfinder.com/data/icons/image-1-0-1/1024/upload_image-256.png',
                      }}
                      style={{ width: 80, height: 80 }}
                    />
                  </Pressable>
                </View>
              </View>
              <View>
                <Text style={styles.text}>Nh???p ?????a ch???</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Nh???p ?????a ch???"
                  value={location}
                  onChangeText={(text) => {
                    setLocation(text);
                  }}
                />
              </View>
              <View>
                <Text style={styles.text}>Nh???p Position code</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <TextInput
                    style={{
                      width: '45%',
                      height: 40,
                      borderWidth: 1,
                      borderRadius: 5,
                      paddingLeft: 10,
                    }}
                    placeholder="Nh???p latitude"
                    value={latitude}
                    onChangeText={(text) => {
                      setLatitude(Number(text));
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
                    placeholder="Nh???p longitude"
                    value={longitude}
                    onChangeText={(text) => {
                      setLongitude(Number(text));
                    }}
                  />
                </View>
              </View>
              <View>
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Text style={styles.text}>Tag</Text>
                    <Pressable
                      onPress={() => {
                        setModalVisible(true);
                      }}
                    >
                      <Text style={styles.text}>Add</Text>
                    </Pressable>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}
                  >
                    <TextInput
                      style={{
                        width: '45%',
                        height: 40,
                        borderWidth: 1,
                        borderRadius: 5,
                        paddingLeft: 10,
                      }}
                      placeholder="T???nh"
                      value={tag.province}
                      editable={false}
                      onChangeText={(text) => {
                        setTag({ ...tag, province: text });
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
                      placeholder="Huy???n"
                      value={tag.district}
                      editable={false}
                      onChangeText={(text) => {
                        setTag({ ...tag, district: text });
                      }}
                    />
                  </View>
                </View>
              </View>
              <View>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    handleAddHotel();
                  }}
                >
                  <Text style={{ color: 'white', fontSize: 18 }}>Th??m</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
      {isLoading ? (
        <View
          style={{
            position: 'absolute',
            opacity: 0.7,
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            width: '100%',
            backgroundColor: 'white',
          }}
        >
          <Lottie
            source={require('../../assets/animations/edupia-loading.json')}
            autoPlay
            loop
          />
        </View>
      ) : (
        <></>
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}
      >
        <Pressable
          style={styles.centeredView}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalView}>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: 'bold',
                  }}
                >
                  T???nh
                </Text>
                <SelectDropdown
                  data={data}
                  onSelect={(selectedItem, index) => {
                    handleSelectProvince({
                      province: selectedItem,
                      index,
                    });
                  }}
                  buttonStyle={styles.dropdown2BtnStyle}
                  buttonTextStyle={styles.dropdown2BtnTxtStyle}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  marginTop: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: 'bold',
                  }}
                >
                  Huy???n
                </Text>
                <SelectDropdown
                  data={dataDistrict}
                  onSelect={(selectedItem, index) => {
                    setTag({ ...tag, district: removeName(selectedItem) });
                  }}
                  buttonStyle={styles.dropdown2BtnStyle}
                  buttonTextStyle={styles.dropdown2BtnTxtStyle}
                />
              </View>
            </View>
          </View>
        </Pressable>
      </Modal>
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
    marginBottom: 20,
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
    width: '100%',
    height: 40,
    backgroundColor: '#4da7ec',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
    borderRadius: 10,
    padding: 15,
  },
  dropdown2BtnStyle: {
    width: '80%',
    height: 40,
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
    paddingLeft: 10,
  },
  dropdown2BtnTxtStyle: {
    color: 'black',
    textAlign: 'left',
    fontSize: 15,
  },
});
