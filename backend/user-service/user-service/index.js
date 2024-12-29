const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/dbConfig");
const authRoutes = require("./routes/authRoutes");
const supertokens = require("./config/supertokensConfig");
const { middleware, errorHandler } = require("supertokens-node/framework/express");
const cors = require("cors");

const app = express();

// Connect to MongoDB
connectDB();

// Enable CORS
app.use(cors({
    origin: "http://localhost:3000", // Frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
    credentials: true, // Allow cookies if necessary
}));

// SuperTokens middleware (should be added before routes)
app.use(middleware());

// Middleware for processing JSON
app.use(bodyParser.json());

// Request logger (Optional, logs requests for debugging)
app.use((req, res, next) => {
    console.log("Request Method:", req.method);
    console.log("Request URL:", req.url);
    next();
});

// Routes
app.use("/auth", authRoutes); // Link routes

// SuperTokens error handler (must be placed after routes)
app.use(errorHandler());

// Start the server
app.listen(3000, () => {
    console.log("User-Service running on http://localhost:3030");
});
