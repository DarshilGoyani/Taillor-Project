const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const {
    addMeasurement,
    getMeasurementsByCustomer,
    updateMeasurement,
    deleteMeasurement
} = require('../controllers/measurementController');

router.post('/', protect, addMeasurement);
router.get('/customer/:id', protect, getMeasurementsByCustomer);
router.put('/:id', protect, updateMeasurement);
router.delete('/:id', protect, deleteMeasurement);

module.exports = router;
