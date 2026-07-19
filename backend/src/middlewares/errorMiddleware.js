import { ValidationError } from "sequelize";

import ApiError from "../errors/ApiError.js";

const errorHandler = (err, req, res, next) => {
  // Custom application errors
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      error: {
        message: err.message,
        field: err.field,
        errors: err.errors,
      },
    });
  }

  // Sequelize model validation errors
  if (err instanceof ValidationError) {
    return res.status(400).json({
      error: {
        message: "Validation failed",
        field: null,
        errors: err.errors.map((error) => ({
          field: error.path,
          message: error.message,
        })),
      },
    });
  }

  // Unexpected errors
  console.error(err);

  return res.status(500).json({
    error: {
      message: "Internal Server Error",
      field: null,
      errors: [],
    },
  });
};

export default errorHandler;