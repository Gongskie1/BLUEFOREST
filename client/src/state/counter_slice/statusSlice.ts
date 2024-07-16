import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StatusState {
    status:boolean;
}

const initialState:StatusState = {
    status:false
}

const statusSlice = createSlice({
    name: "status",
    initialState,
    reducers:{
        setStatus: (status,action: PayloadAction<boolean>)=>{
            status.status = action.payload
        }
    }
});

export const {setStatus} = statusSlice.actions;

export default statusSlice.reducer;