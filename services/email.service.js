const nodemailer = require("nodemailer");
require("dotenv").config();

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      service: process.env.EMAIL_SERVICE, 
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  } 

  async sendBookingConfirmation(email, ticketDetails) {
    const { movie_name, showtime, seat_numbers, price } = ticketDetails;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "🎟️ Xác Nhận Đặt Vé Thành Công!",
      html: `
        <h2>🎉 Bạn đã đặt vé thành công!</h2>
        <p><strong>Phim:</strong> ${movie_name}</p>
        <p><strong>Suất chiếu:</strong> ${new Date(showtime).toLocaleString()}</p>
        <p><strong>Ghế ngồi:</strong> ${seat_numbers.join(", ")}</p>
        <p><strong>Tổng tiền:</strong> $${price}</p>
        <hr/>
        <p>Cảm ơn bạn đã đặt vé tại <strong>Movie Ticket App</strong>! Chúc bạn xem phim vui vẻ! 🍿</p>
      `,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log("📧 Email sent: ", info.response);
    } catch (error) {
      console.error("❌ Error sending email: ", error);
    }
  }
}

module.exports = new EmailService();
