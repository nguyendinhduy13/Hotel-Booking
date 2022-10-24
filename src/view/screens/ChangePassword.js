import React, { useState, useEffect, useRef } from 'react'
import { View, TextInput, Text, TouchableOpacity, StyleSheet, ToastAndroid } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../consts/colors'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { firebase } from '@react-native-firebase/auth';

const user = auth().currentUser;

const ChangePassword = ({ navigation }) => {
  const count = useRef(0);

  const [error, setError] = useState('');
  const [errornew, setErrornew] = useState('');
  const [errorconfirm, setErrorconfirm] = useState('');

  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [TrueOldPass, setTrueOldPass] = useState(false);
  const [TrueNewPass, setTrueNewPass] = useState(false);
  const [TrueConfirmPass, setTrueConfirmPass] = useState(false);

  const reauthenticate = (currentPassword) => {
    var cred = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword);
    return user.reauthenticateWithCredential(cred);
  }
  const handleCheck = async () => {
    if (password.length > 0) {
      try {
        await reauthenticate(password);
        setError('');
        setTrueOldPass(true);
      } catch (error) {
        console.log(error);
        setError('Mật khẩu hiện tại không đúng')
        setTrueOldPass(false);
      }
    }
    else {
      setError('Vui lòng nhập mật khẩu hiện tại')
      setTrueOldPass(false);
    }
  }
  const handleEnterPassword = (value) => {
    setError('');
    setTrueOldPass(false);
    setPassword(value)
  }
  const handleEnterNewPassword = (value) => {
    setErrornew('');
    setTrueNewPass(false);
    setNewPassword(value)
  }
  const handleEnterConfirmPassword = (value) => {
    setErrorconfirm('');
    setTrueConfirmPass(false);
    setConfirmPassword(value)
    count.current = count.current + 1;
  }
  useEffect(() => {
    if (count.current != 0 && password.length > 0 && newPassword.length > 0) {
      if (newPassword.length > 0) {
        if (newPassword.length < 6) {
          setErrornew('Mật khẩu phải có ít nhất 6 ký tự')
          setTrueNewPass(false);
        }
        else {
          setErrornew('');
          setTrueNewPass(true);
        }
      }
      else {
        setErrornew('Vui lòng nhập mật khẩu mới')
        setTrueNewPass(false);
      }
      if (confirmPassword.length > 0) {
        if (confirmPassword != newPassword) {
          setErrorconfirm('Mật khẩu xác nhận không khớp')
          setTrueConfirmPass(false);
        }
        else {
          setErrorconfirm('');
          setTrueConfirmPass(true);
        }
      }
      else {
        setErrorconfirm('Vui lòng nhập mật khẩu xác nhận')
        setTrueConfirmPass(false);
      }
    }
  }, [newPassword, confirmPassword])
  const onChangePassword = () => {
    if (TrueOldPass && TrueNewPass && TrueConfirmPass) {
      reauthenticate(password).then(() => {
        var user = firebase.auth().currentUser;
        user.updatePassword(newPassword).then(() => {
          console.log("Password updated!");
          ToastAndroid.show('Đổi mật khẩu thành công', ToastAndroid.SHORT);
          navigation.goBack()
        }).catch((error) => { console.log(error); });
      }).catch((error) => { console.log(error); });
    }
  }
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ marginTop: 20, }}>
        <Text style={{ marginLeft: 22 }}>Mật khẩu hiện tại</Text>
        <View>
          <TextInput
            placeholder='Mật khẩu hiện tại'
            style={{
              borderWidth: 1,
              borderRadius: 5,
              borderColor: error == '' ? '#d0d0d0' : 'red',
              width: 350,
              height: 55,
              alignSelf: 'center',
              marginTop: 5,
              paddingLeft: 10,
            }}
            onChangeText={(value) => handleEnterPassword(value)}
            selectTextOnFocus={true}
            showSoftInputOnFocus={true}
            onEndEditing={() => {
              handleCheck()
            }}
            on
            secureTextEntry={true}
          />
          <Icon name="done" size={error == '' && TrueOldPass ? 25 : 0} color="green" style={{ position: 'absolute', top: 20, right: 35 }} />
        </View>
        <Text style={{ color: 'red', marginLeft: 22, marginTop: 5, height: error == '' ? 0 : 'auto' }}>{error}</Text>
        <Text style={{ marginLeft: 22, marginTop: 20 }}>Mật khẩu mới</Text>
        <View>
          <TextInput
            placeholder='Mật khẩu mới'
            style={{
              borderWidth: 1,
              borderRadius: 5,
              borderColor: errornew == '' ? '#d0d0d0' : 'red',
              width: 350,
              height: 55,
              alignSelf: 'center',
              marginTop: 2,
              paddingLeft: 10,
            }}
            onChangeText={(value) => handleEnterNewPassword(value)}
            onEndEditing={() => {
              if (newPassword.length < 6) {
                setErrornew('Mật khẩu phải có ít nhất 6 ký tự')
                setTrueNewPass(false);
              }
              else {
                setErrornew('')
                setTrueNewPass(true);
              }
            }}
            secureTextEntry={true}
          />
          <Icon name="done" size={errornew == '' && TrueNewPass ? 25 : 0} color="green" style={{ position: 'absolute', top: 20, right: 35 }} />
        </View>
        <Text style={{ color: 'red', marginLeft: 22, marginTop: 5, height: errornew == '' ? 0 : 'auto' }}>{errornew}</Text>
        <View>
          <TextInput
            placeholder='Xác nhận mật khẩu mới'
            style={{
              borderWidth: 1,
              borderRadius: 5,
              width: 350,
              height: 55,
              marginTop: 20,
              alignSelf: 'center',
              borderColor: errorconfirm == '' ? '#d0d0d0' : 'red',
              paddingLeft: 10,
            }}
            onChangeText={(value) => handleEnterConfirmPassword(value)}
            secureTextEntry={true}
          />
        </View>
        <Text style={{ color: 'red', marginLeft: 22, marginTop: 5, height: errorconfirm == '' ? 0 : 'auto' }}>{errorconfirm}</Text>
      </View>
      <TouchableOpacity
        onPress={() => { onChangePassword() }}
        style={
          TrueOldPass && TrueNewPass && confirmPassword != '' ? styles.button : styles.buttonDisable
        }
      >
        <Text style={styles.text}>Hoàn thành</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ChangePassword
const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderColor: '#d0d0d0',
    height: 45,
    width: 370,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 10,
    backgroundColor: COLORS.primary,
    marginTop: 25
  },
  buttonDisable: {
    borderWidth: 1,
    borderColor: '#d0d0d0',
    height: 45,
    width: 370,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 10,
    backgroundColor: 'gray',
    marginTop: 25
  },
  text: {
    fontSize: 17,
    fontWeight: "600",
    color: "white"
  }
})