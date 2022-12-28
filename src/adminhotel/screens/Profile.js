import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import React, { useContext } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { SignInContext } from '../../contexts/authContext';
import { setAsyncStorage } from '../../functions/asyncStorageFunctions';
import Globalreducer from '../../redux/Globalreducer';
export default function Profile() {
  const dispatch = useDispatch();
  const { dispatchSignedIn } = useContext(SignInContext);
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
  return (
    <View>
      <TouchableOpacity
        style={{ backgroundColor: 'red', height: 100 }}
        onPress={signOut}
      >
        <Text>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}
