import { DataTypes } from "sequelize";
import db from "../database";

const Asesor = db.define("asesor", {
  name: {
    type: DataTypes.STRING,
  },
  lastname: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  cip: {
    type: DataTypes.STRING,
  },
});

export default Asesor;
