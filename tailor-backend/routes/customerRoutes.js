const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const {
    addCustomer,
    getCustomers,
    getCustomer,
    updateCustomer,
    deleteCustomer
} = require('../controllers/customerController');

router.post('/', protect, addCustomer);
router.get('/', protect, getCustomers);
router.get('/:id', protect, getCustomer);
router.put('/:id', protect, updateCustomer);
router.delete('/:id', protect, deleteCustomer);

module.exports = router;
