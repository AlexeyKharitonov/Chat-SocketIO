import express from "express";
import { Server } from "socket.io";
import http from "http";
import cors from "cors";
import { registerChatHandlers } from "./ChatController/ChatController.js";

const app = express();
const PORT = 8081;
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors({ origin: "*" }));

io.on("connection", (socket) => {
  registerChatHandlers(io, socket);
});

server.listen(PORT || 8081, () => {
  console.log(`Server has been started on port ${PORT}`);
});
