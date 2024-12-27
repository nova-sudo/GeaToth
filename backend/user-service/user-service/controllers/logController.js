const mongoose = require("mongoose");
const Log = require("../models/logModel");

const createLog = async (userId, action) => {
    try {
        const log = new Log({
            user_id: userId,
            action: action,
        });
        const savedLog = await log.save(); // حفظ السجل في قاعدة البيانات
        console.log("Log created:", savedLog); // طباعة السجل بعد الحفظ
        return savedLog; // إرجاع السجل
    } catch (err) {
        console.error("Error creating log:", err.message);
        throw err;
    }
};

const getUserLogs = async (userId) => {
    try {
        return await Log.find({ user_id: userId }).sort({ created_at: -1 });
    } catch (err) {
        console.error("Error retrieving logs:", err.message);
        throw err;
    }
};

module.exports = { createLog, getUserLogs };
