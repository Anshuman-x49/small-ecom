import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "../routes/auth.routes.js";
import productRoutes from "../routes/product.routes.js";
import cors from "cors";
import config from "../config/config.js";
const app = express();

//middlewares
app.use(
  cors({
    origin: config.client_url,
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//routes
app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);

//health route
app.get("/", (req, res) => {
  res.send("Server is running");
});

export default app;
