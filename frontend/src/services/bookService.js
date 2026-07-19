import axiosInstance from "../api/axios";

export const getBooks = (params) => {
  return axiosInstance.get("/books", {
    params,
  });
};

export const getBookById = (id) => {
  return axiosInstance.get(`/books/${id}`);
};


export const getAuthors = (params) => {
  return axiosInstance.get("/authors/search", {
    params,
  });
};

export const createBook = (data) => {
  return axiosInstance.post("/books", data);
};

export const updateBookStock = async (id, data) => {
  console.log("service", id, data);
  
  return axiosInstance.patch(`/books/${id}/stock`, data);
};