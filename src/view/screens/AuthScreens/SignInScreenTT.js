import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon2 from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/FontAwesome';
import { SocialIcon, Icon } from 'react-native-elements';
import COLORS from '../../../consts/colors';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import auth from '@react-native-firebase/auth';
import { SignInContext } from '../../../contexts/authContext';
import firestore from '@react-native-firebase/firestore';
import storage from "@react-native-firebase/storage"
import Globalreducer from '../../../redux/Globalreducer';
import BookingHotel from '../../../redux/BookingHotel';

import { useTranslation } from 'react-i18next';
export default function SignInScreenTT({ navigation }) {
  const { dispatchSignedIn } = useContext(SignInContext);
  const [getVisible, setVisible] = useState(false);
  let dataAccount = [];
  const dispatch = useDispatch();
  useEffect(() => {
    firestore()
      .collection('AdminAccounts')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((documentSnapshot) => {
          dataAccount.push(documentSnapshot.data());
        });
      });
  }, []);

async function signIn(data) {
        try {
            const { password, email } = data;
            const user = await auth().signInWithEmailAndPassword(
                email,
                password,
            );
            let roll = 'signed-In';
            let _id = '';
            let adminuid = '';
            dataAccount.filter(item => {
                if (item.email === email) {
                    roll = item.roll;
                    _id = item._id;
                    adminuid = item.adminuid;
                }
            });
            if(roll==='adminks'){
                firestore()
        .collection('HotelList')
        .doc(_id)
        .get()
        .then(documentSnapshot => {
            const data = documentSnapshot.data().Room;
            data.map((item1) => {
                item1.image.map(async(item2,index)=>{
                    const url = await storage()
                    .ref(_id + '/' + item1.id + '/' + item2)
                    .getDownloadURL()
                    item1.image[index] = url
                })
            })
            setTimeout(() => {
                console.log(data)
                dispatch(BookingHotel.actions.addRoom(data));
            }, 3000);
        });  
            }
            setTimeout(() => {
                dispatch(Globalreducer.actions.setidks(_id))
                dispatch(Globalreducer.actions.setadminuid(adminuid))
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
      dispatch(Globalreducer.actions.setidks(_id));
      dispatch(Globalreducer.actions.setadminuid(adminuid));
      if (user) {
        dispatchSignedIn({
          type: 'UPDATE_SIGN_IN',
          payload: { userToken: roll, _id: _id },
        });
    }
  }
  const { t } = useTranslation();
  return (
    <View>
      <Icon2
        onPress={() => navigation.goBack()}
        name="arrowleft"
        size={30}
        style={{ color: COLORS.dark, marginLeft: 15, marginTop: 15 }}
      />
      <View style={{ alignItems: 'center', paddingTop: '13%' }}>
        <Text
          style={{
            fontSize: 30,
            fontWeight: 'bold',
            color: COLORS.dark,
          }}
        >
            {t('sign-in')}
        </Text>
      </View>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={(values) => {
          signIn(values);
        }}
      >
        {(props) => (
          <View>
            <View>
              <View style={{ paddingTop: '15%' }}>
                <View style={styles.textinput2}>
                  <Icon1 name="email" color={COLORS.grey} size={20} />
                  <TextInput
                    placeholder={t('email')}
                    style={{ width: '90%' }}
                    onChangeText={props.handleChange('email')}
                    value={props.values.email}
                  />
                </View>
                <View style={[styles.textinput2, { marginTop: 10 }]}>
                  <Icon3 name="lock" size={20} color={COLORS.grey} />
                  <TextInput
                    placeholder={t('password')}
                    style={{ width: '76%' }}
                    secureTextEntry={getVisible ? false : true}
                    onChangeText={props.handleChange('password')}
                    value={props.values.password}
                  />
                  <Icon
                    name={getVisible ? 'visibility' : 'visibility-off'}
                    iconStyle={{
                      color: COLORS.grey,
                      marginRight: 10,
                    }}
                    type="material"
                    onPress={() => setVisible(!getVisible)}
                  />
                </View>
              </View>
            </View>
            <TouchableOpacity
              style={{ alignItems: 'center', paddingTop: 10 }}
              onPress={props.handleSubmit}
            >
              <View style={styles.button}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: COLORS.white,
                  }}
                >
                    {t('sign-in')}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
      <TouchableOpacity style={{ paddingTop: '7%' }}>
        <View style={{ alignItems: 'center' }}>
          <Text
            style={{
              fontSize: 14,
              color: COLORS.primary,
              fontWeight: 'bold',
            }}
          >
                {t('forgot-password')}
          </Text>
        </View>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingTop: '10%',
        }}
      >
        <View
          style={{
            flex: 1,
            height: 0.5,
            backgroundColor: COLORS.grey,
          }}
        />
        <View>
          <Text
            style={{
              width: 130,
              fontSize: 17,
              color: COLORS.dark,
              textAlign: 'center',
            }}
          >
                {t('or-continue-with')}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            height: 0.5,
            backgroundColor: COLORS.grey,
          }}
        />
      </View>

      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            paddingTop: '7%',
          }}
        >
          <SocialIcon button type="google" style={{ width: 100 }} />
          <SocialIcon button type="facebook" style={{ width: 100 }} />
        </View>
      </View>
      <View>
        <View
          style={{
            paddingTop: '10%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ fontSize: 14, color: COLORS.grey }}>
                {t('dont-have-an-account')} {' '}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
            <Text
              style={{
                color: COLORS.primary,
                fontSize: 14,
                fontWeight: 'bold',
              }}
            >
                {t('sign-up')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
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
    width: '90%',
    marginTop: 10,
    borderRadius: 12,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
  },
});
