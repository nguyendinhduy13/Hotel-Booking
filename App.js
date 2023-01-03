import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import React, { useEffect, useState } from 'react';
import { LogBox, PermissionsAndroid, View } from 'react-native';
import 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { SignInContextProvider } from './src/contexts/authContext';
import {
  getAsyncStorage,
  setAsyncStorage,
} from './src/functions/asyncStorageFunctions';
import i18n from './src/i18n/18n';
import Globalreducer from './src/redux/Globalreducer';
import RootNavigation from './src/view/navigation/RootNavigation';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications
console.disableYellowBox = true;
export default function App() {
  const dispatch = useDispatch();
  const requestLocation = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message:
            'Hotel Booking App needs access to your location ' +
            'so you can see your current location.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
    } catch (err) {
      console.warn(err);
    }
  };
  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('User account already exists:', user.email);
        dispatch(Globalreducer.actions.setEmailHasSignIn(user.email));
        firestore()
          .collection('Users')
          .doc(user.uid)
          .get()
          .then((documentSnapshot) => {
            if (documentSnapshot.exists) {
              dispatch(
                Globalreducer.actions.setNameUser(documentSnapshot.data()),
              );
            }
          });
      } else {
        console.log('User account does not exist');
        dispatch(Globalreducer.actions.setEmailHasSignIn('none'));
      }
    });
  }, []);

  const [wait, setWait] = useState(true);
  getAsyncStorage('isShow').then((value) => {
    if (value) {
      dispatch(Globalreducer.actions.setisShowStartScreen(value));
      console.log('isShowStartScreen: ' + value);
    }
  });

  const API_Province = 'https://provinces.open-api.vn/api/?depth=2';
  const formatName = async (json, dataHotel) => {
    //clear 'Tỉnh' or 'Thành phố' in name
    let data = [];
    let index = 0;
    await json.map((item) => {
      if (item.name.includes('Tỉnh')) {
        item.name = item.name.replace('Tỉnh ', '');
      } else if (item.name.includes('Thành phố')) {
        item.name = item.name.replace('Thành phố ', '');
      }

      let arr = [];
      let arrtemp = [];
      item.districts.map((item2) => {
        const temp = {
          name: item2.name,
          data: [],
        };
        arrtemp = [];
        for (let i = 0; i < dataHotel.length; i++) {
          if (
            item.name.includes(dataHotel[i].tag.split(',')[1]) &&
            item2.name.includes(dataHotel[i].tag.split(',')[0])
          ) {
            arrtemp.push(dataHotel[i]);
          }
        }
        temp.data = arrtemp;
        arr.push(temp);
      });
      let temp = {
        name: item.name,
        districts: arr,
        index: index,
      };
      data.push(temp);
      index++;
    });
    dispatch(Globalreducer.actions.setDataProvince(data));
    setWait(false);
  };

  const handleSort = (data) => {
    const temp = data.filter((item) => item.isActive === true);
    let c = 0;
    const sorted = [].concat(temp).sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
    sorted.map(async (item, index) => {
      const url = await storage()
        .ref(item.id + '/' + item.image)
        .getDownloadURL()
        .then((url) => {
          c++;
          return url;
        });
      item.image = url;
      if (c === sorted.length) {
        dispatch(Globalreducer.actions.setDataHotel(sorted));
        fetch(API_Province)
          .then((response) => response.json())
          .then((json) => {
            formatName(json, sorted);
          })
          .catch((error) => console.error(error));
      }
    });
  };

  useEffect(() => {
    firestore()
      .collection('ListHotel')
      .doc('ListHotel')
      .onSnapshot((documentSnapshot) => {
        handleSort(documentSnapshot.data().ListHotel);
      });
  }, []);

  let arr = {
    labels: [''],
    datasets: [
      {
        data: [0],
      },
    ],
  };
  const handleCalculate = async (data) => {
    if (data.length === 0) return;
    let nameHotel = data[0].hotelinfo.name;
    let total = 0;
    await data.forEach((item) => {
      if (item.hotelinfo.status === 'completed') {
        total += item.hotelinfo.total;
      }
    });

    arr.labels.push(nameHotel);
    arr.datasets[0].data.push(Number((total / 1000).toFixed(2)));
  };

  async function onResult(QuerySnapshot) {
    arr = {
      labels: [],
      datasets: [
        {
          data: [],
        },
      ],
    };
    await QuerySnapshot.forEach((documentSnapshot) => {
      handleCalculate(documentSnapshot.data().data);
    });
    dispatch(Globalreducer.actions.setDataReport(arr));
  }

  function onError(error) {
    console.error(error);
  }

  firestore().collection('ListBooking').onSnapshot(onResult, onError);

  useEffect(() => {
    getAsyncStorage('language').then((lang) => {
      console.log('languauge: ' + lang);
      if (lang) {
        i18n.changeLanguage(lang);
      } else {
        console.log('no language');
        i18n.changeLanguage('en');
        setAsyncStorage('language', 'en');
      }
    });
  }, []);

  const [theme, setTheme] = useState('');
  useEffect(() => {
    getAsyncStorage('theme').then((theme) => {
      if (theme) {
        console.log('theme: ' + theme);
        dispatch(Globalreducer.actions.setTheme(theme));
        setTheme(theme);
      } else {
        setTheme('light');
        console.log('no theme');
        setAsyncStorage('theme', 'light');
      }
    });
  }, []);

  useEffect(() => {
    requestLocation();
  }, []);

  return (
    <SignInContextProvider>
      {wait === false ? (
        <>
          <View style={{ flex: 1 }}>
            <RootNavigation />
          </View>
        </>
      ) : (
        <></>
      )}
    </SignInContextProvider>
  );
}
