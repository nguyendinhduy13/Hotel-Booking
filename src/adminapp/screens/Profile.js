import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import React, { useContext, useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon5 from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import { useDispatch } from 'react-redux';
import { SignInContext } from '../../contexts/authContext';
import { setAsyncStorage } from '../../functions/asyncStorageFunctions';
import Globalreducer from '../../redux/Globalreducer';
export default function Profile({ navigation }) {
  const { dispatchSignedIn } = useContext(SignInContext);
  const dispatch = useDispatch();
  async function signOut() {
    try {
      auth()
        .signOut()
        .then(() => {
          GoogleSignin.revokeAccess();
          GoogleSignin.signOut();
          dispatch(Globalreducer.actions.setEmailHasSignIn('none'));
          dispatchSignedIn({
            type: 'UPDATE_SIGN_IN',
            payload: { userToken: null, _id: '' },
          });
        });
      setAsyncStorage('userToken', '');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  }
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    !isEnabled ? console.log('Dark Mode') : console.log('Light Mode');
  };
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ backgroundColor: 'white', elevation: 15 }}>
        <View style={styles.heaerProfile}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginRight: 20,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text
                style={{ fontSize: 27, fontWeight: 'bold', color: 'black' }}
              >
                Admin
              </Text>
            </View>
          </View>
          <Text style={{ color: 'black', fontSize: 15, paddingTop: 5 }}>
            0976124912
          </Text>
          <Text style={{ color: 'black', fontSize: 15, paddingTop: 5 }}>
            {auth().currentUser.email}
          </Text>
        </View>
      </View>
      <ScrollView style={{ backgroundColor: 'white', marginVertical: 10 }}>
        <View style={styles.bodyProfile}>
          <Text style={styles.tittle}>Thông tin</Text>
          <View style={[styles.view, { justifyContent: 'space-between' }]}>
            <View style={{ flexDirection: 'row' }}>
              <Icon1 name="phonelink-setup" size={25} />
              <Text
                style={{ fontSize: 16, paddingHorizontal: 15, color: 'black' }}
              >
                Phiên bản
              </Text>
            </View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                paddingHorizontal: 15,
                color: 'orange',
              }}
            >
              14.3.1
            </Text>
          </View>
          <TouchableOpacity
            style={styles.view}
            onPress={() => {
              signOut();
            }}
          >
            <Icon5 name="logout" size={25} />
            <Text
              style={{ fontSize: 16, paddingHorizontal: 15, color: 'black' }}
            >
              Đăng suất
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 17,
    fontWeight: '600',
    marginTop: 5,
    marginHorizontal: 15,
  },
  heaerProfile: {
    width: '100%',
    paddingBottom: 15,
    marginHorizontal: 10,
  },
  bodyProfile: {
    marginHorizontal: 10,
  },
  tittle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 10,
  },
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#d9cccc',
    paddingTop: 15,
    paddingBottom: 15,
  },
});
