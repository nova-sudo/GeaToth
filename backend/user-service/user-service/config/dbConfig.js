const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(
            "mongodb+srv://Amr:Amr%40Root@cluster0.6ztaj.mongodb.net/user_service_db?retryWrites=true&w=majority"
        );
        console.log("MongoDB Connected...");
    } catch (err) {
        console.error("Error connecting to MongoDB:", err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
