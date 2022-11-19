import React from 'react';
import PropTypes from 'prop-types';

//Styles
import styles from './Unit.module.scss';

//Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Unit = (props) => {
  return (
    <div className={`${styles.unitItem}`}>
      <div className={styles.unitBody}>
        <div className={styles.dFlex}>
          <div className={styles.dFlex}>
            <div className={styles.unitIcon}>{props.unit[0]}</div>
            <div className={styles.dFlex}>{props.unit}</div>
          </div>
          <FontAwesomeIcon icon={faArrowRight} />
        </div>
      </div>
    </div>
  );
};

//propTypes
Unit.propTypes = {
  unit: PropTypes.string,
};
Unit.defaultProps = {
  unit: '',
};

export default Unit;
