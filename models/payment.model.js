const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  ticket_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ticket' }],
  total_amount: { type: Number, required: true },
  payment_method: { type: String, enum: ['PayPal'], required: true },
  payment_status: { type: String, enum: ['Completed', 'Pending', 'Failed'], required: true },
  transaction_id: { type: String, required: true, unique: true },
  payment_date: { type: Date, default: Date.now }
});

const Payment = mongoose.model('Payment', paymentSchema);
module.exports = Payment;
