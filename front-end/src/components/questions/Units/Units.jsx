import React from 'react';
import PropTypes from 'prop-types';

import UnitCard from 'components/common/UnitCard/UnitCard';

import styles from './Units.module.scss';

const Units = ({ units }) => {
  return (
    <div className={styles.units}>
      {units.map((unit, i) => {
        const url = unit.toLowerCase().match(/\w|\s/g).join('').replaceAll(' ', '-');
        return <UnitCard key={i} unit={unit} image={url} url={url} />;
      })}
    </div>
  );
};

Units.propTypes = {
  units: PropTypes.array,
};

export default Units;
