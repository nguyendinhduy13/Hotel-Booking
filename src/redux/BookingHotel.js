import { createSlice } from "@reduxjs/toolkit";


const initialState = {
        userbooking:[],
        hotel:[],
}

export default createSlice({
        name: 'bookingHotel',
        initialState,
        reducers: {
                addBookingHotel(state, action) {
                        state.hotel.push({
                                userinfo: action.payload.userinfo,
                                hotelinfo: action.payload.hotelinfo,
                        })
                },
                addBookingHotelUser(state, action) {
                        state.userbooking=action.payload
                }
        },
})