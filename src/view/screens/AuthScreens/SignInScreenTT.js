import Geolocation from '@react-native-community/geolocation';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Image,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { useTheme } from 'react-native-paper';
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
  const { colors } = useTheme();
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
        if (user.additionalUserInfo.isNewUser) {
          firestore()
            .collection('Users')
            .doc(auth().currentUser.uid)
            .set({
              email: user.user.email,
              name: user.user.displayName,
              phone: user.user.phoneNumber,
              type: 'google',
            })
            .then(() => {
              console.log('User added!');
              Globalreducer.actions.setNameUser({
                email: user.user.email,
                name: user.user.displayName,
                phone: user.user.phoneNumber,
                type: 'google',
              });
            });
        }
        dispatchSignedIn({
          type: 'UPDATE_SIGN_IN',
          payload: { userToken: 'user' },
        });
      }
    } catch (error) {
      console.log(error);
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
    let roll = '';
    let idks = '';
    await firestore()
      .collection('AdminAccounts')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((documentSnapshot) => {
          dataAccount.push(documentSnapshot.data());
          if (documentSnapshot.data().email == emailHasSignIn) {
            count = 1;
            roll = documentSnapshot.data().roll;
            idks = documentSnapshot.data().id;
            dispatch(Globalreducer.actions.setidks(documentSnapshot.data().id));
            dispatch(
              Globalreducer.actions.setadminuid(
                documentSnapshot.data().adminuid,
              ),
            );
          }
        });
      });

    if (count == 0) {
      dispatchSignedIn({
        type: 'UPDATE_SIGN_IN',
        payload: { userToken: 'signed-In', _id: '' },
      });
    } else {
      firestore()
        .collection('HotelList')
        .doc(idks)
        .get()
        .then((documentSnapshot) => {
          const data = documentSnapshot.data().Room;
          data.map((item1) => {
            item1.image.map(async (item2, index) => {
              const url = await storage()
                .ref(idks + '/' + item1.id + '/' + item2)
                .getDownloadURL();
              item1.image[index] = url;
            });
          });
          setTimeout(() => {
            dispatch(BookingHotel.actions.addRoom(data));
          }, 3000);
        });
      setTimeout(() => {
        dispatchSignedIn({
          type: 'UPDATE_SIGN_IN',
          payload: {
            userToken: roll,
            _id: idks,
          },
        });
      }, 3000);
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
      if (email == '' || password == '') {
        ToastAndroid.show(t('please-fill-all-information'), ToastAndroid.SHORT);
      } else {
        const user = await auth().signInWithEmailAndPassword(email, password);
        let roll = 'signed-In';
        let id = '';
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
            id = item.id;
            adminuid = item.adminuid;
            dispatch(Globalreducer.actions.setEmailAdmin(item.email));
          }
        });
        firestore()
          .collection('HotelList')
          .doc(id)
          .get()
          .then((documentSnapshot) => {
            const data = documentSnapshot.data().Room;
            data.map((item1) => {
              item1.image.map(async (item2, index) => {
                const url = await storage()
                  .ref(id + '/' + item1.id + '/' + item2)
                  .getDownloadURL();
                item1.image[index] = url;
              });
            });
            setTimeout(() => {
              dispatch(BookingHotel.actions.addRoom(data));
            }, 3000);
          });

        setTimeout(() => {
          dispatch(Globalreducer.actions.setidks(id));
          dispatch(Globalreducer.actions.setadminuid(adminuid));
          setAsyncStorage('userToken', roll + '-' + id);
          if (user) {
            dispatchSignedIn({
              type: 'UPDATE_SIGN_IN',
              payload: { userToken: roll, _id: id },
            });
          }
        }, 3000);
      }
    } catch (error) {
      if (error.code == 'auth/user-not-found') {
        ToastAndroid.show(t('email-not-found'), ToastAndroid.SHORT);
      } else if (error.code == 'auth/wrong-password') {
        ToastAndroid.show(t('wrong-password'), ToastAndroid.SHORT);
      } else {
        ToastAndroid.show(t('error'), ToastAndroid.SHORT);
      }
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
      style={{ flex: 1, backgroundColor: colors.bg }}
    >
      <View>
        <Image
          source={require('../../../assets/Logo1.png')}
          style={{
            width: 230,
            height: 230,
            alignSelf: 'center',
            marginTop: 30,
          }}
        />
      </View>
      <View style={{ paddingHorizontal: 25, paddingTop: 20 }}>
        <Text
          style={{
            fontSize: 30,
            fontWeight: 'bold',
            color: colors.text,
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
                color: colors.text,
              }}
              placeholder={t('email')}
              placeholderTextColor={colors.icon}
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
                color: colors.text,
              }}
            >
              <TextInput
                placeholder={t('password')}
                placeholderTextColor={colors.icon}
                style={{ width: '90%', color: colors.text, fontSize: 16 }}
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
                color: colors.icon,
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
              backgroundColor: colors.box,
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
                color: colors.text,
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
            color: colors.icon,
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
