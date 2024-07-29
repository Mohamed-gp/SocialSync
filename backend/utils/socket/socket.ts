import { Server } from "socket.io";

let onlineUsers: string[] = [];
const socketInit = (server: object) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("a user connected");
    const userId = socket.handshake.query.userId;
    const isExist = onlineUsers.find((id) => id == userId);
    if (!isExist) {
      onlineUsers.push(userId as string);
    }
    io.emit("onlineUsers", onlineUsers);
    socket.on("disconnect", () => {
      console.log("a user disconnected");
      onlineUsers = onlineUsers.filter((id) => id != userId);
      io.emit("onlineUsers", onlineUsers);
    });
  });

  return io;
};

export { onlineUsers, socketInit };
