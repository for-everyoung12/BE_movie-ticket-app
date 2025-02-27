const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
require("dotenv").config();

exports.register = async (req, res) => {
    try {
      const { username, password, role } = req.body;
  
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }

      const user = new User({ username, password, role: role || "user"
      });
      await user.save();
  
      res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };

  exports.login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
  
    if (user && await user.comparePassword(password)) {
      const accessToken = jwt.sign({ sub: user._id }, process.env.JWT_SECRET, { expiresIn: "15m" });
      const refreshToken = jwt.sign({ sub: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
  
      user.refreshTokens.push(refreshToken);
      await user.save();
  
      res.json({ accessToken, refreshToken });
    } else {
      res.status(401).json({ message: "Invalid username or password" });
    }
  };

exports.profile = async (req, res) => {
  const user = await User.find();
  res.json(user);
};

exports.logout = async (req, res) => {
  const refreshToken = req.body.refreshToken;

  req.user.refreshTokens = req.user.refreshTokens.filter(token => token !== refreshToken);
  await req.user.save();

  res.json({ message: "Logout successful" });
};
