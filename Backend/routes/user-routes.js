const express = require("express");
const router = express.Router();

const userController = require('../controllers/user-controllers');
const searchController = require('../controllers/search-controllers');
const bookingController = require('../controllers/booking-controllers');

router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.post("/reset-password", userController.resetPassword);
router.post("/new-password", userController.newPassword);
router.post("/firebase-auth", userController.firebaseAuth);
router.get("/home", searchController.search);
router.get("/search", searchController.search);
router.get("/hotel/:id", searchController.getHotel);
router.post("/checkout", bookingController.checkout);
router.post("/pay", bookingController.pay);
router.post("/subscribe", userController.subscribe);

module.exports = router;