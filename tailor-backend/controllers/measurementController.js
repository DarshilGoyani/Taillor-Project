const Measurement = require('../models/Measurement');

// ➕ Add Measurement
exports.addMeasurement = async (req, res) => {
    const measurement = await Measurement.create(req.body);
    res.json(measurement);
};

// 📥 Get Measurements of One Customer
exports.getMeasurementsByCustomer = async (req, res) => {
    const data = await Measurement.find({ customerId: req.params.id });
    res.json(data);
};

// ✏️ Update Measurement
exports.updateMeasurement = async (req, res) => {
    await Measurement.findByIdAndUpdate(req.params.id, req.body);
    res.json({ msg: "Measurement updated" });
};

// 🗑 Delete Measurement
exports.deleteMeasurement = async (req, res) => {
    await Measurement.findByIdAndDelete(req.params.id);
    res.json({ msg: "Measurement deleted" });
};
