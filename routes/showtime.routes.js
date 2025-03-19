const express = require('express');



module.exports = (showtimeController) => {

    const  router = express.Router();

    router.get('/:movieId',showtimeController.getShowtimeByMovies.bind(showtimeController));
    router.post('/',showtimeController.addShowtime.bind(showtimeController));
    router.put('/:showtimeId',showtimeController.updateShowtime.bind(showtimeController));
    router.delete('/:showtimeId',showtimeController.deleteShowtime.bind(showtimeController));
    
    return router;
};
