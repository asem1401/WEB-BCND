const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  getProfile,
  updateProfile
} = require("../controllers/user.controller.js");

const authMiddleware = require("../middleware/auth.middleware");

router.get("/", authMiddleware, getAllUsers);
router.get("/profile", authMiddleware, getProfile);
router.put("/profile", authMiddleware, updateProfile);

module.exports = router;