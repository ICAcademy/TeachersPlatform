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
        <UnitCard
          key={item._id}
          unit={item.unit}
          image={item.image}
          numberOfLessons={item.numberOfLessons}
          editLink={`/app/materials/edit/${item.url}`}
          url={item.url}
          type='materials'
        />
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
