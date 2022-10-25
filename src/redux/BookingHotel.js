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
                        state.hotel.push(action.payload)
                },
                addBookingHotelUser(state, action) {
                        state.userbooking=action.payload
                }
        },
})