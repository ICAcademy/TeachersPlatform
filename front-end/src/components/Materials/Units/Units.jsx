import React from 'react';
import PropTypes from 'prop-types';

//Styles
import styles from './Units.module.scss';

//Components
import UnitCard from 'components/common/UnitCard/UnitCard';

const Units = ({ materials }) => {
  return (
    <div className={styles.container}>
      {materials.length === 0 ? (
        <div className={styles.notFound}>Not Found Materials</div>
      ) : (
        <div className={styles.units}>
          {materials.map((item) => (
            <UnitCard
              key={item._id}
              numberOfLessons={item.numberOfLessons}
              unit={item.unit}
              image={item.image}
              url={item.url}
              editLink={`/app/materials/edit/${item.url}`}
              type='materials'
            />
          ))}
        </div>
      )}
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
