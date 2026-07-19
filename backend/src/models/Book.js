import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Book = sequelize.define(
  "Book",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Book title is required",
        },
      },
    },

    isbn: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "ISBN already exists",
      },
      validate: {
        notEmpty: {
          msg: "ISBN is required",
        },
      },
    },

    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: {
          args: [0.01],
          msg: "Price must be greater than 0",
        },
      },
    },

    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: {
          args: [0],
          msg: "Stock cannot be negative",
        },
      },
    },

    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "authors",
        key: "id",
      },
    },
  },
  {
    tableName: "books",
    timestamps: true,
  }
);

export default Book;