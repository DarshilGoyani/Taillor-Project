const Customer = require('../models/Customer');
const Measurement = require('../models/Measurement');
const Admin = require('../models/Admin');

exports.getStats = async (req, res) => {
    const totalCustomers = await Customer.countDocuments();
    const totalMeasurements = await Measurement.countDocuments();
    const totalAdmins = await Admin.countDocuments();

    const recentCustomers = await Customer.find().sort({ createdAt: -1 }).limit(5);

    res.json({
        totalCustomers,
        totalMeasurements,
        totalAdmins,
        recentCustomers
    });
};
