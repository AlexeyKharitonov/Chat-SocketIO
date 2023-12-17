import { users } from "../ChatController/ChatController.js";
import { IUser } from "../ChatController/ChatController.type.js";
import { Server, Socket } from "socket.io";

export const newUserHandler = (io: Server, socket: Socket) => {
  return (user: IUser) => {
    const userWithSocketId = { ...user, socketId: socket.id };

    const existingUser = users.find((u) => u.socketId === socket.id);
    if (!existingUser) {
      users.push(userWithSocketId);
    }

    io.emit("update_users", users);
  };
};

export const userLogout = (io: Server, socket: Socket) => {
  return (nickName: string) => {
    const index = users.findIndex((user) => user.nickName === nickName);

    if (index !== -1) {
      users.splice(index, 1);
      io.emit("update_users", users);
    }
  };
};
