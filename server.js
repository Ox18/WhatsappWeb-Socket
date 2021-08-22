var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);

// client qrcode
const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode');

const client = new Client();


app.use(express.static("public"));

app.get("/hello", function (req, res) {
  res.status(200).send("Hello World!");
});

let qr_image = '';



io.on("connection", function (socket) {
  console.log("Alguien se ha conectado con Sockets");
  
  //socket.emit("messages", qr_image);
  client.on('qr', (qr) => {
    qrcode.toDataURL(qr, function(err, url){
      console.log("se cambio el url");
      socket.emit("messages", url);
    })
  });

  socket.on("new-message", function (data) {
    messages.push(data);

    io.sockets.emit("messages", messages);
  });
});



client.on('ready', () => {
  console.log('Client is ready!');
});

client.on('message', msg => {
  if (msg.body == '!ping') {
      msg.reply('pong');
  }
});

client.initialize();


server.listen(8080, function () {
  console.log("Servidor corriendo en http://localhost:8080");
});