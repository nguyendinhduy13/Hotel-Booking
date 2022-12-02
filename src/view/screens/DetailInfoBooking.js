import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Auth from '@react-native-firebase/auth';
import COLORS from '../../consts/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
const DetailInfoBooking = ({ navigation }) => {
  const { t } = useTranslation();
  const { userbooking } = useSelector((state) => state.BookingHotel);
  return (
    <ScrollView>
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontSize: 15,
            marginTop: 10,
            color: COLORS.dark,
            left: 10,
          }}
        >
          Thông tin
        </Text>
        <View
          style={{
            backgroundColor: COLORS.white,
            width: '100%',
            marginTop: 10,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <View
              style={{
                marginTop: 4,
                flexDirection: 'row',
                left: 10,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 4,
                  left: 4,
                }}
              >
                <Text
                  style={{
                    color: COLORS.dark,
                    fontWeight: '600',
                    fontSize: 16,
                  }}
                >
                  {}
                  {'  '}
                </Text>
                <View
                  style={{
                    borderWidth: 0.5,
                    borderColor: COLORS.grey,
                    height: 20,
                  }}
                />
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '500',
                  }}
                >
                  {'  '}
                  {}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={{ marginTop: 6, right: 8 }}
              onPress={() => {
                navigation.navigate('Chỉnh sửa thông tin');
              }}
            >
              <Text style={{ fontSize: 17, color: COLORS.primary }}>Sửa</Text>
            </TouchableOpacity>
          </View>
          <Text style={{ marginHorizontal: 17, fontWeight: '500' }}>
            dia chi{' '}
          </Text>
          <View
            style={{
              borderWidth: 1,
              width: '100%',
              borderColor: '#d0d0d0',
              marginTop: 20,
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default DetailInfoBooking;
