import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./authReducer";
import BookingHotel from "./BookingHotel";
import UserReducer from "./UserReducer";
import CurrentPosition from "./CurrentPosition";
import Globalreducer from "./Globalreducer";

const store = configureStore({
        reducer: {
                users: UserReducer.reducer,
                authToken: authReducer.reducer,
                BookingHotel: BookingHotel.reducer,
                currentPosition: CurrentPosition.reducer,
                Globalreducer: Globalreducer.reducer
        }
})

export default store;