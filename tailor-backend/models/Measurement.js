const mongoose = require('mongoose');

const measurementSchema = new mongoose.Schema({
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
    type: String,
    measurements: Object,
    image: String
}, { timestamps: true });

module.exports = mongoose.model("Measurement", measurementSchema);
