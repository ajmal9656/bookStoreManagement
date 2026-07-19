import axiosInstance from "../api/axios";

export const getBooks = (params) => {
  return axiosInstance.get("/books", {
    params,
  });
};



export const createBook = (data) => {
  return axiosInstance.post("/books", data);
};

export const updateBookStock = (id, stockData) => {
  return axiosInstance.patch(`/books/${id}/stock`, stockData);
};