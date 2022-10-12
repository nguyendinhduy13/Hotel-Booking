import {combineReducers} from "@reduxjs/toolkit"
import authReducer from "./authReducer";
import BookingHotel from "./BookingHotel";
import UserReducer from "./UserReducer";
const rootReducer=combineReducers({
        users:UserReducer,
        authToken:authReducer,
        bookingHotel:BookingHotel
})

export default rootReducer;