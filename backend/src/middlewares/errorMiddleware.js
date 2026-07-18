import ApiError from "../errors/ApiError.js";

const errorHandler = (err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      error: {
        message: err.message,
        field: err.field,
      },
    });
  }

  console.error(err);

  return res.status(500).json({
    error: {
      message: "Internal Server Error",
      field: null,
    },
  });
};

export default errorHandler;