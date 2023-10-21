import { Server } from "socket.io";
import { server } from "../index.js";
import { config } from "dotenv";

config();
const clientUrl = process.env.CLIENT_URL;
const io = new Server(server, {
  cors: { origin: clientUrl, credentials: true },
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
  socket.on("online", (userId) => {
    onlineUsers.set(userId, socket.id);
  });
  socket.on("sendMsg", (data) => {
    const senderSocketId = onlineUsers.get(data.to);
    if (senderSocketId) {
      socket.to(senderSocketId).emit("receiveMsg", data.message);
    }
  });
  socket.on("offline", (data) => {
    onlineUsers.delete(data.to);
  });
});
