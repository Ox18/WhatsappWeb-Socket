import { Client } from "whatsapp-web.js";
import qrcode from "qrcode";

import ChatServiceImpl from "./serviceImpl/ChatServiceImpl";
import MessageServiceImpl from "./serviceImpl/MessageServiceImpl";
import AsesorServiceImpl from "./serviceImpl/AsesorServiceImpl";
import StringUtil from "./utils/StringUtil";

export default (io) => {
  const client = new Client();

  io.on("connection", async (socket) => {
    let messages = (await MessageServiceImpl.getAllMessages()).map((message) =>
      message.get()
    );
    let chats = (await ChatServiceImpl.getChats()).map((chat) => chat.get());

    client.on("qr", (qr) => {
      qrcode.toDataURL(qr, function (err, url) {
        socket.emit("new qr", url);
      });
    });

    socket.emit("load old msgs", messages);
    socket.emit("load old chats", chats);

    socket.on("send message", async (data, cb) => {
      try {
        let message = await MessageServiceImpl.createMessage({
          message: data.message,
          chatID: data.chatID,
          type: "bot",
          author: "BOT",
        });
        const parsedNumber = `${data.chatNumber}@c.us`;
        client.sendMessage(parsedNumber, data.message);
        io.emit("new message", message.get());
      } catch (e) {
        cb("¡No se pudo enviar tu mensaje!");
      }
    });

    socket.on("disconnect", (data) => {});

    client.on("ready", () => {
      console.log("listo");
    });

    client.on("authenticated", async (session) => {
      socket.emit("new qr", "authenticated");
    });

    client.on("message", async (data) => {
      const { body, from } = data;
      const phone = StringUtil.captureStringOnEmail(from);

      // Guardar mensaje y enviarlo al front
      const existChat = await ChatServiceImpl.existsChat({ phone });
      const data_message = {
        message: body,
        chatID: 0,
        type: "client",
        author: phone,
      };
      if (!existChat) {
        const chat = await ChatServiceImpl.createChat({
          author: phone,
          phone,
          status: "CHAT_TALKIN",
        });
        chats.push(chat);
        socket.emit("load old chats", chats);
        let message_created = await MessageServiceImpl.createMessage({
          ...data_message,
          chatID: chat.get().id,
        });
        io.emit("new message", message_created.get());
      } else {
        const chat = await ChatServiceImpl.getByPhone(phone);
        let message_created = await MessageServiceImpl.createMessage({
          ...data_message,
          chatID: chat.get().id,
        });
        io.emit("new message", message_created.get());
      }

      const statusIsWaiting = await ChatServiceImpl.statusIsWaiting(phone);
      if (statusIsWaiting) {
        if (body === "/finalizar") {
          await ChatServiceImpl.toggleToTalkin(phone);
          data.reply(
            "¡Hasta pronto! Se finalizo la conversación con el asesor."
          );
        }
      } else {
        const command = StringUtil.captureNeedAsesor(body);
        const { needAsesor, asesorID } = command;

        // command: /asesor 10
        if (needAsesor) {
          const asesor = await AsesorServiceImpl.getAsesor(asesorID);
          if (asesor) {
            await ChatServiceImpl.toggleToWaiting(phone);
            data.reply("Asesor existe!. Espera a que el asesor responda.");
          } else {
            data.reply("El asesor con el que te quieres contactar no existe.");
          }
        } else if (body === "/asesores") {
          // Responder con la lista de asesores
          const asesores = await AsesorServiceImpl.getAll();
          let message = "";
          asesores.forEach((asesor) => {
            message += `${asesor.get().cip} - ${asesor.get().name} \n`;
          });
          data.reply(message);
        } else {
          // Responder con Dialog Flow
          data.reply("Esta respuesta fue enviada desde Dialog Flow");
        }
      }
    });
  });

  client.initialize();
};
