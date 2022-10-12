import { createSelector } from "@reduxjs/toolkit";

export const selectUser = (state) => state.users;

export const bookingselector=(state)=>state.bookingHotel;

export const bookingRemainingSelector=createSelector(selectUser,bookingselector,(user,booking)=>{
        
})