require('dotenv').config();
require('./config/db.config');

const bcrypt = require('bcrypt');
const Admin = require('./models/Admin');

(async () => {
    try {
        const exists = await Admin.findOne({ email: "sujalkidecha68@gmail.com" });

        if (exists) {
            console.log("Admin already exists");
            process.exit();
        }

        const hash = await bcrypt.hash("Sujal@123", 10);

        await Admin.create({
            ownerName: "Main Admin",
            businessName: "Stitch & Co.",
            email: "sujalkidecha68@gmail.com",
            password: hash,
            phone: "9737790499",
            city: "Surat",
            status: "approved"
        });

        console.log("Admin Created Successfully");
        process.exit();
    } catch (error) {
        console.error("Seed failed:", error);
        process.exit(1);
    }
})();
