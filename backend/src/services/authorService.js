import * as authorRepository from "../repositories/authorRepository.js";

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