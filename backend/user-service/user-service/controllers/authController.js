const User = require("../models/userModel");
const { createLog } = require("./logController");

const registerUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const newUser = new User({ email, password_hash: password });
        const savedUser = await newUser.save();

        // Log the registration action
        await createLog(savedUser._id, "User registered");

        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user || user.password_hash !== password) {
            if (user) {
                await createLog(user._id, "Failed login attempt");
            }
            return res.status(401).json({ error: "Invalid credentials" });
        }

        // Log successful login
        await createLog(user._id, "User logged in");

        res.status(200).json({ message: "Logged in successfully", user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { registerUser, loginUser };
