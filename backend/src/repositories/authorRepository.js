import { Op } from "sequelize";
import { Author, Book } from "../models/index.js";

export const getAuthors = async ({ search, page, limit, paginate }) => {
  const where = {};

  if (search) {
    where.name = {
      [Op.iLike]: `%${search}%`,
    };
  }

  if (!paginate) {
    return await Author.findAll({
      where,
      attributes: ["id", "name"],
      order: [["name", "ASC"]],
    });
  }

  const offset = (page - 1) * limit;

  const { rows, count } = await Author.findAndCountAll({
    where,
    attributes: ["id", "name", "bio"],
    order: [["createdAt", "DESC"]],
    limit,
    offset,
  });

  return {
    authors: rows,
    totalAuthors: count,
    totalPages: Math.ceil(count / limit),
    currentPage: Number(page),
  };
};

export const create = async (data) => {
  return Author.create(data);
};

export const findById = async (id) => {
  return Author.findByPk(id);
};

export const deleteAuthor = async (id) => {
  const bookCount = await Book.count({
    where: {
      authorId: id,
    },
  });

  if (bookCount > 0) {
    return false;
  }

  return await Author.destroy({
    where: {
      id,
    },
  });
};

export const getBooksByAuthor = async (authorId, page, limit) => {
  const offset = (page - 1) * limit;

  const { rows, count } = await Book.findAndCountAll({
    where: {
      authorId,
    },
    attributes: ["id", "title", "isbn", "price", "stock"],
    limit,
    offset,
    order: [["createdAt", "DESC"]],
  });

  return {
    books: rows,
    totalBooks: count,
  };
};
