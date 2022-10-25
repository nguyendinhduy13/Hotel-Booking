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
                        state.hotel = action.payload
                },
                addBookingHotelUser(state, action) {
                        state.userbooking.push(action.payload);
                }
        },
})