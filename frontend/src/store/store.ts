import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import messagesReducer from "./slices/messagesSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    messages: messagesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
export type IRootState = ReturnType<typeof store.getState>;
