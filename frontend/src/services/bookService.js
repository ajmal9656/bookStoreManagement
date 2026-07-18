import axiosInstance from "../api/axios";

export const getBooks = ({
  page = 1,
  search = "",
  minPrice = "",
  inStock = false,
}) => {
  return axiosInstance.get("/books", {
    params: {
      page,
      search,
      minPrice,
      inStock,
    },
  });
};

export const createBook = (bookData) => {
  return axiosInstance.post("/books", bookData);
};

export const updateBookStock = (id, stockData) => {
  return axiosInstance.patch(`/books/${id}/stock`, stockData);
};