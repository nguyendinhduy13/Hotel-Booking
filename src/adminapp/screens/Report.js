import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { useSelector } from 'react-redux';
const Report = () => {
  const { dataReport } = useSelector((state) => state.Globalreducer);
  const chartConfig = {
    backgroundColor: '#76a5af',
    backgroundGradientFrom: '#76a5af',
    backgroundGradientTo: '#8fd0dd',
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
  };
  const findMaxandMin = () => {
    //find max and min total in dataReport.datasets[0].data
    let max = {
      value: dataReport.datasets[0].data[0],
      index: 0,
    };
    let min = {
      value: dataReport.datasets[0].data[0],
      index: 0,
    };
    dataReport.datasets[0].data.forEach((item, index) => {
      if (item > max.value) {
        max.value = item;
        max.index = index;
      }
      if (item < min.value) {
        min.value = item;
        min.index = index;
      }
    });
    return { max, min };
  };
  const Format = (number) => {
    return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/logo.png')}
          style={{
            width: 35,
            height: 35,
            resizeMode: 'cover',
          }}
        />
        <Text style={styles.headerText}>Report</Text>
        <Text style={styles.headerText}></Text>
      </View>
      <ScrollView
        style={{
          width: '100%',
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            marginLeft: 10,
            marginTop: 10,
            color: 'black',
          }}
        >
          Doanh thu
        </Text>
        <BarChart
          data={dataReport}
          width={370}
          height={220}
          chartConfig={chartConfig}
          style={{
            marginVertical: 12,
            borderRadius: 16,
            paddingHorizontal: 10,
          }}
        />
        <View
          style={{
            width: '100%',
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              marginLeft: 10,
              color: 'black',
              marginTop: 10,
            }}
          >
            Chi tiết
          </Text>
          <View
            style={{
              marginTop: 10,
              width: '100%',
              padding: 10,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                borderWidth: 1,
                width: '100%',
                height: 100,
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
                    {dataReport.labels[findMaxandMin().max.index]}
                  </Text>
                  <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                    {Format(findMaxandMin().max.value * 1000)} VNĐ
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
                    {dataReport.labels[findMaxandMin().min.index]}
                  </Text>
                  <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                    {Format(findMaxandMin().min.value * 1000)} VNĐ
                  </Text>
                </View>
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
            Danh sách khách sạn
          </Text>
          {dataReport.labels.map((item, index) => {
            return (
              <View key={index} style={{ width: '100%', padding: 10 }}>
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
                    {item}
                  </Text>
                  <Text
                    style={{
                      marginLeft: 10,
                      fontSize: 16,
                      fontWeight: 'bold',
                      color: 'orange',
                    }}
                  >
                    {Format(dataReport.datasets[0].data[index] * 1000)} VNĐ
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default Report;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  headerText: {
    color: '#000',
    fontSize: 25,
    fontWeight: 'bold',
  },
});
