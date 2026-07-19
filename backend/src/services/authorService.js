import * as authorRepository from "../repositories/authorRepository.js";

export const searchAuthors = async ({ search }) => {
  const authors = await authorRepository.getAuthors({
    search,
    paginate: false,
  });

  return authors.map((author) => author.toJSON());
};

export const getAuthors = async ({ search, page, limit }) => {
  const result = await authorRepository.getAuthors({
    search,
    page,
    limit,
    paginate: true,
  });

  return {
    ...result,
    authors: result.authors.map((author) => author.toJSON()),
  };
};