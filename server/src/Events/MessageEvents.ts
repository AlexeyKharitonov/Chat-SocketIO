import { messages, users } from "../ChatController/ChatController.js";
import { IMessage } from "../ChatController/ChatController.type.js";
import { Server, Socket } from "socket.io";

export const chatMessageHandler = (io: Server, socket: Socket) => {
  return (message: IMessage) => {
    socket.broadcast.emit("chat message", message);
  };
};

export const sendMessage = (io: Server, socket: Socket) => {
  return (content: string) => {
    const user = users.find((user) => user.id === socket.id);

    if (user) {
      const message: IMessage = {
        sender: user,
        content,
        timestamp: new Date(),
      };
      messages.push(message);

      io.emit("send_message", message);
    }
  };
};
