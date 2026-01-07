const Admin = require('../models/Admin');

module.exports = async (req, res, next) => {
    try {
        const admin = await Admin.findById(req.admin.id);

        if (!admin || admin.role !== "admin") {
            return res.status(403).json({ msg: "Access denied" });
        }

        next();
    } catch {
        res.status(403).json({ msg: "Access denied" });
    }
};
