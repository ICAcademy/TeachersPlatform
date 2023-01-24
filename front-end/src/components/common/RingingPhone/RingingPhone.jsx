import React from 'react';
import PropTypes from 'prop-types';

//Assets
import phone from 'assets/images/iphone.png';

// Styles
import styles from './RingingPhone.module.scss';

const RingingPhone = ({ active, onApprove, student }) => {
  const callApproveHandler = () => {
    onApprove(true);
  };

  return (
    <div className={styles.ringingPhone}>
      <img src={phone} />
      <div className={styles.callAnimation}>
        <img src={student?.url} alt='' width='135' />
        <div className={styles.underCallInfo}>{`${student?.fullName} is calling...`}</div>
      </div>
      <div className={styles.phoneBtns}>
        <div
          className={active ? `${styles.phoneBtn} ${styles.active}` : styles.phoneBtn}
          onClick={callApproveHandler}
        >
          <svg height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'>
            <path d='M0 0h24v24H0z' fill='none' />
            <path d='M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z' />
          </svg>
        </div>
        <div className={`${styles.phoneBtn} ${styles.declineCall}`}>
          <svg height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'>
            <path d='M0 0h24v24H0z' fill='none' />
            <path d='M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z' />
          </svg>
        </div>
      </div>
    </div>
  );
};

RingingPhone.propTypes = {
  onApprove: PropTypes.func,
  active: PropTypes.bool,
  student: PropTypes.object,
};

export default RingingPhone;
