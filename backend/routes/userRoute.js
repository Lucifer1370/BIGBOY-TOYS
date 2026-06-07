const express = require("express");
const { register, verify, reVerify, login, logout, forgotPassword, verifyOTPandResetPas, getAllUser, getUserbyId, updateProfile, toggleWishlist, getWishlist } = require("../controllers/userController.js")
const { isAuthenticated, isAdmin } = require("../middleware/isAuthenticated.js")
const router = express.Router()
router.post('/register', register);
router.post('/verify', verify);
router.post('/reVerify', reVerify);
router.post('/login', login);
router.post('/logout', isAuthenticated, logout);
router.post('/forgotPassword', forgotPassword);
router.post('/verifyOTPandResetPas', verifyOTPandResetPas);
router.get('/get-all-user', isAuthenticated, isAdmin, getAllUser);
router.get('/get-all-user/:userId', getUserbyId);
router.put('/profile', isAuthenticated, updateProfile);
router.post('/wishlist', isAuthenticated, toggleWishlist);
router.get('/wishlist', isAuthenticated, getWishlist);
module.exports = router;