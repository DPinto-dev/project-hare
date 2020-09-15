const app = require("express")();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);
const PORT = 8000;
const moment = require("moment");

const users = {};

server.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
