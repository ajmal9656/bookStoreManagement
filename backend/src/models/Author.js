import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Author = sequelize.define(
  "Author",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Author name is required",
        },
      },
    },

    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "authors",
    timestamps: true,
  }
);

export default Author;