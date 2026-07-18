import * as bookRepository from "../repositories/bookRepository.js";

export const getAllBooks = async (query) => {
  const page = Math.max(1, Number(query.page) || 1);

  const limit = Math.min(
    50,
    Math.max(1, Number(query.limit) || 5)
  );

  const search = query.search?.trim();

  const minPrice =
    query.minPrice !== undefined
      ? Number(query.minPrice)
      : undefined;

  const { count, rows } = await bookRepository.findAllBooks({
    page,
    limit,
    search,
    inStock: query.inStock,
    minPrice,
  });

  return {
    books: rows.map((book) => book.toJSON()),
    currentPage: page,
    totalPages: Math.ceil(count / limit),
    totalBooks: count,
  };
};