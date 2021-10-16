var socket = io.connect("http://localhost", { forceNew: true });

class SocketTypes {
  static LISTENER_MESSAGES = "messages";
  static EMIITER_MESSAGE = "messages";
}

class SocketListener {
  constructor() {
    socket.on(SocketTypes.LISTENER_MESSAGES, this.messages);
  }

  messages(data) {
    alert(data);
  }
}

class SocketEmitter {
  messages(data = {}) {
    socket.emit(SocketTypes.EMIITER_MESSAGE, data);
  }
}

const socketListener = new SocketListener();
const socketEmitter = new SocketEmitter();

socketEmitter.messages("pong");
