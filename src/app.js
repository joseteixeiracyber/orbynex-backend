import express from "express";
import dotenv from "dotenv";

import contactRoutes from "./routes/contactRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api", contactRoutes);

export default app;