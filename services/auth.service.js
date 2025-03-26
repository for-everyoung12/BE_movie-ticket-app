const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const Showtime = require("../models/showtime.model");
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

    const accessToken = jwt.sign({ sub: user._id }, process.env.JWT_SECRET, { expiresIn: "60m" });
    const refreshToken = jwt.sign({ sub: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    user.refreshTokens = [refreshToken];
    await user.save();

    return { accessToken, refreshToken };
  }

  async getProfileById(userId) {
    const user = await User.findById(userId).populate({
      path: 'booked_tickets',
      populate: [
        { path: 'movie_id', select: 'title' },
        { path: 'room_id', select: 'hall_number' },
        { path: 'showtime_id', select: 'showtime' }
      ]
    });
  
    if (!user) {
      throw new Error("User not found");
    }
  
    return user;
  }

  async getProfile() {
    return await User.find();
  }

  async updateProfile(userId, updateData) {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
  
    if (updateData.name) user.name = updateData.name;
    if (updateData.phone) user.phone = updateData.phone;
  
    await user.save();
  
    return {
      message: "Profile updated successfully",
      user: {
        _id: user._id,
        name: user.name,
        phone: user.phone,
        email: user.email,
      }
    };
  }
  
  async logout(user, refreshToken) {
    user.refreshTokens = user.refreshTokens.filter(token => token !== refreshToken);
    await user.save();
    return { message: "Logout successful" };
  }

  async deleteProfile(userId) {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      throw new Error("User not found");
    }
    return { message: "User deleted successfully", userId: user._id };
  }
  
}

module.exports = AuthService;
