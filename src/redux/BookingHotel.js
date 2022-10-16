import { createSlice } from "@reduxjs/toolkit";


const initialState = {

}

export default createSlice({
        name: 'bookingHotel',
        initialState,
        reducers: {
                addBookingHotel(state, action) {
                        state.id = action.payload.id;
                        state.name = action.payload.name;
                        state.address = action.payload.address;
                        state.phone = action.payload.phone;
                        state.image = action.payload.image;
                        state.description = action.payload.description;
                        state.price = action.payload.price;
                        state.star = action.payload.star;
                        state.rating = action.payload.rating;
                },
        },
})