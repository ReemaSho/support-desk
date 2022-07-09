import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authentication/authSlice";
import ticketReducer from "../features/tickets/ticketSlice";
export const store = configureStore({
    reducer: {
        authentication: authReducer,
        ticket: ticketReducer,
    },
});