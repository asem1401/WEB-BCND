const express = require("express");
const router = express.Router();

const { getAllUsers, getProfile } = require("../controllers/user.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.get("/", authMiddleware, getAllUsers);

// 👇 ВОТ ЭТО
router.get("/profile", authMiddleware, getProfile);

module.exports = router;