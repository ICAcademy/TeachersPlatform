import React from 'react';
import PropTypes from 'prop-types';

// components
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { TextField } from '@mui/material';

// styles
import styles from './TeacherPhone.module.scss';

const TeacherPhone = ({ operator, setOperator, phone, setPhone, operators }) => {
  const changePhone = (event) => {
    setPhone(event.target.value);
  };

  const changeOperator = (event) => {
    setOperator(event.target.value);
  };
  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <span className={styles.header}>Phone</span>
      </div>
      <Box className={styles.box}>
        <FormControl>
          <InputLabel id='demo-simple-select-label'>Operator</InputLabel>
          <Select
            className={styles.select}
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={operator}
            label='operator'
            onChange={changeOperator}
          >
            {operators.map((operator) => {
              return (
                <MenuItem key={operator} value={operator}>
                  {operator}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <TextField
          className={styles.input}
          type='number'
          value={phone}
          onChange={changePhone}
          focused={operator !== ''}
          disabled={operator === ''}
        />
      </Box>
    </div>
  );
};

TeacherPhone.propTypes = {
  operator: PropTypes.string,
  setOperator: PropTypes.func,
  phone: PropTypes.number,
  setPhone: PropTypes.func,
  operators: PropTypes.array,
};

export default TeacherPhone;
