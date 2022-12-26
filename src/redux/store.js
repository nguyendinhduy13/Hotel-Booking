import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authReducer';
import BookingHotel from './BookingHotel';
import CurrentPosition from './CurrentPosition';
import Globalreducer from './Globalreducer';
import UserReducer from './UserReducer';

const store = configureStore({
  reducer: {
    users: UserReducer.reducer,
    authToken: authReducer.reducer,
    BookingHotel: BookingHotel.reducer,
    currentPosition: CurrentPosition.reducer,
    Globalreducer: Globalreducer.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
