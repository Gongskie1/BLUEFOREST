import { createSlice } from "@reduxjs/toolkit";

interface StatusState {
    status:boolean;
}

const initialState:StatusState = {
    status:false
}

const statusSlice = createSlice({
    name: "status",
    initialState,
    reducers:{}
})


export default statusSlice.reducer;