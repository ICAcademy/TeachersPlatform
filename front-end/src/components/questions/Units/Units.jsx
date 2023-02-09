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
          {units.map((item, i) => {
            const url = item.unit
              .toLowerCase()
              .match(/[a-zA-Z]|\-|\s/g)
              .join('')
              .replaceAll(' ', '-');

            return (
              <UnitCard
                key={i}
                unit={item.unit}
                level={item.level}
                image={item.image}
                url={url}
                numberOfLessons={item.numberOfLessons}
                editLink={`/app/questions/edit/${url}`}
                type='questions'
              />
            );
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
