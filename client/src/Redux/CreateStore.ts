import { configureStore } from "@reduxjs/toolkit";
import { usersReducer } from "./Users/Users";
import { messageReducer } from "./Messages/Messages";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    messages: messageReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
