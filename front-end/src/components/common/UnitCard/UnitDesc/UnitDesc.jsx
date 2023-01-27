import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

//Styles
import styles from './UnitDesc.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

//Components
import FirstLetterIcon from 'components/common/FirstLetterIcon/FirstLetterIcon';

const UnitDesc = ({ unit, level, numberOfLessons, url }) => {
  const lessonsCount = numberOfLessons ? (
    <div className={styles.lessonsCount}>
      <span>Lessons:</span>
      <span>{numberOfLessons}</span>
    </div>
  ) : (
    ''
  );

  return (
    <Link className={styles.unitDesc} to={url} state={{ unit, level }}>
      <div className={styles.unitInfo}>
        <FirstLetterIcon firstLetter={unit[0]} />
        <div className={styles.dFlex}>
          <div className={styles.unitTitle}>{unit}</div>
          {lessonsCount}
        </div>
      </div>
      <FontAwesomeIcon icon={faArrowRight} />
    </Link>
  );
};

//propTypes
UnitDesc.propTypes = {
  url: PropTypes.string,
  unit: PropTypes.string,
  level: PropTypes.string,
  numberOfLessons: PropTypes.number,
};

UnitDesc.defaultProps = {
  url: '',
  unit: '',
  level: '',
  numberOfLessons: 0,
};

export default UnitDesc;
