import express from "express";
import http from "http";
import socketio from "socket.io";
import routes from "./routes";

/**
 * Initialize the server web
 */
const app = express();

/**
 * Initialize the server http
 */
const server = http.Server(app);

/**
 * Initialize the server socket
 */
const io = socketio(server);

/**
 * Set the port
 */
const port = process.env.PORT || 3000;

/**
 * Set routes
 */
app.use("/", routes);

/**
 * Start the server
 */
app.listen(port, () => {
  console.log("Server started at port 3000");
});
