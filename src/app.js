import express from "express";
import routes from "./routes/index.routes";
import exphbs from "express-handlebars";
import path from "path";

/**
 * Initialize the server web
 */
const app = express();

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

export default app;
