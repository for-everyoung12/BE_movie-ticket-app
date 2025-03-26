const cron = require('node-cron');
const Seat = require('../models/seat.model');
const Showtime = require('../models/showtime.model');

cron.schedule('* * * * *', async () => {  // Chạy mỗi phút
    try {
        const now = new Date();

        const releasedSeats = await Seat.updateMany(
            { status: 'held', held_until: { $lt: now } },
            { status: 'available', held_until: null }
        );

        if (releasedSeats.modifiedCount > 0) {
            console.log(`${releasedSeats.modifiedCount} held seats released.`);
        }

        const showtimes = await Showtime.find(); // Lấy tất cả lịch chiếu

        for (let showtime of showtimes) {
            const availableSeats = await Seat.countDocuments({ 
                showtime_id: showtime._id, 
                status: 'available' 
            });

            await Showtime.findByIdAndUpdate(showtime._id, { available_seats: availableSeats });
        }

        console.log("Updated available seats for all showtimes.");
    } catch (error) {
        console.error('Error in seat release & available seats update cron job:', error);
    }
});
