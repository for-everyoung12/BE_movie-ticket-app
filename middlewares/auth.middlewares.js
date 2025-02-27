const passport = require("passport");
const passportJWT = require("passport-jwt");
const User = require("../models/user.model");
require("dotenv").config();

const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
};

const jwtStrategy = new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
        const user = await User.findById(payload.sub);
        if (user) return done(null, user);
        return done(null, false);
    } catch (err) {
        return done(err, false);
    }
});

passport.use(jwtStrategy);
const authenticateJWT = passport.authenticate("jwt", { session: false });

// Middleware for admin || user
const isAdmin = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Forbidden: Admins only!" });
    }
    next();
};

module.exports = { authenticateJWT, isAdmin };
