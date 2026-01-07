const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({

    // 🧵 Business Identity
    businessName: {
        type: String,
        required: true
    },

    ownerName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        unique: true,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: true
    },

    city: {
        type: String,
        required: true
    },

    // 🛡️ Platform Control
    role: {
        type: String,
        default: "admin"
    },

    status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "approved"   // because no public registration now
    },

    // 🔐 Security & Auth
    otp: String,
    otpExpiry: Date,

    resetToken: String,
    resetTokenExpiry: Date,

    failedOtpAttempts: {
        type: Number,
        default: 0
    },

    otpAttempts: {
        type: Number,
        default: 0
    }

}, { timestamps: true });

module.exports = mongoose.model("Admin", adminSchema);
