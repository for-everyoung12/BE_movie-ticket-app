const express = require("express");
const { register, login, profile, logout } = require("../controllers/auth.controller");
const { authenticateJWT } = require("../middlewares/auth.middlewares");
const { isAdmin } = require("../middlewares/auth.middlewares");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", authenticateJWT, profile);
router.post("/logout", authenticateJWT, logout);

module.exports = router;
