import { createSlice } from '@reduxjs/toolkit';

const today = new Date().toISOString().split('T')[0]
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
console.log(today + " " + tomorrow.toISOString().split('T')[0])
const initialState = {
    dayamount: 1,
    startday: today,
    endday: tomorrow.toISOString().split('T')[0],
    namehotel:'',
    idhotel:'',
    data:[],
    id_ks:'',
    datatemp:[],
    adminuid:'',
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
        state.dayamount = action.payload
        state.startday = action.payload
        state.endday = action.payload
      },
      setnamehotel(state, action) {
        state.namehotel = action.payload
      },
      setidhotel(state, action) {
        state.idhotel = action.payload
      },
      setdatabooking(state, action) {
        state.data.push(action.payload)
      },
      setidks(state, action) {
        state.id_ks = action.payload
      },
      setdatatemp(state, action) {
        state.datatemp=action.payload
      },
      setadminuid(state, action) {
        state.adminuid=action.payload
      }
    },
  },
);
