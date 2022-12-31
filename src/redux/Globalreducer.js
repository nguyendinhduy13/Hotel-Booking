import { createSlice } from '@reduxjs/toolkit';

const today = new Date().toISOString().split('T')[0];
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
console.log(today + ' ' + tomorrow.toISOString().split('T')[0]);
const initialState = {
  dayamount: 1,
  startday: today,
  endday: tomorrow.toISOString().split('T')[0],
  namehotel: '',
  idhotel: '',
  data: [],
  id_ks: '',
  datatemp: [],
  adminuid: '',
  isShowStartScreen: true,
  emailHasSignIn: '',
  nameUser: '',
  nameCurrentCity: '',
  modalVisibleComment: false,
  dataHotel: [],
  dataDistrict: [],
  dataProvince: [],
  dataReport: [],
};

export default createSlice({
  name: 'global',
  initialState,
  reducers: {
    changedayamount(state, action) {
      state.dayamount = action.payload;
    },
    changestartday(state, action) {
      state.startday = action.payload;
    },
    changeendday(state, action) {
      state.endday = action.payload;
    },
    setnullvariable(state, action) {
      state.dayamount = action.payload;
      state.startday = action.payload;
      state.endday = action.payload;
    },
    setnamehotel(state, action) {
      state.namehotel = action.payload;
    },
    setidhotel(state, action) {
      state.idhotel = action.payload;
    },
    setdatabooking(state, action) {
      state.data.push(action.payload);
      console.log('data: ' + state.data);
    },
    setidks(state, action) {
      state.id_ks = action.payload;
    },
    setdatatemp(state, action) {
      state.datatemp = action.payload;
    },
    setadminuid(state, action) {
      state.adminuid = action.payload;
    },
    setisShowStartScreen(state, action) {
      state.isShowStartScreen = action.payload;
    },
    setEmailHasSignIn(state, action) {
      state.emailHasSignIn = action.payload;
    },
    setNameUser(state, action) {
      state.nameUser = action.payload;
    },
    setNameCurrentCity(state, action) {
      state.nameCurrentCity = action.payload;
      console.log('nameCurrentCity: ' + state.nameCurrentCity);
    },
    setModalVisibleComment(state, action) {
      state.modalVisibleComment = action.payload;
    },
    setDataHotel(state, action) {
      state.dataHotel = action.payload;
    },
    setDataDistrict(state, action) {
      state.dataDistrict = action.payload;
    },
    setDataProvince(state, action) {
      state.dataProvince = action.payload;
    },
    setDataReport(state, action) {
      state.dataReport = action.payload;
    },
  },
});
