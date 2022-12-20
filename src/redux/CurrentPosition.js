import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  position: {
    latitude: 0,
    longitude: 0,
  },
};

export default createSlice({
  name: 'currentPosition',
  initialState,
  reducers: {
    addCurrentPosition(state, action) {
      state.position = action.payload;
      console.log(
        'Current position: ' +
          state.position.latitude +
          ' ' +
          state.position.longitude,
      );
    },
  },
});
