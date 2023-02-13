const sha1 = require('sha1');
const crypto = require('crypto');

const privateKey = process.env.LIQPAY_PRIVATE_KEY;
const publicKey = process.env.LIQPAY_PUBLIC_KEY;
const paymentUrl = process.env.LIQPAY_URL;
const version = process.env.LIQPAY_API_VERSION;

const getPaymentData = async (data) => {
  const dataObject = {
    public_key: publicKey,
    version: version,
    action: data.action,
    amount: data.amount,
    currency: data.currency,
    description: data.description,
    dae: data.dae,
    order_id: data.order_id,
    result_url: 'https://incredible-torte-ac738e.netlify.app/app/finances',
    server_url: 'https://inter-school.onrender.com/transactions',
  };

  const jsonString = JSON.stringify(dataObject);

  const dataPayment = Buffer.from(jsonString).toString('base64');

  const signature = crypto
    .createHash('sha1')
    .update(privateKey + dataPayment + privateKey)
    .digest('base64');

  const newDataObject = {
    data: dataPayment,
    signature: signature,
  };

  return newDataObject;
};

module.exports = { getPaymentData };
