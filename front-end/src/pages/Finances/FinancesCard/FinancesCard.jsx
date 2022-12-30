import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { sendPaymentData } from 'services/paymentService';
import { nanoid } from 'nanoid';

//Styles
import styles from './FinancesCard.module.scss';
import Button from '@mui/material/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const FinancesCard = ({ pricing, user }) => {
  const { name, price, currency, description } = pricing;

  const [payment, setPayment] = useState({
    data: '',
    signature: '',
  });

  const dae = JSON.stringify({
    fullName: user.fullName,
    userId: user.userId,
  });

  const getPaymentData = useCallback(async () => {
    try {
      const paymentData = await sendPaymentData({
        action: 'pay',
        amount: price,
        currency: currency,
        description: 'Teacher Platform Subscription',
        order_id: nanoid(),
        dae: dae,
      });
      setPayment(paymentData);
    } catch (error) {
      console.log(error);
    }
  }, [currency, user.fullName, user.userId, price]);

  useEffect(() => {
    getPaymentData();
  }, [getPaymentData]);

  return (
    <div className={styles.financesCard}>
      <div className={styles.cardBody}>
        <h4>{name}</h4>
        <div className={styles.cardIcon}>
          <FontAwesomeIcon icon={faUser} />
        </div>
        <h2 className={styles.cardPricing}>
          {price + ' ' + currency}
          <span>{`/ ${name}`}</span>
        </h2>
        <p>{description}</p>
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

//propTypes
FinancesCard.propTypes = {
  pricing: PropTypes.object,
  user: PropTypes.object,
};
FinancesCard.defaultProps = {
  pricing: {},
  user: {},
};

export default FinancesCard;
