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
          <UnitDesc item={props.item} />
        </div>
      </div>
    </div>
  );
};

//propTypes
UnitCard.propTypes = {
  item: PropTypes.object,
};
UnitCard.defaultProps = {
  item: {},
};

export default UnitCard;
