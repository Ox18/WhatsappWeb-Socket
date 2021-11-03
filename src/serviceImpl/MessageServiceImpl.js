import Message from "../models/Message";

class MessageServiceImpl {
  static getAllMessages() {
    return Message.findAll();
  }
  static createMessage(message) {
    return Message.create(message);
  }
}

export default MessageServiceImpl;
