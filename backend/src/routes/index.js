import express from "express";

import authorRoutes from "./authorRoutes.js";
import bookRoutes from "./bookRoutes.js";

const router = express.Router();

router.use("/api/authors", authorRoutes);
router.use("/api/books", bookRoutes);

export default router;