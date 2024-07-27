import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user") as string)
      : null,
  },
  reducers: {
    login(state, action) {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout(state, action) {
      localStorage.removeItem("user");
    },
  },
});

const authActions = authSlice.actions;
const authReducer = authSlice.reducer;

export default authReducer;
export { authActions };
