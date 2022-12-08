import React from 'react';
import PropTypes from 'prop-types';

//Styles
import styles from './UnitCard.module.scss';

//Components
import UnitImg from './UnitImg/UnitImg';
import UnitDesc from './UnitDesc/UnitDesc';
import { Link } from 'react-router-dom';

const UnitCard = (props) => {
  return (
    <Link className={styles.unitItem} to={`${props.url}`}>
      <div className={styles.unitWrapper}>
        <div className={styles.unitBody}>
          <UnitImg image={props.image} unit={props.unit} />
          <UnitDesc unit={props.unit} numberOfLessons={props.numberOfLessons} />
        </div>
      </div>
    </Link>
  );
};

//propTypes
UnitCard.propTypes = {
  numberOfLessons: PropTypes.number,
  image: PropTypes.string,
  unit: PropTypes.string,
  url: PropTypes.string,
};
UnitCard.defaultProps = {
  image: '',
  unit: '',
  url: '',
};

export default UnitCard;
