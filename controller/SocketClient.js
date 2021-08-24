const { Client } = require("whatsapp-web.js");
const qrcode = require("qrcode");

class SocketClient {
  constructor() {
    this.client = new Client();
  }

  static buildInstance(io) {
    const socketClient = new SocketClient();
    const { client } = socketClient;

    io.on("connection", function (socket) {
      console.log("Alguien se ha conectado con Sockets");

      client.on("qr", (qr) => {
        qrcode.toDataURL(qr, function (err, url) {
          console.log("se cambio el url");
          socket.emit("messages", url);
        });
      });

      socket.on("new-message", function (data) {
        messages.push(data);

        io.sockets.emit("messages", messages);
      });
    });

    client.on("authenticated", async (session) => {
      console.log("autenticado");
    });

    client.on("message", async (msg) => {
      msg.reply("hola");
    });

    client.on("ready", () => {
      console.log("Client is ready!");
    });

    client.on("message", (msg) => {
      if (msg.body == "!ping") {
        msg.reply("pong");
      }
    });

    client.initialize();
  }
}

module.exports = SocketClient;
