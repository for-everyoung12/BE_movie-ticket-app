const express = require("express");
const { register, login, profile, logout } = require("../controllers/auth.controller");
const { authenticateJWT } = require("../middlewares/auth.middleware");
const { isAdmin } = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/register", authenticateJWT, isAdmin, register);
router.post("/login", login);
router.get("/profile", authenticateJWT, profile);
router.post("/logout", authenticateJWT, logout);

module.exports = router;
