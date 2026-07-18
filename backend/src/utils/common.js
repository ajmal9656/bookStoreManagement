import * as db from "../models/index.js";

export const checkFieldValueExist = async (
  modelName,
  field,
  value,
  id,
  extraCondition = {},
) => {
  try {
    const Model = db[modelName];
    if (!Model) throw new Error(`Model '${modelName}' does not exist.`);

    let whereClause = {
      [field]: typeof value === "string" ? value.trim() : value,
    };

    if (Object.keys(extraCondition).length) {
      Object.assign(whereClause, extraCondition);
    }

    if (id !== undefined) {
      whereClause.id = { [Op.ne]: id };
    }

    const count = await Model.count({ where: whereClause });
    return count > 0;
  } catch (err) {
    console.log("Error occurred while executing checkFieldValueExist: " + err);
    throw err;
  }
};
