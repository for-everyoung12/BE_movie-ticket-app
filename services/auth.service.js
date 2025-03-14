const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const IAuthService = require("../interfaces/IAuthService");
require("dotenv").config();

class AuthService extends IAuthService {
  async register({ name, email, password, role = "user" }) {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("Email already exists");
    }

    const user = new User({ name, email, password, role });
    await user.save();
    return { message: "User registered successfully" };
  }

  async login({ email, password }) {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      throw new Error("Invalid email or password");
    }

    const accessToken = jwt.sign({ sub: user._id }, process.env.JWT_SECRET, { expiresIn: "15m" });
    const refreshToken = jwt.sign({ sub: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    user.refreshTokens.push(refreshToken);
    await user.save();

    return { accessToken, refreshToken };
  }

  async getProfile() {
    return await User.find();
  }

  async logout(user, refreshToken) {
    user.refreshTokens = user.refreshTokens.filter(token => token !== refreshToken);
    await user.save();
    return { message: "Logout successful" };
  }
}

module.exports = AuthService;
