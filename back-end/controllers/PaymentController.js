const paymentService = require('../services/PaymentService');

exports.providePayment = async (req, res) => {
  try {
    const paymentData = await paymentService.getPaymentData(req.body);
    res.json(paymentData);
  } catch (error) {
    console.log(error);
  }
};
