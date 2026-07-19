import sequelize from "../src/config/database.js";
import { Author, Book } from "../src/models/index.js";

beforeAll(async () => {
  await sequelize.authenticate();
});

beforeEach(async () => {
  await Book.destroy({
    where: {},
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });

  await Author.destroy({
    where: {},
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });
});

afterAll(async () => {
  await sequelize.close();
});