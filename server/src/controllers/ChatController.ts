import { Server, Socket } from "socket.io";
import { User } from "../types/User.js";
import { Message } from "../types/Message.js";

export const users: User[] = [];
export const messages: Message[] = [];

export const registerChatHandlers = (io: Server, socket: Socket) => {
  console.log(`Пользователь подключен: ${socket.id}`);

  socket.on("new_user", (name: string) => {
    const user: User = { id: socket.id, name };
    users.push(user);
    console.log(`Новый пользователь: ${name}`);
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

  socket.on("disconnect", () => {
    console.log(`Пользователь отключен: ${socket.id}`);
    const index = users.findIndex((user) => user.id === socket.id);
    if (index !== -1) {
      users.splice(index, 1);
    }
  });
};
