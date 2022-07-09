import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ticketService from "./ticketService.js";

const initialState = {
    tickets: [],
    ticket: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

export const ticketSlice = createSlice({
    name: "ticket",
    initialState,
    reducers: {
        reset: (state) => {
            state.tickets = [];
            state.ticket = {};
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = "";
        },
    },
    extraReducers: (builder) => {},
});

export const { state } = ticketSlice.actions;
export default ticketSlice.reducer;