import ApiError from "../errors/ApiError.js";
import * as authorRepository from "../repositories/authorRepository.js";
import { checkFieldValueExist } from "../utils/checkFieldValueExist.js";

export const searchAuthors = async ({ search }) => {
  const authors = await authorRepository.getAuthors({
    search,
    paginate: false,
  });

  return authors.map((author) => author.toJSON());
};

export const getAuthors = async (query) => {
  const page = Math.max(1, Number(query.page) || 1);

  const limit = Math.min(
    50,
    Math.max(1, Number(query.limit) || 5)
  );

  const search = query.search?.trim();
  const result = await authorRepository.getAuthors({
    search,
    page,
    limit,
    paginate: true,
  });
  console.log("res",result);
  

  return {
    ...result,
    authors: result.authors.map((author) => author.toJSON()),
  };
};

export const createAuthor = async ({ name, bio }) => {
  const trimmedName = name.trim();

  const authorExists = await checkFieldValueExist(
    "Author",
    "name",
    trimmedName
  );

  if (authorExists) {
    throw new ApiError(
      409,
      "An author with this name already exists."
    );
  }

  const author = await authorRepository.create({
    name: trimmedName,
    bio: bio.trim(),
  });

  return author.toJSON();
};

