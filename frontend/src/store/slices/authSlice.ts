import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: [],
  },
  reducers: {
    login(state, action) {
      
    },
  },
});

const authAction = authSlice.actions;
const authReducer = authSlice.reducer;

export default authReducer;
export { authReducer };
