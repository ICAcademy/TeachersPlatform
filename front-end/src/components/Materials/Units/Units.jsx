import React from 'react';
import PropTypes from 'prop-types';

//Styles
import styles from './Units.module.scss';

//Components
import UnitCard from 'components/common/UnitCard/UnitCard';

const Units = (props) => {
  return (
    <div className={styles.units}>
      {props.materials.map((item) => (
        <UnitCard key={item._id} item={item} id={item._id} url={item.url} />
      ))}
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
