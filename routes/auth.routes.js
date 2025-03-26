const express = require("express");
const { authenticateJWT } = require("../middlewares/auth.middlewares");

module.exports = (authController) => {
    const router = express.Router();

    router.post("/register", authController.register.bind(authController));
    router.post("/login", authController.login.bind(authController));
    router.get("/profile", authenticateJWT, authController.profile.bind(authController));
    router.get("/profile/:id", authenticateJWT, authController.getProfileById.bind(authController));
    router.put("/profile/:id", authenticateJWT, authController.updateProfile.bind(authController));
    router.post("/logout", authenticateJWT, authController.logout.bind(authController));

    return router; 
}


