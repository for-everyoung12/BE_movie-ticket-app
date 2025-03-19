class ICinemaService {
    async getAllCinemas () {}
    async getCinemaById (cinemaId) {}
    async addCinema (cinemaData) {}   
    async updateCinema (cinemaId, cinemaData) {}
    async deleteCinema (cinemaId) {}
}

module.exports = ICinemaService;