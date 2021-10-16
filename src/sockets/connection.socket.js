/**
 * Types of listener and emitters event
 */
class SocketTypes {
  static LISTENER_MESSAGES = "messages";
  static EMITTER_MESSAGES = "messages";
}

/**
 * Clase que escucha los eventos de la conexión
 */
class SocketListener {
  /**
   * @param {socker} socket instancia de socket
   */
  constructor(socket) {
    socket.on(SocketTypes.LISTENER_MESSAGES, this.messages);
  }

  /**
   * Escuchar evento messages
   * @param {any} data datos a recibir
   */
  messages(data) {
    console.log(data);
  }
}

/**
 * Clase que emite los eventos de la conexión
 */
class SocketEmitter {
  /**
   * @param {socket} socket instancia de socket
   */
  constructor(socket) {
    this.socket = socket;
  }

  /**
   * Emitir evento messages
   */
  messages() {
    this.socket.emit(SocketTypes.EMITTER_MESSAGES, "ping");
  }
}

/**
 * Instancias de socket
 * @param {socket} socket instancia de socket
 */
export const connectionSocket = (socket) => {
  const socketEmitter = new SocketEmitter(socket);
  const socketListener = new SocketListener(socket);

  socketEmitter.messages();
};
