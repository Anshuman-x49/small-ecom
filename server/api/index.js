import app from "../src/app/app.js";
import { connectDB } from "../src/config/db.js";

// Connect to DB once (cached across warm invocations)
await connectDB();

export default app;
