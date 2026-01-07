const express = require('express');
const router = express.Router();
const { login, verifyOTP, forgotPassword, resetPassword, resendOTP } = require('../controllers/authController');

router.post('/login', login);
router.post("/verify-otp", verifyOTP);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/resend-otp", resendOTP);
// no register 
// router.post('/register', register);


module.exports = router;
