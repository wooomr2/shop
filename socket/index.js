const io = require("socket.io")(8800, {
  cors: {
    origin: [
      "http://localhost:3000",
      "http://localhost:4000",
      "http://localhost:5000",
      "http://localhost:3050",
    ],
  },
});

let socketUsers = [];

const addUser = (user, socketId) => {
  !socketUsers.some((su) => su.user._id === user._id) &&
    socketUsers.push({ user, socketId });
};

const removeUser = (socketId) => {
  socketUsers = socketUsers.filter((su) => su.socketId !== socketId);
};

const getUser = (userId) => {
  return socketUsers.find((su) => su.user._id === userId);
};

io.on("connection", (socket) => {
  console.log("소켓 connected");

  socket.on("addUser", (user) => {
    addUser(user, socket.id);
    io.emit("getUsers", socketUsers);
  });

  socket.on("sendMessage", ({ chatroomId, senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    io.to(user?.socketId).emit("getMessage", {
      chatroomId,
      senderId,
      text,
    });
  });

  socket.on("sendRoom", ({ senderId, receiverId, chatroom }) => {
    const user = getUser(receiverId);
    io.to(user?.socketId).emit("getRoom", chatroom);
  });

  socket.on("disconnect", () => {
    console.log("소켓 disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", socketUsers);
  });
});
