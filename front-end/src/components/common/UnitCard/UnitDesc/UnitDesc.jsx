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
  return (
    <Link className={styles.unitDesc} to={`/materials/${props.item.url}`}>
      <div className={styles.unitInfo}>
        <FirstLetterIcon firstLetter={props.item.unit[0]} />
        <div className={styles.dFlex}>
          <div className={styles.unitTitle}>{props.item.unit}</div>
          <div className={styles.lessonsCount}>
            <span>Lessons:</span>
            <span>{props.item.numberOfLessons}</span>
          </div>
        </div>
      </div>
      <FontAwesomeIcon icon={faArrowRight} />
    </Link>
  );
};

//propTypes
UnitDesc.propTypes = {
  item: PropTypes.object,
};
UnitDesc.defaultProps = {
  item: {},
};

export default UnitDesc;
