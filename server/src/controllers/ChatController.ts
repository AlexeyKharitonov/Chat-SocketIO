import { Server, Socket } from "socket.io";
import { User } from "../types/User.js";
import { Message } from "../types/Message.js";

export const users: User[] = [];
export const messages: Message[] = [];

export const registerChatHandlers = (io: Server, socket: Socket) => {
  socket.on("new_user", (user) => {
    const userWithSocketId = { ...user, socketId: socket.id };

    // users.push(user);
    users.push(userWithSocketId);
    io.emit("update_users", users);
  });

  socket.on("chat message", (message) => {
    socket.broadcast.emit("chat message", message);
  });

  socket.on("send_message", (content: string) => {
    const user = users.find((user) => user.id === socket.id);

    if (user) {
      const message: Message = {
        sender: user,
        content,
        timestamp: new Date(),
      };
      messages.push(message);
      io.emit("new_message", message);
    }
  });

  socket.on("user_logout", (nickName) => {
    const index = users.findIndex((user) => user.nickName === nickName);

    if (index !== -1) {
      users.splice(index, 1);
      io.emit("update_users", users);
    }
  });
};
