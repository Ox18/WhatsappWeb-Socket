import express from "express";
import path from "path";
import exphbs from "express-handlebars";
import expressSession from "express-session";
import SStore from "express-session-sequelize";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

import db from "./database";

const SessionStore = SStore(expressSession.Store);
const sequelizeSessionStore = new SessionStore({ db });

import routes from "./routes";

const app = express();
app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.set("trust proxy", 1);
app.use(cookieParser());
app.use(
  expressSession({
    secret: "XFS",
    store: sequelizeSessionStore,
    resave: false,
    saveUninitialized: false,
  })
);

app.engine(
  "hbs",
  exphbs({
    extname: "hbs",
    defaultLayout: "main",
    layoutsDir: "views/layouts",
    partialsDir: "views/partials",
    helpers: {},
  })
);
app.set("view engine", "hbs");

app.use("/static", express.static(path.join(__dirname, "public")));

app.use(routes);

// settings
app.set("port", process.env.PORT || 3000);

// static files

// starting the server
export default app;
