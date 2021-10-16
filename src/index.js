import express from "express";
import http from "http";
import socketio from "socket.io";
import routes from "./routes/index.routes";
import exphbs from "express-handlebars";
import path from "path";
import { connectionSocket } from "./sockets/connection.socket";

/**
 * Initialize the server web
 */
const app = express();

/**
 * Initialize the server http
 */
const server = http.createServer(app);

const io = socketio(server);
io.on("connection", connectionSocket);

// io.on("connection", function (socket) {
//   console.log("Alguien se ha conectado con Sockets");

//   // emitir
//   socket.emit("messages", "sfd");

//   // esuchar
//   // socket.on("new-message", function (data) {
//   //   messages.push(data);

//   //   io.sockets.emit("messages", messages);
//   // });
// });

/**
 * Set the port
 */
app.set("port", process.env.PORT || 80);

/**
 * Set the view engine
 */
app.set("views", path.join(__dirname, "views"));
app.engine(
  ".hbs",
  exphbs({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
  })
);
app.set("view engine", ".hbs");

/**
 * Set routes
 */
app.use("/", routes);

/**
 * Static files
 */
app.use(express.static(path.join(__dirname, "public")));

/**
 * Start the server
 */
server.listen(app.get("port"), () => {
  console.log("Server on port", app.get("port"));
});
