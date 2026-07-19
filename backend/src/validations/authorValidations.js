import Joi from "joi";

export const searchAuthorsSchema = Joi.object({
  search: Joi.string()
      .trim()
      .allow("")
      .optional()
      .messages({
        "string.base": "Search must be a string.",
      }),
});

export const listAuthorsSchema = Joi.object({
  search: Joi.string()
      .trim()
      .allow("")
      .optional()
      .messages({
        "string.base": "Search must be a string.",
      }),

  page: Joi.number()
      .integer()
      .min(1)
      .default(1)
      .messages({
        "number.base": "Page must be a number.",
        "number.integer": "Page must be an integer.",
        "number.min": "Page must be at least 1.",
      }),

  limit: Joi.number()
      .integer()
      .min(1)
      .max(50)
      .default(5)
      .messages({
        "number.base": "Limit must be a number.",
        "number.integer": "Limit must be an integer.",
        "number.min": "Limit must be at least 1.",
        "number.max": "Limit cannot exceed 50.",
      }),
});