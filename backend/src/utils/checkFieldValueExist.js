import { Op } from "sequelize";
import * as db from "../models/index.js";
import ApiError from '../errors/ApiError.js'

export const checkFieldValueExist = async (
  modelName,
  field,
  value,
  id,
  extraCondition = {}
) => {
  const Model = db[modelName];

  if (!Model) {
    throw new ApiError(
      500,
      `Model '${modelName}' does not exist.`
    );
  }

  const where = {
    [field]: typeof value === "string"
      ? value.trim()
      : value,
    ...extraCondition,
  };

  if (id !== undefined) {
    where.id = {
      [Op.ne]: id,
    };
  }

  const count = await Model.count({
    where,
  });

  return count > 0;
};