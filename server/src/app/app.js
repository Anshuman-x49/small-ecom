import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "../routes/auth.routes.js";
import productRoutes from "../routes/product.routes.js";

const app = express();

//middlewares
app.use(express.json());
app.use(cookieParser());

//routes
app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "API is running" });
});

// 404 catch-all for unknown routes
app.use((req, res) => {
  res.status(404).json({ status: "error", message: `Route ${req.method} ${req.url} not found` });
});

export default app;