import { createSelector } from "@reduxjs/toolkit";

export const selectUser = (state) => state.users;

export const bookingselector = (state) => state.bookingHotel;

export const currentPositionSelector = (state) => state.currentPosition;

export const bookingRemainingSelector = createSelector(selectUser, bookingselector, currentPositionSelector, (user, booking) => {

})