import axiosInstance from "../api/axios";

export const getAuthorList = (params) => {
  return axiosInstance.get("/authors", {
    params,
  });
};

export const createAuthor = (data) => {
  return axiosInstance.post("/authors", data);
};

export const deleteAuthor = (id) => {
  return axiosInstance.delete(`/authors/${id}`);
};

export const getAuthorById = (id, params) => {
  return axiosInstance.get(`/authors/${id}`, {
    params,
  });
};
