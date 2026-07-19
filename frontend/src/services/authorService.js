import axiosInstance from "../api/axios";


export const getAuthors = (params) => {
  return axiosInstance.get("/authors/search", {
    params,
  });
};