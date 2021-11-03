import { DataTypes } from "sequelize";
import db from "../database";

const Chat = db.define("chat", {
  author: {
    type: DataTypes.STRING,
  },
  phone: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.STRING,
  },
});

export default Chat;
