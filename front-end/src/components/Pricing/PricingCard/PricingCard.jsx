import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';

//Services
import { sendPaymentData } from 'services/paymentService';

//Styles
import styles from './PricingCard.module.scss';
import Button from '@mui/material/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const PricingCard = ({ pricing, user, teacher }) => {
  const { name, price, currency, description } = pricing;

  const [payment, setPayment] = useState({
    data: '',
    signature: '',
  });

  const dae = JSON.stringify({
    fullName: user.fullName,
    userId: user.userId,
    teacher: teacher,
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
  }, [currency, price, dae]);

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
        <div className={styles.teacherRow}>
          Teacher:
          <span className={styles.bage}>{teacher}</span>
        </div>
        <p>{description}</p>
        <form method='POST' action='https://www.liqpay.ua/api/3/checkout' acceptCharset='utf-8'>
          <input type='hidden' name='data' value={payment.data} />
          <input type='hidden' name='signature' value={payment.signature} />
          <Button
            disabled={teacher === ''}
            className={styles.deleteBtn}
            variant='contained'
            type='submit'
          >
            Pay
          </Button>
        </form>
      </div>
    </div>
  );
};

//propTypes
PricingCard.propTypes = {
  pricing: PropTypes.object,
  user: PropTypes.object,
  teacher: PropTypes.string,
};
PricingCard.defaultProps = {
  pricing: {},
  user: {},
  teacher: '',
};

export default PricingCard;
