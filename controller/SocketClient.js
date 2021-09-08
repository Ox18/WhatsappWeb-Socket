const { Client } = require("whatsapp-web.js");
const qrcode = require("qrcode");

class SocketClient {
  constructor() {
    this.client = new Client();
    this.qr = "https://img.pikbest.com/58pic/35/39/61/62K58PICb88i68HEwVnm5_PIC2018.gif!w340";
    this.chat = {};
  }

  static buildInstance(io) {
    const socketClient = new SocketClient();
    const { client } = socketClient;

    io.on("connection", function (socket) {
      socket.emit("messages", socketClient.qr);
      socket.emit("initialChat", socketClient.chat);

      client.on("qr", (qr) => {
        qrcode.toDataURL(qr, function (err, url) {
          socketClient.qr = url;
          socket.emit("messages", url);
        });
      });

      client.on("ready", () => {
        const uri = "https://i.pinimg.com/originals/87/98/77/879877f9ddebaf63aa83976fe65a87ce.gif";
        socket.emit("messages", uri);
        socketClient.qr = uri;
      });

      client.on("message", async (msg) => {
        const { body, from, timestamp, deviceType } = msg;
        const destinatary = from.replace("51", "").replace("@c.us", "");

        if (socketClient.chat[destinatary] != undefined) {
          // existe en el chat
          socketClient.chat[destinatary].conversation.push({
            time: timestamp,
            device: deviceType,
            message: body,
            type: 'client'
          });
        } else {
          // no existe en el chat
          socketClient.chat[destinatary] = {
            from: destinatary,
            conversation: [
              {
                time: timestamp,
                device: deviceType,
                message: body,
                type: 'client'
              }
            ]
          };
        }
        socketClient.chat[destinatary].conversation.push({
          time: Date.now(),
          device: 'computer',
          message: "hola",
          type: 'bot'
        });
        // msg.reply("hola");
        socket.emit("initialChat", socketClient.chat);
      });

    });

    client.on("authenticated", async (session) => {
      console.log("autenticado");
    });



    client.initialize();
  }
}

module.exports = SocketClient;
