import Chat from "../models/Chat";

class ChatServiceImpl {
  static getChats() {
    return Chat.findAll();
  }

  static getByPhone(phone) {
    return Chat.findOne({
      where: {
        phone: phone,
      },
    });
  }
  static createChat(chat) {
    return Chat.create(chat);
  }
  static existsChat({ phone }) {
    return Chat.findOne({ where: { phone } });
  }

  static statusIsTalkin(phone) {
    return Chat.findOne({ where: { phone, status: "CHAT_TALKIN" } });
  }

  static statusIsWaiting(phone) {
    return Chat.findOne({ where: { phone, status: "CHAT_WAITING" } });
  }

  static toggleToTalkin(phone) {
    return Chat.update(
      {
        status: "CHAT_TALKIN",
      },
      {
        where: {
          phone,
        },
      }
    );
  }

  static toggleToWaiting(phone) {
    return Chat.update(
      {
        status: "CHAT_WAITING",
      },
      {
        where: {
          phone,
        },
      }
    );
  }
}

export default ChatServiceImpl;
