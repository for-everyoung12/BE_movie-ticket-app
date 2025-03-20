const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const expressFileUpload = require('express-fileupload');
//model
const Movie = require('./models/movie.model');
const User = require('./models/user.model');
const Ticket = require('./models/ticket.model');
const Payment = require('./models/payment.model');
const Review = require('./models/review.model');
const Room = require('./models/room.model');
const Showtime = require('./models/showtime.model');
const Seat = require('./models/seat.model');
const Cinema = require('./models/cinema.model');

//
const MovieService = require('./services/movie.service');
const MovieController = require('./controllers/movie.controller');
const movieRoutes = require('./routes/movie.routes');

const AuthService = require('./services/auth.service');
const AuthController = require('./controllers/auth.controller');
const authRoutes = require('./routes/auth.routes');

const TicketService = require('./services/ticket.service');
const TicketController = require('./controllers/ticket.controller');
const ticketRoutes = require('./routes/ticket.routes');

const SeatService = require('./services/seat.service');
const SeatController = require('./controllers/seat.controller');
const seatRoutes = require('./routes/seat.routes');

const CinemaService = require('./services/cinema.service');
const CinemaController = require('./controllers/cinema.controller');
const cinemaRoutes = require('./routes/cinema.routes');

const ShowtimeService = require('./services/showtime.service');
const ShowtimeController = require('./controllers/showtime.controller');
const showtimeRoutes = require('./routes/showtime.routes');

const RoomService = require('./services/room.service');
const RoomController = require('./controllers/room.controller');
const roomRoutes = require('./routes/room.routes');

const ReviewService = require('./services/review.service');
const ReviewController = require('./controllers/review.controller');
const reviewRoutes = require('./routes/review.routes'); 

const PaymentService = require('./services/payment.service');
const PaymentController = require('./controllers/payment.controller');
const paymentRoutes = require('./routes/payment.routes');


//Inject dependencies
  //Movie
const movieService = new MovieService();
const movieController = new MovieController(movieService);
  //User
const authService = new AuthService();
const authController = new AuthController(authService);
  //Ticket
const ticketService = new TicketService();
const ticketController = new TicketController(ticketService);
  //Seat
const seatService = new SeatService();
const seatController = new SeatController(seatService);
  //Cinema
const cinemaService = new CinemaService();
const cinemaController = new CinemaController(cinemaService);
  //Showtime
const showtimeService = new ShowtimeService();
const showtimeController = new ShowtimeController(showtimeService);
  //Room
const roomService = new RoomService();
const roomController = new RoomController(roomService);
  //Review
const reviewService = new ReviewService();
const reviewController = new ReviewController(reviewService);
  //Payment
const paymentService = new PaymentService();
const paymentController = new PaymentController(paymentService);
//middleware
const cors = require("cors");
const passport = require("passport");

//jobs
const seatCronJob = require('./jobs/seatCronJob'); 

// Initialize app
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(passport.initialize());
// Sử dụng express-fileupload
app.use(expressFileUpload());
// Connect DB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch(err => {
    console.log(err);
    process.exit(1);
  });

// Routes
  //Authenication
app.use("/api/auth", authRoutes(authController));
  //Movie
app.use("/api/movies", movieRoutes(movieController));
  //Cinema
app.use("/api/cinemas", cinemaRoutes(cinemaController));
  //Room
app.use("/api/rooms", roomRoutes(roomController));
  //Showtime
app.use("/api/showtimes", showtimeRoutes(showtimeController));
  //Payment
app.use("/api/payments", paymentRoutes(paymentController));
  //Review
app.use("/api/reviews", reviewRoutes(reviewController));
  //Seat
app.use("/api/seats", seatRoutes(seatController));
  //Ticket
app.use("/api/tickets", ticketRoutes(ticketController));

app.get("/", (req, res) => {
  res.json({ message: "Start successful" });
});