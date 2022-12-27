import React, { useState, useEffect } from 'react';
import { sendPaymentData } from 'services/paymentService';

const Finances = () => {
  const [payment, setPayment] = useState({
    data: '',
    signature: '',
  });

  const getPaymentData = async () => {
    try {
      const paymentData = await sendPaymentData({
        action: 'pay',
        amount: 3,
        currency: 'UAH',
        description: 'test',
        order_id: '0002',
      });
      setPayment(paymentData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPaymentData();
  }, []);

  console.log(payment.signature.length);

  return (
    <form method='POST' action='https://www.liqpay.ua/api/3/checkout' acceptCharset='utf-8'>
      <input type='hidden' name='data' value={payment.data} />
      <input type='hidden' name='signature' value={payment.signature} />
      <input type='image' src='//static.liqpay.ua/buttons/p1ru.radius.png' />
    </form>
  );
};

export default Finances;
