class IAuthService {
    async register(userData){
        throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
    }
    async login(credentials){
        throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
    }
    async getProfile(){
        throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
    }
    async logout(user, refreshToken){
        throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
    }
}
module.exports = IAuthService;