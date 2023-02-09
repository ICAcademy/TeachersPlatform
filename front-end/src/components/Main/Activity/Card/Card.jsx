import React from 'react';
import PropTypes from 'prop-types';

// components
import Explanation from 'components/Main/common/Explanation/Explanation';

// styles
import styles from './Card.module.scss';

const Card = ({ data, topic, info }) => {
  const dataArr = data.split(' ');
  return (
    <div className={styles.container}>
      <div className={styles.dataContainer}>
        <span className={styles.data}>{dataArr[0]}</span>
        <span className={styles.data}>{dataArr[1]}</span>
      </div>
      <div className={styles.workContainer}>
        <div className={styles.titleContainer}>
          <h4 className={styles.title}>{topic}</h4>
        </div>
        <div className={styles.explanationContainer}>
          <Explanation explanation={info} />
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  data: PropTypes.string,
  topic: PropTypes.string,
  info: PropTypes.string,
};

export default Card;
