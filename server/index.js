const  express = require("express")
const cors = require("cors")
const mongoose= require("mongoose");
const morgan = require("morgan");
const connection = require("./config/Mongodb");
const router = require("./routes/userRoutes");
const messageRoute= require("./routes/messagesRoute")
connection()

const app= express();
const socket = require("socket.io");
require("dotenv").config();
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use("/",router )
app.use("/message",messageRoute )





const server = app.listen(process.env.PORT, () =>
  console.log(`Server started on ${process.env.PORT}`)
);
const io = socket(server, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
  });
  
  global.onlineUsers = new Map();
  io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
      onlineUsers.set(userId, socket.id);
    });
  
    socket.on("send-msg", (data) => {
      const sendUserSocket = onlineUsers.get(data.to);
      if (sendUserSocket) {
        socket.to(sendUserSocket).emit("msg-recieve", data.msg);
      }
    });
  });