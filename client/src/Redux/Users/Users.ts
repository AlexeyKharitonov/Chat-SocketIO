import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../Types";
import { UsersState } from "./Users.type";
import { localStorageService } from "../../LocalStorageService/LocalStorageService";

const initialState: UsersState = {
  users: localStorageService.getAllUsers() || [],
  currentUser: localStorageService.getCurrentUser() || null,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<IUser>) => {
      state.users.push(action.payload);
      localStorageService.addUser(action.payload);
    },
    setCurrentUser: (state, action: PayloadAction<IUser>) => {
      state.currentUser = action?.payload;
      localStorageService.addCurrentUser(action.payload);
    },
    userLogout: (state) => {
      state.currentUser = null;
      state.users = [];
      localStorageService.removeUser();
    },
  },
});

export const {
  reducer: usersReducer,
  actions: { addUser, setCurrentUser, userLogout },
} = userSlice;
export default usersReducer;
