import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import React, { useEffect } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function HomeScreen({ navigation }) {
  const [listHotel, setListHotel] = React.useState([]);
  let dataAccountFireBase = [];
  const loadAccount = async () => {
    await firestore()
      .collection('AdminAccounts')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((documentSnapshot) => {
          dataAccountFireBase.push(documentSnapshot.data());
        });
      });
    navigation.navigate('AddHotel', {
      data: dataAccountFireBase,
    });
  };

  const loadImage = async (data) => {
    data.map(async (item, index) => {
      const url = await storage()
        .ref(item.id + '/' + item.image)
        .getDownloadURL()
        .then((url) => {
          return url;
        });
      item.image = url;
    });
    setListHotel(data);
  };

  useEffect(() => {
    const subscriber = firestore()
      .collection('ListHotel')
      .doc('ListHotel')
      .onSnapshot((documentSnapshot) => {
        loadImage(documentSnapshot.data().ListHotel);
      });
    // Stop listening for updates when no longer required
    return () => subscriber();
  }, []);

  const loadAccount1 = async (item) => {
    if (item.image.split('.')[1] === 'jpg') {
      await storage()
        .ref(item.id + '/' + item.image)
        .getDownloadURL()
        .then((url) => {
          item.image = url;
        });
    }
    navigation.navigate('InfoHotel', {
      data: item,
    });
    console.log({
      data: item,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/logo.png')}
          style={{
            width: 60,
            height: 60,
            resizeMode: 'cover',
          }}
        />
        <Text style={styles.headerText}>Admin</Text>
        <Text style={styles.headerText}></Text>
      </View>
      <View style={styles.body}>
        <Text
          style={{
            color: 'black',
            fontWeight: 'bold',
            fontSize: 20,
          }}
        >
          Danh sách khách sạn
        </Text>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ marginTop: 10 }}
        >
          {listHotel.map((item, index) => {
            return (
              <TouchableOpacity
                style={styles.item}
                key={index}
                onPress={() => {
                  loadAccount1(item);
                }}
              >
                <Image
                  source={{
                    uri: 'https://cdn2.iconfinder.com/data/icons/coral-building/512/property-building-architecture-05-256.png',
                  }}
                  style={{ width: 50, height: 50 }}
                />
                <View style={{ marginLeft: 10 }}>
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 15,
                      fontWeight: 'bold',
                    }}
                  >
                    {item.name}
                  </Text>
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 15,
                      height: 20,
                      width: '50%',
                      marginTop: 5,
                    }}
                  >
                    {item.location}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        <TouchableOpacity
          style={styles.fab}
          onPress={() => {
            loadAccount();
          }}
        >
          <Text>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    color: '#000',
    fontSize: 25,
    fontWeight: 'bold',
  },
  body: {
    flex: 1,
    width: '100%',
    marginTop: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f6f4',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  fab: {
    position: 'absolute',
    width: 55,
    height: 55,
    backgroundColor: '#9fc5e8',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    right: 20,
    bottom: 20,
  },
});
