import express from "express";
import { Server } from "socket.io";
import http from "http";
import cors from "cors";
import route from "./route.js";
import { registerChatHandlers } from "./controllers/ChatController.js";
const app = express();

app.use(cors({ origin: "*" }));
app.use(route);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", //для всех
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  registerChatHandlers(io, socket);
});

const PORT = 8080;
server.listen(PORT || 8080, (): void => {
  console.log(`Server has been started on port ${PORT}`);
});
