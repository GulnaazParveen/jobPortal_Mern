import { Server } from "socket.io";
import http from "http";

const PORT = 8900;
const httpServer = http.createServer();
const io = new Server(httpServer, {
  cors: { origin: "http://localhost:3000" },
});

const users = {}; // Stores userId as key and socket.id as value

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Add a user when they join, mapping userId to socket.id
  socket.on("addUserOrEmployer", (userId) => {
    users[userId] = socket.id;
    console.log(`User added: ${userId} with socket ID: ${socket.id}`);
    console.log("Current users:", users); // Debugging line to check current users
  });

  // Listen for a message from the sender
  socket.on("sendMessage", ({ senderId, receiverId, message }) => {
    console.log("Attempting to send message to receiverId:", receiverId);
    console.log("Current users:", users); // Verify if receiverId is present
    const receiverSocketId = users[receiverId];

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("receiveMessage", {
        senderId,
        message,
      });
    } else {
      console.log("Receiver not connected."); // This will show if receiverId isn't mapped
    }
  });

  // Remove user from `users` object upon disconnection
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    for (const userId in users) {
      if (users[userId] === socket.id) {
        delete users[userId];
        break;
      }
    }
  });
});

httpServer.listen(PORT, () => {
  console.log(`Socket.io server is running on ws://localhost:${PORT}`);
});
