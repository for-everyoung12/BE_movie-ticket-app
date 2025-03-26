const AuthService = require("../services/auth.service");

class AuthController {
  constructor(authService) {
    this.authService = authService;
  }

  async register(req, res) {
    try {
      const result = await this.authService.register( req.body );
      res.status(201).json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };

  async login(req, res) {
    try {
      const result = await this.authService.login(req.body);
      res.json(result);
    } catch (err) {
      res.status(401).json({ message: err.message });
    }
  };

  async getProfileById(req, res) {
    try {
      const { id } = req.params;
      const user = await this.authService.getProfileById(id);
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async profile(req, res) {
    try {
      const users = await this.authService.getProfile();
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  async updateProfile(req, res) {
    try {
      const { id } = req.params;
      const { name, phone } = req.body;
  
      const result = await this.authService.updateProfile(id, { name, phone });
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
  
  async logout(req, res) {
    try {
      const refreshToken = req.body.refreshToken;
      const result = await this.authService.logout(req.user, refreshToken);
      res.json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };

  async deleteProfile(req, res) {
    try {
      const { id } = req.params;
      const result = await this.authService.deleteProfile(id);
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
  

}

module.exports = AuthController;