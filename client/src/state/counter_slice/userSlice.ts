import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface userDataTypes {
  id: number;
  username: string;
  userType: string;
}

const initialState: userDataTypes = {
  id: 0,
  username: "",
  userType: ""
};

const userCredentials = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<userDataTypes>) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.userType = action.payload.userType;
    }
  }
});

export const { setData } = userCredentials.actions;

export default userCredentials.reducer;
