import React, { Fragment, useContext } from 'react';

import Day from '../Day/Day';

import { CalendarContext } from 'context/CalendarProvider';

import styles from './Month.module.scss';

const Month = () => {
  const { monthMatrix } = useContext(CalendarContext);

  return (
    <div className={styles.month}>
      {monthMatrix.map((week, weekIdx) => (
        <Fragment key={weekIdx}>
          {week.map((day, i) => (
            <Day key={i} day={day} rowIdx={weekIdx} />
          ))}
        </Fragment>
      ))}
    </div>
  );
};

export default Month;
