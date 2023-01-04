import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, ScrollView, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import CustomHeader from '../components/CustomHeader';
export default function InfoBooking({ navigation, route }) {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const item = route.params.item;
  const user = route.params.user;
  const Format = (prices) => {
    return prices.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  };
  const FormatName1 = (name) => {
    if (name.length > 55) {
      return name.substring(0, 55) + '...';
    }
    return name;
  };
  return (
    <View style={{ flex: 1 }}>
      <CustomHeader title={t('booking-infomation')} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          backgroundColor: colors.special,
        }}
      >
        <View
          style={{
            width: '100%',
            backgroundColor: colors.bg,
            marginTop: 10,
          }}
        >
          <View style={{ padding: 15 }}>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  paddingVertical: 10,
                }}
              >
                <Image
                  style={{
                    width: 120,
                    height: 100,
                    borderRadius: 10,
                  }}
                  source={{ uri: item.image }}
                />
                <View style={{ marginLeft: 10 }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: 'bold',
                      color: colors.icon,
                    }}
                  >
                    {item.name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                      color: colors.text,
                      width: 200,
                      height: 'auto',
                      marginTop: 5,
                    }}
                  >
                    {FormatName1(item.roomname)}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: '100%',
                  height: 1,
                  backgroundColor: '#E5E5E5',
                  marginTop: 10,
                }}
              />
            </View>
          </View>
        </View>
        <View
          style={{
            backgroundColor: colors.bg,
            height: 'auto',
            width: '100%',
            alignSelf: 'center',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              alignItems: 'center',
              paddingHorizontal: 15,
            }}
          >
            <Text
              style={{ fontWeight: '500', fontSize: 17, color: colors.icon }}
            >
              {t('check-in')}
            </Text>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 17,
                color: colors.text,
              }}
            >
              {item.checkin}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              alignItems: 'center',
              paddingHorizontal: 15,
              marginTop: 10,
            }}
          >
            <Text
              style={{ fontWeight: '500', fontSize: 17, color: colors.icon }}
            >
              {t('check-out')}
            </Text>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 17,
                color: colors.text,
              }}
            >
              {item.checkout}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              alignItems: 'center',
              paddingHorizontal: 15,
              marginTop: 10,
              marginBottom: 20,
            }}
          >
            <Text
              style={{ fontWeight: '500', fontSize: 17, color: colors.icon }}
            >
              {t('number-people')}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 17,
                  color: colors.text,
                  marginHorizontal: 10,
                }}
              >
                {item.guess}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            backgroundColor: colors.bg,
            height: 190,
            width: '100%',
            marginTop: 10,
            padding: 15,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Text
              style={{ fontSize: 20, fontWeight: 'bold', color: colors.text }}
            >
              {t('booker-information')}
            </Text>
          </View>
          <View style={{ marginTop: 5 }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 17,
                  color: colors.icon,
                }}
              >
                {t('name')}
              </Text>
              <Text
                style={{
                  fontSize: 17,
                  color: colors.text,
                  fontWeight: 'bold',
                }}
              >
                {user.name}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 17,
                  color: colors.icon,
                }}
              >
                {t('phone')}
              </Text>
              <Text
                style={{
                  fontSize: 17,
                  color: colors.text,
                  fontWeight: 'bold',
                }}
              >
                {user.phone}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 17,
                  color: colors.icon,
                }}
              >
                {t('email')}
              </Text>
              <Text
                style={{
                  fontSize: 17,
                  color: colors.text,
                  fontWeight: 'bold',
                }}
              >
                {user.email}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 17,
                  color: colors.icon,
                }}
              >
                {t('age')}
              </Text>
              <Text
                style={{
                  fontSize: 17,
                  color: colors.text,
                  fontWeight: 'bold',
                }}
              >
                {user.birthday}
              </Text>
            </View>
          </View>
        </View>
        <View style={{ marginTop: 10 }}>
          <View
            style={{
              backgroundColor: colors.bg,
              width: '100%',
              padding: 15,
            }}
          >
            <Text
              style={{ fontSize: 20, fontWeight: 'bold', color: colors.text }}
            >
              {t('payment')}
            </Text>
            <View
              style={{
                marginTop: 10,
                alignItems: 'center',
                flexDirection: 'row',
              }}
            >
              <Image
                source={{
                  uri: 'https://cdn4.iconfinder.com/data/icons/business-1221/24/Inflation-256.png',
                }}
                style={{
                  width: 30,
                  height: 30,
                }}
              />
              <Text
                style={{
                  fontSize: 17,
                  color: colors.text,
                  marginLeft: 10,
                }}
              >
                {t('payment-at-hotel')}
              </Text>
            </View>
          </View>
        </View>
        <View style={{ marginTop: 10 }}>
          <View
            style={{
              backgroundColor: colors.bg,
              width: '100%',
              padding: 15,
              marginBottom: 10,
            }}
          >
            <Text
              style={{ fontSize: 20, fontWeight: 'bold', color: colors.text }}
            >
              {t('payment-details')}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 10,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Image
                  source={{
                    uri: 'https://cdn4.iconfinder.com/data/icons/office-business-1/512/money-256.png',
                  }}
                  style={{ width: 30, height: 30 }}
                />
                <Text
                  style={{
                    fontSize: 17,
                    color: colors.text,
                    marginLeft: 10,
                  }}
                >
                  {t('cost-of-room')}
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 17,
                  color: colors.text,
                }}
              >
                {Format(item.price)}
              </Text>
            </View>
            <View
              style={{
                width: '100%',
                height: 1,
                backgroundColor: '#E5E5E5',
                marginTop: 20,
              }}
            />
            <View
              style={{
                marginTop: 10,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Text
                style={{ fontSize: 20, color: colors.text, fontWeight: 'bold' }}
              >
                {t('total')}
              </Text>
              <Text
                style={{ fontSize: 22, color: colors.text, fontWeight: 'bold' }}
              >
                {' '}
                {Format(item.price)} đ
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
