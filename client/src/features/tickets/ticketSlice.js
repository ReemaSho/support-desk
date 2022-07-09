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

// create new ticket
export const createTicket = createAsyncThunk(
    "tickets/create",
    async(ticketData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().authentication.user.token;
            return await ticketService.createTicket(ticketData, token);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
);

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
    extraReducers: (builder) => {
        builder
            .addCase(createTicket.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createTicket.fulfilled, (state) => {
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(createTicket.rejected, (state, action) => {
                state.isLoading = false;
                state.message = action.payload;
            });
    },
});

export const { reset } = ticketSlice.actions;
export default ticketSlice.reducer;