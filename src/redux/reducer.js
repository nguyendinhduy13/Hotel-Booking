import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authReducer';
import BookingHotel from './BookingHotel';
import CurrentPosition from './CurrentPosition';
import Globalreducer from './Globalreducer';
import UserReducer from './UserReducer';
const rootReducer = combineReducers({
  users: UserReducer,
  authToken: authReducer,
  BookingHotel: BookingHotel,
  Globalreducer: Globalreducer,
  CurrentPosition: CurrentPosition,
});

export default rootReducer;
