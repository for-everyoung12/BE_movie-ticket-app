const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const Movie = require('./models/movie.model');
const User = require('./models/user.model');
const Ticket = require('./models/ticket.model');
const Payment = require('./models/payment.model');
const Review = require('./models/review.model');
const Room = require('./models/room.model');
const Showtime = require('./models/showtime.model');
const Seat = require('./models/seat.model');
const Cinema = require('./models/cinema.model');
const cors = require("cors");
const passport = require("passport");
const seatCronJob = require('./jobs/seatCronJob'); 
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(passport.initialize());

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
app.use("/api/auth", require("./routes/auth.routes"));

  //Movie
app.use("/api/movies", require("./routes/movie.routes"));
  //Cinema
app.use("/api/cinemas", require("./routes/cinema.routes"));
  //Room
app.use("/api/rooms", require("./routes/room.routes"));
  //Showtime
app.use("/api/showtimes", require("./routes/showtime.routes"));
  //Payment
app.use("/api/payments", require("./routes/payment.routes"));
  //Review
app.use("/api/reviews", require("./routes/review.routes"));
  //Seat
app.use("/api/seats", require("./routes/seat.routes"));
  //Ticket
app.use("/api/tickets", require("./routes/ticket.routes"));

app.get("/", (req, res) => {
  res.json({ message: "Start successful" });
});