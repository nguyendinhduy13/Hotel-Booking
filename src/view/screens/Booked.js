import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon2 from 'react-native-vector-icons/AntDesign';
import COLORS from '../../consts/colors';
import Calendar from 'react-native-calendars/src/calendar';
export default function Booked({ navigation, route }) {
  const item = route.params;
  const [day, setDay] = useState('');
  const [Number, setNumber] = useState(0);
  const [dateString, setDateString] = useState('');
  return (
    <View style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <View style={{ flexDirection: 'row' }}>
        <Icon2
          onPress={() => { }}
          name="arrowleft"
          size={30}
          style={{ color: COLORS.dark, marginLeft: 15, marginTop: 15 }}
        />
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            marginTop: 16,
            marginLeft: 10,
            color: COLORS.dark,
          }}>
          Select Date
        </Text>
      </View>
      <Calendar
        onDayPress={day => {
          setDay(day), setDateString(day.dateString);
        }}
        markedDates={{
          '2022-09-21': {
            marked: true,
            dotColor: 'red',
            selectedColor: COLORS.primary,
            selected: true,
          },
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 23,
          marginTop: 20,
        }}>
        <Text style={styles.Text}>Check in</Text>
        <Text style={styles.Text}>Check out</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: 15,
          justifyContent: 'space-between',
          marginTop: 10,
        }}>
        <View
          style={{
            borderWidth: 0.9,
            width: 150,
            height: 50,
            borderRadius: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={{ fontWeight: '500', marginLeft: 5, color: COLORS.dark }}>
            Dec 16
          </Text>
          <Icon2
            name="calendar"
            style={{ marginRight: 5, color: COLORS.dark }}
            size={20}
          />
        </View>
        <View
          style={{
            borderWidth: 0.9,
            width: 150,
            height: 50,
            borderRadius: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={{ fontWeight: '500', marginLeft: 5, color: COLORS.dark }}>
            Dec 16
          </Text>
          <Icon2
            name="calendar"
            style={{ marginRight: 5, color: COLORS.dark }}
            size={20}
          />
        </View>
      </View>
      <Text
        style={{
          fontSize: 18,
          color: COLORS.dark,
          fontWeight: 'bold',
          marginTop: 10,
          marginLeft: 23,
        }}>
        Guest
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          width: 350,
          alignSelf: 'center',
          height: 55,
          alignItems: 'center',
          borderRadius: 10,
          marginTop: 10,
        }}>
        <TouchableOpacity
          style={{
            width: 50,
            backgroundColor: COLORS.blurprimary,
            height: 40,
            alignItems: 'center',
            borderRadius: 15,
          }}
          onPress={() => {
            setNumber(Number > 0 ? Number - 1 : Number);
          }}>
          <Text style={{ fontSize: 30, color: COLORS.primary }}>-</Text>
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 20,
            marginTop: 3,
            fontWeight: 'bold',
            color: COLORS.black,
            marginHorizontal: 30,
          }}>
          {Number}
        </Text>
        <TouchableOpacity
          style={{
            width: 50,
            backgroundColor: COLORS.blurprimary,
            height: 40,
            alignItems: 'center',
            borderRadius: 15,
          }}
          onPress={() => setNumber(Number + 1)}>
          <Text style={{ fontSize: 30, color: COLORS.primary }}>+</Text>
        </TouchableOpacity>
      </View>
      <Text
        style={{
          alignSelf: 'center',
          paddingTop: 30,
          fontSize: 20,
          fontWeight: 'bold',
          color: COLORS.dark,
        }}>
        Total: $435
      </Text>
      <TouchableOpacity
        style={{
          backgroundColor: COLORS.primary,
          height: 45,
          width: 350,
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 20,
          marginTop: 15,
        }}
        onPress={() => navigation.navigate('BookedCT', item)}>
        <Text style={{ fontSize: 15, fontWeight: 'bold', color: COLORS.white }}>
          Continue
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  Text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.dark,
  },
});
