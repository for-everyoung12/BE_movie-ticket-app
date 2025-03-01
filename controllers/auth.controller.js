const AuthService = require("../services/auth.service");

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const result = await AuthService.register({ name, email, password, role });
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await AuthService.login({ email, password });
    res.json(result);
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

exports.profile = async (req, res) => {
  try {
    const users = await AuthService.getProfile();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.logout = async (req, res) => {
  try {
    const refreshToken = req.body.refreshToken;
    const result = await AuthService.logout(req.user, refreshToken);
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
