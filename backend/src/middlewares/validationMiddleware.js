import ApiError from "../errors/ApiError.js";

const validate = (schema, property = "body") => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[property], {
      abortEarly: false,
      stripUnknown: true,
      convert: true,
    });

    if (error) {
      if (property === "body") {
        const errors = error.details.map((detail) => ({
          field: detail.path.join("."),
          message: detail.message,
        }));

        return next(
          new ApiError(
            400,
            "Validation failed",
            errors
          )
        );
      }

      const message =
        property === "query"
          ? "Invalid query parameters."
          : "Invalid route parameters.";

      return next(new ApiError(400, message));
    }

    if (property === "body") {
      req.body = value;
    } else {
      Object.assign(req[property], value);
    }

    next();
  };
};

export default validate;