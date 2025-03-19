const express = require('express');

module.exports = (cinemaController) => {

    const router = express.Router();

    router.get('/', cinemaController.getAllCinemas.bind(cinemaController));

    router.get('/:cinemaId', cinemaController.getCinemaById.bind(cinemaController));

    router.post('/', cinemaController.addCinema.bind(cinemaController));

    router.put('/:cinemaId', cinemaController.updateCinema.bind(cinemaController));

    router.delete('/:cinemaId', cinemaController.deleteCinema.bind(cinemaController));
    
    return router
}
