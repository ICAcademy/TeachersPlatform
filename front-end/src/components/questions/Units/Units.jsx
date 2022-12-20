import React from 'react';
import PropTypes from 'prop-types';

import UnitCard from 'components/common/UnitCard/UnitCard';

import styles from './Units.module.scss';

const Units = ({ units }) => {
  return (
    <div className={styles.container}>
      {units.length === 0 ? (
        <div className={styles.notFoundData}>Not Found Units</div>
      ) : (
        <div className={styles.units}>
          {units.map((unit, i) => {
            const url = unit.unit.toLowerCase().match(/\w|\s/g).join('').replaceAll(' ', '-');
            return <UnitCard key={i} item={unit} image={url} url={url} />;
          })}
        </div>
      )}
    </div>
  );
};

Units.propTypes = {
  units: PropTypes.array,
};

export default Units;
