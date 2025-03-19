class PaymentController {
  constructor(paymentService) {
    this.paymentService = paymentService;
  }

  // API tạo đơn hàng PayPal
  async createPayment(req, res) {
    try {
      const payment = await this.paymentService.createPayment(req.body);
      res.status(201).json({ success: true, payment });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

  // API xác nhận thanh toán PayPal
  async capturePayment(req, res) {
    try {
      const { orderId } = req.body;
      const payment = await this.paymentService.capturePayment(orderId);
      res.status(200).json({ success: true, payment });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  // API lấy thông tin thanh toán
  async getPayment(req, res) {
    try {
      const payment = await this.paymentService.getPaymentById(req.params.paymentId);
      if (!payment) {
        return res.status(404).json({ success: false, message: "Payment not found" });
      }
      res.status(200).json({ success: true, payment });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }
}

module.exports = PaymentController;
