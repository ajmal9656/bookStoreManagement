import { Op } from "sequelize";
import { Author } from "../models/index.js";

export const getAuthors = async ({
  search,
  page,
  limit,
  paginate,
}) => {
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
  console.log(page,limit);
  

  const offset = (page - 1) * limit;

  const { rows, count } =
    await Author.findAndCountAll({
      where,
      attributes: ["id", "name", "bio"],
      order: [["createdAt", "DESC"]],
      limit,
      offset,
    });
    console.log("rows",rows);
    

  return {
    authors: rows,
    totalAuthors: count,
    totalPages: Math.ceil(count / limit),
    currentPage: Number(page),
  };
};
