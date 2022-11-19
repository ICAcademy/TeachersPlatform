import React from 'react';
import PropTypes from 'prop-types';

//Components
import Unit from './Unit/Unit';

//Styles
import styles from './Units.module.scss';

const Units = (props) => {
  return (
    <div className={styles.units}>
      <div className={styles.unitColumn}>
        {props.materials.map((material) => (
          <Unit key={material._id} unit={material.unit} />
        ))}
      </div>
    </div>
  );
};

//propTypes
Units.propTypes = {
  materials: PropTypes.arrayOf(PropTypes.shape({})),
};
Units.defaultProps = {
  materials: [],
};

export default Units;
