const cron = require('node-cron');
const Seat = require('../models/seat.model');
const Showtime = require('../models/showtime.model');


cron.schedule('* * * * *', async () => {
  const currentTime = new Date();

  const seatsToRelease = await Seat.find({
    status: 'held',
    held_until: { $lt: currentTime },
  });

  for (const seat of seatsToRelease) {
    seat.status = 'available';
    seat.held_until = null;
    await seat.save();

    const showtime = await Showtime.findById(seat.showtime_id);
    if (showtime) {
      showtime.available_seats += 1;
      await showtime.save();
    }

    console.log(`Seat ${seat.seat_number} released and showtime available_seats updated.`);
  }
});
