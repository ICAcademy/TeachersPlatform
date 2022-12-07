import React from 'react';
import PropTypes from 'prop-types';

//Styles
import styles from './UnitDesc.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

//Components
import FirstLetterIcon from 'components/common/FirstLetterIcon/FirstLetterIcon';

const UnitDesc = (props) => {
  const lessonsCount = props.numberOfLessons ? (
    <div className={styles.lessonsCount}>
      <span>Lessons:</span>
      <span>{props.numberOfLessons}</span>
    </div>
  ) : (
    ''
  );

  return (
    <div className={styles.unitDesc}>
      <div className={styles.unitInfo}>
        <FirstLetterIcon firstLetter={props.unit[0]} />
        <div className={styles.dFlex}>
          <div className={styles.unitTitle}>{props.unit}</div>
          {lessonsCount}
        </div>
      </div>
      <FontAwesomeIcon icon={faArrowRight} />
    </div>
  );
};

//propTypes
UnitDesc.propTypes = {
  unit: PropTypes.string,
  numberOfLessons: PropTypes.number,
};
UnitDesc.defaultProps = {
  unit: '',
  numberOfLessons: 0,
};

export default UnitDesc;
