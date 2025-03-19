class IAuthService {
    async register(userData) {}
    async login(credentials) {}
    async getProfile() {}
    async logout(user, refreshToken) {}
}
module.exports = IAuthService;