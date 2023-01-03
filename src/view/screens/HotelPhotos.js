import React, { useState } from 'react';
import { Image, Modal, ScrollView, TouchableOpacity, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import CustomHeader from '../components/CustomHeader';
export default function HotelPhotos({ route, navigation }) {
  const [item, setItem] = useState(route.params);
  const [index, setIndex] = useState(0);
  const [itemzoom, setitemzoom] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const { colors } = useTheme();
  return (
    <ScrollView
      contentContainerStyle={
        !modalVisible
          ? {
              backgroundColor: colors.bg,
              flex: 1,
              paddingBottom: 20,
            }
          : {
              backgroundColor: colors.box,
              flex: 1,
              paddingBottom: 20,
            }
      }
    >
      <CustomHeader title={'gallery-photos'} />

      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {!modalVisible &&
          item.image.map((image, index) => (
            <TouchableOpacity
              onPress={() => {
                setModalVisible(!modalVisible),
                  setitemzoom(item),
                  setIndex(index);
              }}
            >
              <Image
                source={{ uri: image }}
                style={{
                  width: 160,
                  height: 150,
                  marginTop: 20,
                  marginHorizontal: 15,
                  borderRadius: 20,
                }}
              />
            </TouchableOpacity>
          ))}
      </View>
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <TouchableOpacity
          style={{ width: '100%', height: '100%' }}
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={{ alignItems: 'center', marginTop: '50%' }}>
            <Image
              source={{
                uri: modalVisible ? itemzoom.image[index] : item.image[0],
              }}
              style={{ width: 300, height: 290, borderRadius: 20 }}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </ScrollView>
  );
}
