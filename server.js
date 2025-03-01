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
const cors = require("cors");
const passport = require("passport");

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
app.use("/api/auth", require("./routes/auth.routes"));

app.get("/", (req, res) => {
  res.json({ message: "Start successful" });
});