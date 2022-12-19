import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

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
    <Link className={styles.unitDesc} to={`/app/materials/${props.item.url}`}>
      <div className={styles.unitInfo}>
        <FirstLetterIcon firstLetter={props.item.unit[0]} />
        <div className={styles.dFlex}>
          <div className={styles.unitTitle}>{props.item.unit}</div>
          {lessonsCount}
        </div>
      </div>
      <FontAwesomeIcon icon={faArrowRight} />
    </Link>
  );
};

//propTypes
UnitDesc.propTypes = {
  item: PropTypes.object,
  numberOfLessons: PropTypes.number,
};
UnitDesc.defaultProps = {
  item: {},
  numberOfLessons: 0,
};

export default UnitDesc;
