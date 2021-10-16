import http from "http";
import socketio from "socket.io";
import { connectionSocket } from "./sockets/connection.socket";

/**
 * Initialize the server web
 */
import app from "./app";

/**
 * Initialize the server http
 */
const server = http.createServer(app);

/**
 * Initialize the server socket
 */
const io = socketio(server);

/**
 * Add on connection the socket controller
 */
io.on("connection", connectionSocket);

/**
 * Start the server
 */
server.listen(app.get("port"), () => {
  console.log("Server on port", app.get("port"));
});
