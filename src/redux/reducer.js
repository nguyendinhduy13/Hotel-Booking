import {combineReducers} from "@reduxjs/toolkit"
import authReducer from "./authReducer";
import BookingHotel from "./BookingHotel";
import Globalreducer from "./Globalreducer";
import UserReducer from "./UserReducer";
const rootReducer=combineReducers({
        users:UserReducer,
        authToken:authReducer,
        BookingHotel:BookingHotel,
        Globalreducer:Globalreducer
})

export default rootReducer;