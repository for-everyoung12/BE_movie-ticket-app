const express = require("express");

module.exports = (paymentController) => {
  const router = express.Router();

  // Tạo đơn hàng PayPal
  router.post("/paypal/create", paymentController.createPayment.bind(paymentController));

  // Xác nhận thanh toán PayPal
  router.post("/paypal/capture", paymentController.capturePayment.bind(paymentController));

  // Lấy thông tin thanh toán
  router.get("/:paymentId", paymentController.getPayment.bind(paymentController));

  return router;
};