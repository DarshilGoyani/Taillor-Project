const Admin = require('../models/Admin');
const bcrypt = require('bcrypt');

// ➕ Add Admin (Only Admin can create another Admin)
exports.addAdmin = async (req, res) => {
    try {
        const { ownerName, businessName, email, phone, city, password } = req.body;

        if (!ownerName || !businessName || !email || !phone || !city || !password) {
            return res.status(400).json({ msg: "All fields are required" });
        }

        const exists = await Admin.findOne({ email });
        if (exists) return res.status(400).json({ msg: "Admin already exists" });

        const hash = await bcrypt.hash(password, 10);

        const admin = await Admin.create({
            ownerName,
            businessName,
            email,
            phone,
            city,
            password: hash,
            role: "admin",
            status: "approved"
        });

        res.json({ msg: "Admin created successfully" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server error" });
    }
};

// 📥 Get All Admins
exports.getAdmins = async (req, res) => {
    try {
        const admins = await Admin.find().select('-password -otp -otpExpiry');
        res.json(admins);
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
};

// ✏️ Update Admin
exports.updateAdmin = async (req, res) => {
    try {
        const updates = { ...req.body };

        if (updates.password) {
            updates.password = await bcrypt.hash(updates.password, 10);
        }

        await Admin.findByIdAndUpdate(req.params.id, updates);
        res.json({ msg: "Admin updated" });

    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
};

// 🗑 Delete Admin
exports.deleteAdmin = async (req, res) => {
    try {
        await Admin.findByIdAndDelete(req.params.id);
        res.json({ msg: "Admin deleted" });
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
};
