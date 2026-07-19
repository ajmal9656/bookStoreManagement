import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import errorHandler from "./middlewares/errorMiddleware.js";

const app = express();

app.use(
  cors({
    origin: [process.env.CLIENT_URL],
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.use(errorHandler);

export default app;