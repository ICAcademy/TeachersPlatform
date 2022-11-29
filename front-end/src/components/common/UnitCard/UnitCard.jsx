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
    <Link className={styles.unitItem} to={`/materials/${props.url}`}>
      <div className={styles.unitWrapper}>
        <div className={styles.unitBody}>
          <UnitImg image={props.item.image} unit={props.item.unit} />
          <UnitDesc unit={props.item.unit} numberOfLessons={props.item.numberOfLessons} />
        </div>
      </div>
    </Link>
  );
};

//propTypes
UnitCard.propTypes = {
  item: PropTypes.object,
  image: PropTypes.string,
  unit: PropTypes.string,
  id: PropTypes.string,
  url: PropTypes.string,
};
UnitCard.defaultProps = {
  item: {},
  image: '',
  unit: '',
  id: '',
  url: '',
};

export default UnitCard;
