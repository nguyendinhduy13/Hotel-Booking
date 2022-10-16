import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./authReducer";
import BookingHotel from "./BookingHotel";
import UserReducer from "./UserReducer";
import CurrentPosition from "./CurrentPosition";

const store = configureStore({
        reducer: {
                users: UserReducer.reducer,
                authToken: authReducer.reducer,
                bookingHotel: BookingHotel.reducer,
                currentPosition: CurrentPosition.reducer,
        }
})

export default store;