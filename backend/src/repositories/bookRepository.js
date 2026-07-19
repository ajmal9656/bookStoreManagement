import { Op } from "sequelize";

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

  if (
    minPrice !== undefined &&
    !Number.isNaN(minPrice) &&
    minPrice >= 0
  ) {
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