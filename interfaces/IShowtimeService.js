class IShowtimeService {
    async getAllShowtime(){}
    async getShowtimeByMovies(movieId){}
    async addShowtime(showtimeData){}
    async updateShowTime(showtimeId, showtimeData){}
    async deleteShowtime(showtimeId){}
}

module.exports = IShowtimeService;