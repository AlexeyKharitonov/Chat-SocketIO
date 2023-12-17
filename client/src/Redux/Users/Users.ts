import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../CreateStore";
import { IUser } from "../../Types";
import { UsersState } from "./Users.type";
import { localStorageService } from "../../LocalStorageService";

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
    updateUsers: (state, action) => {
      state.users = action.payload;
      localStorageService.updatedUsers(action.payload);
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
  actions: { addUser, updateUsers, setCurrentUser, userLogout },
} = userSlice;
export default usersReducer;

export const userExist = (nickName: string) => (state: RootState) =>
  state.users.users.some((user) => user.nickName === nickName);

export const getAllUsers = (state: RootState) => state.users.users;

export const getCurrentUser = (state: RootState) => state.users.currentUser;
