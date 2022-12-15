import React from 'react';
import PropTypes from 'prop-types';

// components
import { Input } from '@mui/material';

// styles
import styles from './ItemSetting.module.scss';

const ItemSetting = ({ itemName, itemValue, handleItem }) => {
  const handleChange = (event) => {
    handleItem(event.target.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.nameContainer}>
        <p className={styles.name}>{itemName}</p>
      </div>
      <div className={styles.inputContainer}>
        <Input value={itemValue} onChange={handleChange} className={styles.input} />
      </div>
    </div>
  );
};

ItemSetting.propTypes = {
  itemName: PropTypes.string,
  itemValue: PropTypes.string,
  handleItem: PropTypes.func,
};

export default ItemSetting;
