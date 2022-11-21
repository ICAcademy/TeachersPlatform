import React from 'react';
import PropTypes from 'prop-types';

//Styles
import styles from './UnitImg.module.scss';

const UnitImg = (props) => {
  return (
    <div className={styles.unitImg}>
      {props.image && <img src={`http://localhost:5000/uploads/${props.image}`} />}
      {!props.image && <p className={styles.noImage}>{props.unit}</p>}
    </div>
  );
};

//propTypes
UnitImg.propTypes = {
  image: PropTypes.string,
};
UnitImg.defaultProps = {
  image: '',
};
UnitImg.propTypes = {
  unit: PropTypes.string,
};
UnitImg.defaultProps = {
  init: '',
};

export default UnitImg;
