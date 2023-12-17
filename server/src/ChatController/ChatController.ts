import { Server, Socket } from "socket.io";
import { IMessage, IUser } from "./ChatController.type.js";
import { newUserHandler, userLogout } from "../Events/UserEvents.js";
import { chatMessageHandler, sendMessage } from "../Events/MessageEvents.js";

export const users: IUser[] = [];
export const messages: IMessage[] = [];

export const registerChatHandlers = (io: Server, socket: Socket) => {
  socket.on("new_user", newUserHandler(io, socket));
  socket.on("chat message", chatMessageHandler(io, socket));
  socket.on("send_message", sendMessage(io, socket));
  socket.on("user_logout", userLogout(io, socket));
};
