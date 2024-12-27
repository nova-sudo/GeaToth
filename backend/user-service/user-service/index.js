const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/dbConfig");
const authRoutes = require("./routes/authRoutes");
const supertokens = require("./config/supertokensConfig");
const { middleware, errorHandler } = require("supertokens-node/framework/express");

const app = express();

// Connect to MongoDB
connectDB();

// SuperTokens middleware (يجب إضافته قبل المسارات)
app.use(middleware());

// Middleware for processing JSON
app.use(bodyParser.json());

// Routes
app.use("/auth", authRoutes); // Link routes

// SuperTokens error handler (ضعه بعد المسارات)
app.use(errorHandler());

// Request logger
app.use((req, res, next) => {
    console.log("Request Method:", req.method);
    console.log("Request URL:", req.url);
    next();
});

// Start the server
app.listen(3030, () => {
    console.log("User-Service running on http://localhost:3030");
});
