import React, { useState, useEffect } from 'react';
import { sendPaymentData } from 'services/paymentService';
import { nanoid } from 'nanoid';

//Styles
import styles from './FinancesCard.module.scss';
import Button from '@mui/material/Button';

const FinancesCard = () => {
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
        order_id: nanoid(),
      });
      setPayment(paymentData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPaymentData();
  }, []);

  console.log(payment);

  return (
    <div className={styles.financesCard}>
      <div className={styles.cardBody}>
        <h4>One lesson</h4>
        <h2 className={styles.cardPricing}>
          5$
          <span>/ lesson</span>
        </h2>
        <form method='POST' action='https://www.liqpay.ua/api/3/checkout' acceptCharset='utf-8'>
          <input type='hidden' name='data' value={payment.data} />
          <input type='hidden' name='signature' value={payment.signature} />
          <Button className={styles.deleteBtn} variant='contained' type='submit'>
            Pay
          </Button>
        </form>
      </div>
    </div>
  );
};

export default FinancesCard;
