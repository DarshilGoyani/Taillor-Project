const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const requireAdmin = require('../middleware/requireAdmin');
const {
    addAdmin,
    getAdmins,
    updateAdmin,
    deleteAdmin
} = require('../controllers/adminController');

// All routes protected
router.post('/', protect, requireAdmin, addAdmin);
router.get('/', protect, requireAdmin, getAdmins);
router.put('/:id', protect, requireAdmin, updateAdmin);
router.delete('/:id', protect, requireAdmin, deleteAdmin);

module.exports = router;
