const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.Mixed,
        ref: "User", // Reference to the `users` collection
        required: true,
    },
    action: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Log", logSchema);
