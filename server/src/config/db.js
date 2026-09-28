import mongoose from "mongoose";
import config from "./config.js";

export const connectDB = async () => {
  // readyState: 0=disconnected, 1=connected, 2=connecting, 3=disconnecting
  if (mongoose.connection.readyState === 1) {
    return; // Already connected — reuse existing connection
  }

  try {
    await mongoose.connect(config.mongo_uri);
    console.log("Database connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};
