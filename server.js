const app = require("express")();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);
const PORT = 8000;
const moment = require("moment");

const users = {
  list: ["Bob", "Olivia", "Rick", "Julia"],
  count: 0,
  setNickName: function (id) {
    this[id] = this[id] || this.list[this.count];
    this.count = ++this.count % this.list.length;
    return this[id];
  }
};

// Listening for a "connection" event
io.on("connection", socket => {
  const nickName = users.setNickName(socket.id);
  socket.emit("nickname", nickName);

  socket.on("send message", body => {
    io.emit("message", body);
  });

  // Inform all users when a new user connects and disconnect
  io.emit("conn message", `User ${nickName} connected`);
  socket.on("disconnect", () => {
    io.emit("conn message", `User ${nickName} disconnected`);
    console.log(`User ${nickName} disconnected`);
  });

  console.log(`${moment()} - User ${socket.id} connected`);
});

server.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
