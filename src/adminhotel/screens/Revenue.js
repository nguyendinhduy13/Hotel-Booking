import firestore from '@react-native-firebase/firestore';
import React, { useEffect } from 'react';
import { FlatList, ScrollView, Text, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useSelector } from 'react-redux';
import COLORS from '../../consts/colors';

export default function Revenue({ navigation }) {
  const { dataRevenue, id_ks } = useSelector((state) => state.Globalreducer);
  //tao bang dât khác = datarevenue nếu k thì cho 1 cái dât temp
  const [best, setBest] = React.useState(0);
  const [worst, setWorst] = React.useState(0);
  const [namebest, setNamebest] = React.useState('');
  const [nameworst, setNameworst] = React.useState('');
  const [data, setData] = React.useState([]);
  const [total, setTotal] = React.useState(0);
  const [exists, setExists] = React.useState(true);

  useEffect(() => {
    if (dataRevenue.datasets[0].data[0] === 0) {
      setExists(false);
    } else {
      setExists(true);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      let a = 0;
      let b = 1000000000000000;
      let name = '';
      let name1 = '';
      let total = 0;
      firestore()
        .collection('ListBooking')
        .doc(id_ks)
        .get()
        .then(async (documentSnapshot) => {
          if (documentSnapshot.exists) {
            const data1 = documentSnapshot.data().data;
            setData(data1);
            await data1.forEach((item) => {
              if (item.hotelinfo.status === 'completed') {
                total += item.hotelinfo.price;
                if (item.hotelinfo.price > a) {
                  a = item.hotelinfo.price;
                  name = item.hotelinfo.roomname;
                }
                if (item.hotelinfo.price < b) {
                  b = item.hotelinfo.price;
                  name1 = item.hotelinfo.roomname;
                }
              }
            });
            setTotal(total);
            setBest(a);
            setNamebest(name);
            setNameworst(name1);
            setWorst(b);
          } else {
            setExists(false);
          }
        });
    });
    return unsubscribe;
  }, [navigation]);
  const renderItem = ({ item }) => {
    return (
      <View style={{ width: '100%', padding: 10 }}>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            alignItems: 'center',
            height: 50,
            borderWidth: 1,
            borderRadius: 10,
            padding: 10,
            borderColor: 'orange',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: 'black',
            }}
          >
            {item.hotelinfo.roomname}
          </Text>
          <Text
            style={{
              marginLeft: 10,
              fontSize: 16,
              fontWeight: 'bold',
              color: 'orange',
            }}
          >
            {item.hotelinfo.price}
          </Text>
        </View>
      </View>
    );
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}
    >
      {exists ? (
        <View>
          <Text
            style={{
              fontSize: 20,
              color: COLORS.dark,
              fontWeight: '700',
              justifyContent: 'center',
              alignSelf: 'center',
              marginTop: 10,
            }}
          >
            Doanh thu trong một tháng vừa qua{' '}
          </Text>
          <ScrollView>
            <LineChart
              data={dataRevenue}
              width={380} // from react-native
              height={220}
              yAxisLabel="$"
              yAxisSuffix="k"
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                backgroundColor: '#e26a00',
                backgroundGradientFrom: COLORS.primary,
                backgroundGradientTo: COLORS.primary,
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: '6',
                  strokeWidth: '2',
                  stroke: '#ffa726',
                },
              }}
              bezier
              style={{
                alignSelf: 'center',
                marginVertical: 20,
                borderRadius: 16,
              }}
            />
            <Text
              style={{
                fontSize: 18,
                marginHorizontal: 10,
                color: COLORS.dark,
                fontWeight: '700',
              }}
            >
              Tổng doanh thu của tháng này
            </Text>
            <View
              style={{
                width: '98%',
                borderWidth: 1,
                borderRadius: 10,
                height: 50,
                marginVertical: 10,
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: 'black',
                }}
              >
                {total}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                borderWidth: 1,
                width: '98%',
                alignSelf: 'center',
                height: 120,
                marginTop: 10,
                borderRadius: 10,
              }}
            >
              <View
                style={{
                  width: '50%',
                  padding: 10,
                  alignItems: 'center',
                  borderRightWidth: 1,
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: 'black',
                  }}
                >
                  Cao nhất
                </Text>
                <View
                  style={{
                    alignItems: 'center',
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: 'bold',
                      color: 'orange',
                    }}
                  >
                    {namebest}
                  </Text>
                  <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                    {best}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: '50%',
                  padding: 10,
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: 'black',
                  }}
                >
                  Thấp nhất
                </Text>
                <View
                  style={{
                    alignItems: 'center',
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: 'bold',
                      color: 'orange',
                    }}
                  >
                    {nameworst}
                  </Text>
                  <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                    {worst}
                  </Text>
                </View>
              </View>
            </View>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                marginLeft: 10,
                color: 'black',
                marginTop: 10,
              }}
            >
              Danh sách phòng
            </Text>
            <FlatList
              style={{ paddingBottom: 40 }}
              showsHorizontalScrollIndicator={false}
              data={data}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
            />
          </ScrollView>
        </View>
      ) : (
        <View
          style={{ alignItems: 'center', justifyContent: 'center', top: '50%' }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: 'black',
            }}
          >
            Hiện khách sạn chưa có doanh thu
          </Text>
        </View>
      )}
    </View>
  );
}
