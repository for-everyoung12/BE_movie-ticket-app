class IAuthService {
    async register(userData) {}
    async login(credentials) {}
    async getProfileById(userId) {}
    async getProfile() {}
    async updateProfile(userId, updateData){}
    async logout(user, refreshToken) {}
    async deleteProfile(userId){}
}
module.exports = IAuthService;  