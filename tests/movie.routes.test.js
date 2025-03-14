const request = require("supertest");
const express = require("express");
const movieRoutes = require("../routes/movie.routes");

const app = express();
app.use(express.json());

// 🔥 Mock MovieController (Không dùng MovieService thật)
const movieControllerMock = {
  getAllMovies: (req, res) => res.json([{ id: 1, title: "Mock Movie" }]),

  getMovieById: (req, res) => {
    const movieId = parseInt(req.params.movieId);
    if (movieId !== 1) {
      return res.status(404).json({ message: "Movie not found" }); // 🔥 Trả về 404 nếu không phải ID 1
    }
    res.json({ id: movieId, title: "Mock Movie" });
  },

  addMovie: (req, res) => res.status(201).json({ id: 2, ...req.body }),
  updateMovie: (req, res) => res.json({ id: req.params.movieId, ...req.body }),
  deleteMovie: (req, res) => res.json({ message: "Movie deleted" }),
};

//ruyền `movieControllerMock` vào `movieRoutes`
app.use("/api/movies", movieRoutes(movieControllerMock));

describe("Movie Routes", () => {

  // Test GET /api/movies
  it("should return list of movies", async () => {
    const res = await request(app).get("/api/movies");

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([{ id: 1, title: "Mock Movie" }]);
  });

  //Test GET /api/movies/:movieId
  it("should return a single movie by ID", async () => {
    const res = await request(app).get("/api/movies/1");

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ id: 1, title: "Mock Movie" });
  });

  //Test POST /api/movies (Thêm phim mới)
  it("should add a new movie", async () => {
    const newMovie = { title: "New Mock Movie", genre: "Action", releaseYear: 2023 };
    const res = await request(app).post("/api/movies").send(newMovie);

    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({ id: 2, ...newMovie });
  });

  //Test PUT /api/movies/:movieId (Cập nhật phim)
  it("should update an existing movie", async () => {
    const updatedMovie = { title: "Updated Movie", genre: "Drama", releaseYear: 2024 };
    const res = await request(app).put("/api/movies/1").send(updatedMovie);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ id: "1", ...updatedMovie });
  });

  //Test DELETE /api/movies/:movieId (Xóa phim)
  it("should delete a movie by ID", async () => {
    const res = await request(app).delete("/api/movies/1");

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: "Movie deleted" });
  });

});
describe("Movie Routes Error Handling", () => {
  it("should return 404 if movie is not found", async () => {
    const res = await request(app).get("/api/movies/999"); // ID không tồn tại

    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({ message: "Movie not found" });
  });
});
