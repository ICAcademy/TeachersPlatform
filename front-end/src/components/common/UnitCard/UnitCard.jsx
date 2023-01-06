import React from 'react';
import PropTypes from 'prop-types';

//Styles
import styles from './UnitCard.module.scss';

//Components
import UnitImg from './UnitImg/UnitImg';
import UnitDesc from './UnitDesc/UnitDesc';

const UnitCard = ({ image, url, numberOfLessons, unit, editLink }) => {
  return (
    <div className={styles.unitItem}>
      <div className={styles.unitWrapper}>
        <div className={styles.unitBody}>
          <UnitImg editLink={editLink} image={image} unit={unit} url={url} />
          <UnitDesc unit={unit} numberOfLessons={numberOfLessons} url={url} />
        </div>
      </div>
    </div>
  );
};

//propTypes
UnitCard.propTypes = {
  image: PropTypes.string,
  editLink: PropTypes.string,
  url: PropTypes.string,
  unit: PropTypes.string,
  numberOfLessons: PropTypes.number,
};

UnitCard.defaultProps = {
  image: '',
  editLink: '',
  url: '',
  unit: '',
  numberOfLessons: 0,
};

export default UnitCard;
