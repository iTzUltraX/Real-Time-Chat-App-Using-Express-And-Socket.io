const express = require("express");
const socket = require("socket.io");
const app = express();
const server = require("http").Server(app);
let usersConnected = 0;
let printName = "";

//App setup
app.use(express.static(__dirname + "./public"));
server.listen(4000, () => {
  console.log("Listening to request on port 4000...");
});

const checkNumberOfUsers = () => {
  console.log(`Users connected:${usersConnected} `);
};
//Static files

//Socket setup
const io = socket(server);

//Liten for possible connection with client
io.on("connection", socket => {
  usersConnected++;
  checkNumberOfUsers();

  //username received
  socket.on("username", data => {
    io.sockets.emit("username", data);
  });

  //Message events from the client
  socket.on("newMessage", data => {
    io.sockets.emit("newMessage", data);
  });

  socket.on("typing", data => {
    socket.broadcast.emit("typing", data);
  });

  socket.on("stopTyping", data => {
    socket.broadcast.emit("stopTyping", data);
  });
});
