const express = require('express');
const { createPayment, getPayment } = require('../controllers/payment.controller');
const router = express.Router();

router.post('/', createPayment);

router.get('/:paymentId', getPayment);

module.exports = router;
