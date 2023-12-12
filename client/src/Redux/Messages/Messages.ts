import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../CreateStore";
import { IMessage } from "../../Types";
import { MessagesState } from "./Messages.type";
import { localStorageService } from "../../LocalStorageService/LocalStorageService";

const initialState: MessagesState = {
  messages: localStorageService.getAllMessages() || [],
};

console.log(localStorageService.getAllMessages());

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<IMessage>) => {
      state.messages.push(action.payload);
      localStorageService.addMessage(action.payload);
    },
  },
});

export const {
  reducer: messageReducer,
  actions: { addMessage },
} = messagesSlice;
export default messageReducer;

export const getAllMessages = () => (state: RootState) =>
  state.messages.messages;