class IPaymentService {
    async createPayment(paymentData) {}
    async capturePayment(orderId) {}
    async getPaymentById(paymentId) {}
}

module.exports = IPaymentService;