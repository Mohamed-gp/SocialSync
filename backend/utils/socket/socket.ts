import { Server } from "socket.io";

let onlineUsers: string[] = [];
const socketInit = (server: object) => {
  const io = new Server(server, {
    cors: {
      origin:
        process.env.ENV == "development"
          ? "http://localhost:5002"
          : "https://socialsync.production-server.tech",
    },
  });

  io.on("connection", (socket) => {
    const userId = socket.handshake.auth.userId;
    console.log("User connected:", userId);
    const isExist = onlineUsers.find((id) => id == userId);
    if (!isExist) {
      onlineUsers.push(userId as string);
    }
    io.emit("onlineUsers", onlineUsers);

    socket.on("callUser", (data) => {
      io.to(data.userToCall).emit("callUser", {
        signal: data.signalData,
        from: data.from,
        name: data.name,
      });
    });

    socket.on("answerCall", (data) => {
      io.to(data.to).emit("callAccepted", data.signal);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", userId);
      onlineUsers = onlineUsers.filter((id) => id != userId);
      socket.broadcast.emit("callEnded");
      io.emit("onlineUsers", onlineUsers);
    });
  });

  return io;
};

export { onlineUsers, socketInit };
