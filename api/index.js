import app from '../server/src/app/app.js';
import { connectDB } from '../server/src/config/db.js';

// Connect DB (Vercel supports top-level await)
await connectDB();

// Export the Express app as a serverless function
export default app;
