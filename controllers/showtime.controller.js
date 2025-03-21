const ShowtimeService = require('../services/showtime.service');

class ShowtimeController{

    constructor(showtimeService){
        this.showtimeService = showtimeService;
    }

    async getAllShowtime(req, res) {
        try {
            const showtimes = await this.showtimeService.getAllShowtime();
            return res.status(200).json({ showtimes });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

     async getShowtimeByMovies (req, res){
        try {
            const {movieId} = req.params;
            const showtimes = await this.showtimeService.getShowtimeByMovies(movieId);
            return res.status(200).json({showtimes});
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }
    
    async addShowtime  (req, res){
        try {
            const showtimeData = req.body;
            const showtime = await this.showtimeService.addShowtime(showtimeData);
            return res.status(201).json({showtime});
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }
    
    async updateShowtime (req, res){
        try {
            const {showtimeId} = req.params;
            const showtimeData = req.body;
            const showtime = await this.showtimeService.updateShowtime(showtimeId, showtimeData);
        return res.status(200).json({showtime});
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }
    
    async deleteShowtime (req, res){
        const {showtimeId} = req.params;   
        try {
            const showtime = await this.showtimeService.deleteShowtime(showtimeId);
            return res.status(200).json({showtime}); 
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }
}
module.exports = ShowtimeController;