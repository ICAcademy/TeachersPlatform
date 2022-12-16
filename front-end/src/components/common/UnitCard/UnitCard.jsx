import React from 'react';
import PropTypes from 'prop-types';

//Styles
import styles from './UnitCard.module.scss';

//Components
import UnitImg from './UnitImg/UnitImg';
import UnitDesc from './UnitDesc/UnitDesc';

const UnitCard = (props) => {
  return (
    <div className={styles.unitItem}>
      <div className={styles.unitWrapper}>
        <div className={styles.unitBody}>
          <UnitImg item={props.item} />
          <UnitDesc item={props.item} numberOfLessons={props.numberOfLessons} />
        </div>
      </div>
    </div>
  );
};

//propTypes
UnitCard.propTypes = {
  item: PropTypes.object,
  numberOfLessons: PropTypes.number,
};
UnitCard.defaultProps = {
  item: {},
  numberOfLessons: 0,
};

export default UnitCard;
