const app = require("express")();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);
const PORT = 8000;
const moment = require("moment");

// const users = {
//   list: ["Bob", "Olivia", "Rick", "Julia"],
//   count: 0,
//   setNickName: function (id) {
//     this[id] = this[id] || this.list[this.count];
//     this.count = ++this.count % this.list.length;
//     return this[id];
//   }
// };

// Will be using the random socket.io ids for now:

io.on("connection", socket => {
  if (!users[socket.id]) {
    users[socket.id] = socket.id;
  }
  socket.emit("yourID", socket.id);
  io.sockets.emit("allUsers", users);
  socket.on("disconnect", () => {
    delete users[socket.id];
  });

  socket.on("callUser", data => {
    io.to(data.userToCall).emit("hey", { signal: data.signalData, from: data.from });
  });

  socket.on("acceptCall", data => {
    io.to(data.to).emit("callAccepted", data.signal);
  });
});

server.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
