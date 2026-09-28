import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "../routes/auth.routes.js";
import productRoutes from "../routes/product.routes.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

//middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));
app.use(cookieParser());

//routes
app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);

export default app;