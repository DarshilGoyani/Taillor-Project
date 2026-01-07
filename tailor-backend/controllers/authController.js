const Admin = require('../models/Admin');
const bcrypt = require('bcrypt');
const crypto = require("crypto");
const jwt = require('jsonwebtoken');
const { sendEmail } = require('../utils/emailService');

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const admin = await Admin.findOne({ email });
        if (!admin) return res.status(400).json({ msg: "Admin not found" });

        const match = await bcrypt.compare(password, admin.password);
        if (!match) return res.status(400).json({ msg: "Invalid password" });

        if (admin.status !== "approved") {
            return res.status(403).json({
                msg: "Your business account is awaiting approval"
            });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        admin.otp = otp;
        admin.otpExpiry = Date.now() + 10 * 60 * 1000;
        admin.otpAttempts = 0;
        await admin.save({ validateBeforeSave: false });

        await sendEmail(
            admin.email,
            "Your Tailor Admin Login OTP",
            `Your OTP is: ${otp}. It will expire in 10 minutes.`
        );

        res.json({ msg: "OTP sent to your email" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server error" });
    }
};

exports.verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const admin = await Admin.findOne({ email });
        if (!admin) return res.status(400).json({ msg: "Account not found" });

        // 👇 FORCE BOTH TO STRING
        if (String(admin.otp) !== String(otp)) {
            return res.status(400).json({ msg: "Invalid OTP" });
        }

        if (admin.otpExpiry < Date.now()) {
            return res.status(400).json({ msg: "OTP expired" });
        }

        admin.otp = undefined;
        admin.otpExpiry = undefined;
        admin.failedOtpAttempts = 0;
        await admin.save({ validateBeforeSave: false });

        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
            expiresIn: "1d"
        });

        res.json({ token, admin });

    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Server error" });
    }
};

// 📩 Forgot Password
exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const admin = await Admin.findOne({ email });
        if (!admin) return res.status(404).json({ msg: "Account not found" });

        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        admin.otp = otp;
        admin.otpExpiry = Date.now() + 5 * 60 * 1000; // 5 minutes
        await admin.save({ validateBeforeSave: false });

        await sendEmail(
            admin.email,
            "Password Reset OTP",
            `Your OTP is ${otp}. Valid for 5 minutes.`
        );

        res.json({ msg: "OTP sent to your email" });

    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Server error" });
    }
};


// 🔑 Reset Password
exports.resetPassword = async (req, res) => {
    try {
        const { email, otp, password } = req.body;

        const admin = await Admin.findOne({ email });

        if (!admin) {
            return res.status(404).json({ msg: "Account not found" });
        }

        // ✅ Force string comparison for OTP validation
        if (!admin.otp || String(admin.otp) !== String(otp)) {
            return res.status(400).json({ msg: "Invalid OTP" });
        }

        // ✅ Re-enabled OTP expiry check
        if (admin.otpExpiry < Date.now()) {
            return res.status(400).json({ msg: "OTP expired" });
        }

        const hashed = await bcrypt.hash(password, 10);

        admin.password = hashed;
        admin.otp = undefined;
        admin.otpExpiry = undefined;

        // ✅ Skip validation to avoid required field errors - THIS IS THE CRITICAL FIX
        await admin.save({ validateBeforeSave: false });

        res.json({ msg: "Password reset successful" });

    } catch (err) {
        console.error("Reset Password Error:", err);
        res.status(500).json({ msg: "Server error", error: err.message });
    }
};



exports.resendOTP = async (req, res) => {
    try {
        const { email } = req.body;

        const admin = await Admin.findOne({ email });
        if (!admin) return res.status(400).json({ msg: "Admin not found" });

        // 🔁 Limit resend attempts
        if (admin.otpAttempts >= 3) {
            return res.status(429).json({ msg: "Resend limit reached. Try again later." });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        admin.otp = otp;
        admin.otpExpiry = Date.now() + 10 * 60 * 1000;
        admin.otpAttempts = (admin.otpAttempts || 0) + 1;

        await admin.save();

        await sendEmail(
            admin.email,
            "Your Tailor Admin Login OTP",
            `Your OTP is: ${otp}. It will expire in 10 minutes.`
        );

        res.json({ msg: "OTP resent successfully" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Resend failed" });
    }
};

// exports.register = async (req, res) => {
//     try {
//         const { fullName, email, password, phone, city, businessName } = req.body;

//         if (!fullName || !email || !password || !phone || !city || !businessName) {
//             return res.status(400).json({ msg: "All fields are required" });
//         }

//         const existing = await Admin.findOne({ email });
//         if (existing) {
//             return res.status(400).json({ msg: "Email already registered" });
//         }

//         const hashed = await bcrypt.hash(password, 10);

//         const admin = await Admin.create({
//             ownerName: fullName,
//             email,
//             password: hashed,
//             phone,
//             city,
//             businessName,
//             status: "pending"
//         });

//         res.json({ msg: "Registration successful. Awaiting approval." });

//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ msg: "Server error during registration" });
//     }
// };
