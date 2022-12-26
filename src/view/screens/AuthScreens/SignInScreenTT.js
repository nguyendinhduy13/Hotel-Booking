import Geolocation from '@react-native-community/geolocation';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Alert,
  Image,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Icon } from 'react-native-elements';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import COLORS from '../../../consts/colors';
import { SignInContext } from '../../../contexts/authContext';
import { setAsyncStorage } from '../../../functions/asyncStorageFunctions';
import BookingHotel from '../../../redux/BookingHotel';
import CurrentPosition from '../../../redux/CurrentPosition';
import Globalreducer from '../../../redux/Globalreducer';

GoogleSignin.configure({
  webClientId:
    '769620033857-f8q7uohvdpb5hcan4tlir04iusgc27jd.apps.googleusercontent.com',
});
export default function SignInScreenTT({ navigation }) {
  const { dispatchSignedIn } = useContext(SignInContext);
  const [getVisible, setVisible] = useState(false);
  let dataAccount = [];
  const dispatch = useDispatch();
  const { emailHasSignIn } = useSelector((state) => state.Globalreducer);
  async function onGoogleButtonPress() {
    try {
      // Get the users ID token
      const { idToken } = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      const user = await auth().signInWithCredential(googleCredential);
      if (user) {
        dispatchSignedIn({
          type: 'UPDATE_SIGN_IN',
          payload: { userToken: 'user' },
        });
      }
      if (user.additionalUserInfo.isNewUser) {
        firestore()
          .collection('Users')
          .doc(auth().currentUser.uid)
          .set({
            email: user.user.email,
            name: user.user.displayName,
            phone: user.user.phoneNumber,
          })
          .then(() => {
            console.log('User added!');
          });
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  }
  const componentDidMount = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        var lat = parseFloat(position.coords.latitude);
        var long = parseFloat(position.coords.longitude);
        dispatch(
          CurrentPosition.actions.addCurrentPosition({
            latitude: lat,
            longitude: long,
          }),
        );
      },
      (error) => {
        console.log(error.message);
        dispatch(
          CurrentPosition.actions.addCurrentPosition({
            latitude: 10.8702,
            longitude: 106.8028,
          }),
        );
      },
      { enableHighAccuracy: true },
    );
  };
  useEffect(() => {
    componentDidMount();
  }, []);
  const getAdminAccount = async () => {
    let count = 0;
    await firestore()
      .collection('AdminAccounts')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((documentSnapshot) => {
          dataAccount.push(documentSnapshot.data());
          if (documentSnapshot.data().email == emailHasSignIn) {
            count = 1;
            dispatch(
              Globalreducer.actions.setidks(documentSnapshot.data()._id),
            );
            dispatch(
              Globalreducer.actions.setadminuid(
                documentSnapshot.data().adminuid,
              ),
            );
            dispatchSignedIn({
              type: 'UPDATE_SIGN_IN',
              payload: {
                userToken: documentSnapshot.data().roll,
                _id: documentSnapshot.data()._id,
              },
            });
          }
        });
      });
    if (count == 0) {
      dispatchSignedIn({
        type: 'UPDATE_SIGN_IN',
        payload: { userToken: 'signed-In', _id: '' },
      });
    }
  };
  useEffect(() => {
    if (emailHasSignIn != 'none') {
      getAdminAccount();
    } else {
      dispatchSignedIn({
        type: 'UPDATE_SIGN_IN',
        payload: { userToken: null, _id: '' },
      });
    }
  }, []);
  async function signIn({ email, password }) {
    try {
      const user = await auth().signInWithEmailAndPassword(email, password);
      let roll = 'signed-In';
      let _id = '';
      let adminuid = '';
      await firestore()
        .collection('AdminAccounts')
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((documentSnapshot) => {
            dataAccount.push(documentSnapshot.data());
          });
        });
      await dataAccount.filter((item) => {
        if (item.email === email) {
          roll = item.roll;
          _id = item._id;
          adminuid = item.adminuid;
        }
      });
      if (roll === 'adminks') {
        firestore()
          .collection('HotelList')
          .doc(_id)
          .get()
          .then((documentSnapshot) => {
            const data = documentSnapshot.data().Room;
            data.map((item1) => {
              item1.image.map(async (item2, index) => {
                const url = await storage()
                  .ref(_id + '/' + item1.id + '/' + item2)
                  .getDownloadURL();
                item1.image[index] = url;
              });
            });
            setTimeout(() => {
              dispatch(BookingHotel.actions.addRoom(data));
            }, 3000);
          });
      }
      setTimeout(() => {
        dispatch(Globalreducer.actions.setidks(_id));
        dispatch(Globalreducer.actions.setadminuid(adminuid));
        setAsyncStorage('userToken', roll + '-' + _id);
        if (user) {
          dispatchSignedIn({
            type: 'UPDATE_SIGN_IN',
            payload: { userToken: roll, _id: _id },
          });
        }
      }, 3000);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  }
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <Pressable
      onPress={() => {
        Keyboard.dismiss();
      }}
      style={{ flex: 1, backgroundColor: 'white' }}
    >
      <View>
        <Image
          source={require('../../../assets/Logo1.png')}
          style={{
            width: 200,
            height: 200,
            alignSelf: 'center',
            marginTop: 50,
          }}
        />
      </View>
      <View style={{ paddingHorizontal: 25, paddingTop: 20 }}>
        <Text
          style={{
            fontSize: 30,
            fontWeight: 'bold',
            color: 'black',
          }}
        >
          {t('sign-in')}
        </Text>
        <View style={{ marginTop: 20 }}>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              alignItems: 'center',
            }}
          >
            <Icon1 name="email" color={COLORS.grey} size={28} />
            <TextInput
              style={{
                height: 45,
                borderBottomWidth: 1,
                borderBottomColor: '#69b9f5',
                width: '90%',
                marginLeft: 10,
                fontSize: 16,
              }}
              placeholder={t('email')}
              onChangeText={(text) => setEmail(text)}
              value={email}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              alignItems: 'center',
              marginTop: 15,
            }}
          >
            <Icon1 name="lock" size={28} color={COLORS.grey} />
            <View
              style={{
                flexDirection: 'row',
                marginLeft: 10,
                alignItems: 'center',
                width: '90%',
                borderBottomWidth: 1,
                borderBottomColor: '#69b9f5',
              }}
            >
              <TextInput
                placeholder={t('password')}
                style={{ width: '90%' }}
                secureTextEntry={getVisible ? false : true}
                onChangeText={(text) => setPassword(text)}
                value={password}
              />
              <Icon
                name={getVisible ? 'visibility' : 'visibility-off'}
                iconStyle={{
                  color: COLORS.grey,
                }}
                type="material"
                onPress={() => setVisible(!getVisible)}
              />
            </View>
          </View>
          <TouchableOpacity>
            <Text
              style={{
                color: '#37a2f2',
                fontSize: 16,
                marginTop: 10,
                alignSelf: 'flex-end',
                fontWeight: 'bold',
              }}
            >
              {t('forgot-password')}{' '}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => signIn({ email, password })}
          >
            <Text
              style={{
                color: 'white',
                fontSize: 16,
                fontWeight: 'bold',
              }}
            >
              {t('log-in')}
            </Text>
          </TouchableOpacity>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 20,
            }}
          >
            <View
              style={{
                height: 1,
                backgroundColor: '#86939e',
                width: '44%',
              }}
            />
            <Text
              style={{
                color: '#86939e',
                fontSize: 16,
                marginHorizontal: '3%',
              }}
            >
              {t('or')}
            </Text>
            <View
              style={{
                height: 1,
                backgroundColor: '#86939e',
                width: '44%',
              }}
            />
          </View>
          <TouchableOpacity
            style={{
              height: 50,
              width: '100%',
              marginTop: 20,
              borderRadius: 12,
              alignItems: 'center',
              alignSelf: 'center',
              alignContent: 'center',
              justifyContent: 'center',
              backgroundColor: '#f4f2f2',
            }}
            onPress={() => onGoogleButtonPress()}
          >
            <Image
              source={require('../../../assets/logo_gg.png')}
              style={{
                width: 35,
                height: 35,
                alignSelf: 'center',
                position: 'absolute',
                left: 20,
              }}
            />
            <Text
              style={{
                color: 'black',
                fontSize: 16,
                fontWeight: 'bold',
              }}
            >
              {t('sign-in-with-google')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'center',
          justifyContent: 'center',
          marginTop: 30,
        }}
      >
        <Text
          style={{
            color: '#86939e',
            fontSize: 16,
          }}
        >
          {t('dont-have-an-account')}
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('SignUpScreen')}
          style={{ marginLeft: 5 }}
        >
          <Text
            style={{
              color: '#37a2f2',
              fontSize: 16,
              fontWeight: 'bold',
            }}
          >
            {t('sign-up')}
          </Text>
        </TouchableOpacity>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  textinput2: {
    borderWidth: 1,
    borderRadius: 12,
    marginHorizontal: 20,
    borderColor: '#86939e',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    paddingLeft: 15,
    marginBottom: 17,
  },
  button: {
    height: 50,
    width: '100%',
    marginTop: 30,
    borderRadius: 12,
    alignItems: 'center',
    alignSelf: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
  },
});
