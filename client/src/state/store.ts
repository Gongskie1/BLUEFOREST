import { configureStore } from "@reduxjs/toolkit";
import statusReducer from "./counter_slice/statusSlice";
import userCredentials from "./counter_slice/userSlice";

export const store = configureStore({
    reducer:{
        status:statusReducer,
        userData:userCredentials
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;