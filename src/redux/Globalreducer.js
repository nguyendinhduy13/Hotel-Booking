import { createSlice } from '@reduxjs/toolkit';

const today = new Date().toISOString().split('T')[0]
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
console.log(today + " " + tomorrow.toISOString().split('T')[0])
const initialState = {
  dayamount: 1,
  startday: today,
  endday: tomorrow.toISOString().split('T')[0],
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
    }
  },
});
