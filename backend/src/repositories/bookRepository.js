import { Op, literal } from "sequelize";

import { Book, Author } from "../models/index.js";

export const findAllBooks = async ({
  page,
  limit,
  search,
  inStock,
  minPrice,
}) => {
  const where = {};

  if (search) {
    where.title = {
      [Op.iLike]: `%${search}%`,
    };
  }

  if (inStock === "true") {
    where.stock = {
      [Op.gt]: 0,
    };
  }

  if (minPrice !== undefined && !Number.isNaN(minPrice) && minPrice >= 0) {
    where.price = {
      [Op.gte]: minPrice,
    };
  }

  return await Book.findAndCountAll({
    where,

    include: [
      {
        model: Author,
        as: "author",
        attributes: ["id", "name"],
      },
    ],

    limit,
    offset: (page - 1) * limit,

    order: [["createdAt", "DESC"]],
  });
};

export const create = async (data) => {
  return Book.create(data);
};

export const getBookWithAuthorById = async (id) => {
  return await Book.findByPk(id, {
    include: [
      {
        model: Author,
        as: "author",
        attributes: ["id", "name"],
      },
    ],
  });
};

export const getBookById = async (id) => {
  return await Book.findByPk(id);
};

export const updateBookStock = async (id, operation, quantity) => {
  const stockUpdate =
    operation === "increase"
      ? literal(`stock + ${quantity}`)
      : literal(`stock - ${quantity}`);

  const [, books] = await Book.update(
    {
      stock: stockUpdate,
    },
    {
      where: { id },
      returning: true,
    },
  );

  return books[0];
};
