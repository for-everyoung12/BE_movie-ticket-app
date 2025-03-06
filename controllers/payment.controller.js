// backend/controllers/payment.controller.js
const PaymentService = require('../services/payment.service');

exports.createPayment = async (req, res) => {
  const paymentData = req.body;
  try {
    const payment = await PaymentService.createPayment(paymentData);
    res.status(201).json(payment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getPayment = async (req, res) => {
  const { paymentId } = req.params;
  try {
    const payment = await PaymentService.getPaymentById(paymentId);
    res.status(200).json(payment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
