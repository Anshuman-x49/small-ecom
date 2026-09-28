import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "../routes/auth.routes.js";
import productRoutes from "../routes/product.routes.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// server/public (two levels up from server/src/app/)
const publicDir = path.join(__dirname, "../../public");

const app = express();

//middlewares
app.use(express.json());
app.use(cookieParser());

// Serve static files from server/public
app.use(express.static(publicDir));

//routes
app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);

// Catch-all: send index.html for all non-API routes (React Router)
app.get("*", (req, res) => {
  res.sendFile(path.join(publicDir, "index.html"));
});

export default app;