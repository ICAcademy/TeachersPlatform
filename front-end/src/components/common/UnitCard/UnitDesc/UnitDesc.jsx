import React from 'react';
import PropTypes from 'prop-types';

//Styles
import styles from './UnitDesc.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const UnitDesc = (props) => {
  return (
    <div className={styles.unitDesc}>
      <div className={styles.unitName}>
        <div className={styles.unitIcon}>{props.unit[0]}</div>
        <div className={styles.dFlex}>{props.unit}</div>
      </div>
      <FontAwesomeIcon icon={faArrowRight} />
    </div>
  );
};

//propTypes
UnitDesc.propTypes = {
  unit: PropTypes.string,
};
UnitDesc.defaultProps = {
  unit: '',
};

export default UnitDesc;
