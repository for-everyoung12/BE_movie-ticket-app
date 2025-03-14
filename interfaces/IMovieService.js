class IMovieService {
  async getAllMovies() {
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
  }
  async getMovieById(movieId) {
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
  }
  async addMovie(movieData) {
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
  }
  async updateMovie(movieId, movieData) {
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
  }
  async deleteMovie(movieId) {
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
  }
}

module.exports = IMovieService;