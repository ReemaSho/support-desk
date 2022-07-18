import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import noteService from "./noteService.js";

const initialState = {
    notes: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};
// get ticket's notes
export const getNotes = createAsyncThunk(
    "notes/getAll",
    async(ticketId, thunkAPI) => {
        try {
            const token = thunkAPI.getState().authentication.user.token;
            return await noteService.getNotes(ticketId, token);
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
export const noteSlice = createSlice({
    name: "note",
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getNotes.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getNotes.fulfilled, (state, actions) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.notes = actions.payload;
            })

        .addCase(getNotes.rejected, (state, actions) => {
            state.isLoading = false;
            state.isError = true;
            state.message = actions.payload;
        });
    },
});

export const { reset } = noteSlice.actions;

export default noteSlice.reducer;