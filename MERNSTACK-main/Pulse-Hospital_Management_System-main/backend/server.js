import express from "express";
import cors from "cors";
import 'dotenv/config';
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import adminRouter from "./routes/adminRoute.js";

// App config
const app = express();
const port = process.env.PORT || 4000;

// Connect DB and Cloudinary
connectDB();
connectCloudinary();

// --- START CORS CONFIGURATION ---

// 1. Define your allowed origins (whitelist)
const allowedOrigins = [
    'https://mernstack-an9m.vercel.app',
  'https://mernstack-66zz.vercel.app', // Your deployed frontend
  'http://localhost:5173'     ,
      'http://localhost:5174'              // Your local development frontend
];

// 2. Create CORS options
const corsOptions = {
  origin: function (origin, callback) {
    // Check if the origin is in the whitelist or if it's a request from Postman (no origin)
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('This origin is not allowed by CORS'));
    }
  },
  methods: 'GET, POST, PUT, DELETE, PATCH, OPTIONS', // Allow all standard methods
  credentials: true, // Allow cookies/headers to be sent
};

// 3. Apply CORS middleware
// This handles all standard requests (GET, POST, etc.)
app.use(cors(corsOptions));

// 4. *** THE KEY FIX ***
// Explicitly handle all OPTIONS preflight requests
// This will intercept the "preflight" check and send back the correct headers.
app.options('*', cors(corsOptions));

// --- END CORS CONFIGURATION ---


// Middlewares
// This MUST come *after* the CORS configuration
app.use(express.json());

// API endpoints
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);

app.get("/", (req, res) => {
  res.send("✅ API Working");
});

app.listen(port, () => console.log(`🚀 Server started on PORT: ${port}`));
