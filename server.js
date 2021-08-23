var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);
var SocketClient = require('./controller/SocketClient');

const socketClient = new SocketClient(io);

app.use(express.static("public"));

app.get("/hello", function (req, res) {
  res.status(200).send("Hello World!");
});

server.listen(8080, function () {
  console.log("Servidor corriendo en http://localhost:8080");
});
