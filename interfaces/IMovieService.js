class IMovieService {
  async getAllMovies() {}
  async getMovieById(movieId) {}
  async addMovie(movieData) {}
  async updateMovie(movieId, movieData) {}
  async deleteMovie(movieId) {}
}

module.exports = IMovieService;