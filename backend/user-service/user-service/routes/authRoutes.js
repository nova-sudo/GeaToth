const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/authController");
const { createLog, getUserLogs } = require("../controllers/logController");

// User registration
router.post("/register", registerUser);

// User login
router.post("/login", loginUser);

// Retrieve logs for a specific user
router.get("/logs/:userId", async (req, res) => {
    try {
        const logs = await getUserLogs(req.params.userId);
        if (logs.length === 0) {
            return res.status(404).json({ message: "No logs found for this user." });
        }
        res.status(200).json(logs);
    } catch (err) {
        console.error("Error retrieving logs:", err.message);
        res.status(500).json({ error: err.message });
    }
});

// Log actions from services
router.post("/logs", async (req, res) => {
    const { user_id, action } = req.body;

    // Validate request body
    if (!user_id || !action) {
        return res.status(400).json({ error: "user_id and action are required." });
    }

    try {
        // Create a log
        const log = await createLog(user_id, action);
        console.log("Log created successfully:", log); // Log the created log
        res.status(201).json({ message: "Log created successfully", log });
    } catch (err) {
        console.error("Error creating log:", err.message); // Log any error
        res.status(500).json({ error: err.message });
    }
});

module.exports = router; // Ensure the router is exported correctly
