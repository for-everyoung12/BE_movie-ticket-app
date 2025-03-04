const ShowtimeService = require('../services/showtime.service');

exports.getShowtimeByMovies = async (req, res) => {
    try {
        const showtimes = await ShowtimeService.getShowtimeByMovies();
        return res.status(200).json({showtimes});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

exports.addShowtime = async (req, res) => {
    try {
        const showtimeData = req.body;
        const showtime = await ShowtimeService.addShowtime(showtimeData);
        return res.status(201).json({showtime});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

exports.updateShowtime = async (req, res) => {
    try {
        const {showtimeId} = req.params;
        const showtimeData = req.body;
        const showtime = await ShowtimeService.updateShowtime(showtimeId, showtimeData);
    return res.status(200).json({showtime});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

exports.deleteShowtime = async (req, res) => {
    const {showtimeId} = req.params;   
    try {
        const showtime = await ShowtimeService.deleteShowtime(showtimeId);
        return res.status(200).json({showtime}); 
    } catch (error) {
        
    }
}