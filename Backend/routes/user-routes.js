const express = require("express");
const router = express.Router();

const userController = require('../controllers/user-controllers');

router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.post("/reset-password", userController.resetPassword);
router.post("/new-password", userController.newPassword);
// router.put("/update", userController.update);

module.exports = router;