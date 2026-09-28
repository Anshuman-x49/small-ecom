import app from "./app/app.js";
import config from "./config/config.js";
import { connectDB } from "./config/db.js";

await connectDB();

// Local dev: listen on port. Vercel: just export the app.
if (process.env.VERCEL !== "1") {
  app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
  });
}

export default app;