import { DataTypes } from "sequelize";
import db from "../database";

const Message = db.define("message", {
  message: {
    type: DataTypes.STRING,
  },
  chatID: {
    type: DataTypes.INTEGER,
  },
  type: {
    type: DataTypes.STRING,
  },
  author: {
    type: DataTypes.STRING,
  },
});

export default Message;
