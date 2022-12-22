import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

//Styles
import styles from './UnitCard.module.scss';

//Components
import UnitImg from './UnitImg/UnitImg';
import UnitDesc from './UnitDesc/UnitDesc';

const UnitCard = ({ image, url, numberOfLessons, unit }) => {
  return (
    <Link className={styles.unitItem} to={`${url}`}>
      <div className={styles.unitWrapper}>
        <div className={styles.unitBody}>
          <UnitImg image={image} unit={unit} url={url} />
          <UnitDesc unit={unit} numberOfLessons={numberOfLessons} />
        </div>
      </div>
    </Link>
  );
};

//propTypes
UnitCard.propTypes = {
  image: PropTypes.string,
  url: PropTypes.string,
  unit: PropTypes.string,
  numberOfLessons: PropTypes.number,
};

UnitCard.defaultProps = {
  image: '',
  url: '',
  unit: '',
  numberOfLessons: 0,
};

export default UnitCard;
