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
          <UnitImg image={props.item.image} unit={props.item.unit} />
          <UnitDesc unit={props.item.unit} />
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
UnitCard.propTypes = {
  image: PropTypes.string,
};
UnitCard.defaultProps = {
  image: '',
};
UnitCard.propTypes = {
  unit: PropTypes.string,
};
UnitCard.defaultProps = {
  init: '',
};

export default UnitCard;
