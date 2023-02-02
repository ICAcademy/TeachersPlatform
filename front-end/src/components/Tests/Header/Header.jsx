import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';

// Functions
import { isRussianSymbols } from 'hooks/useInput';

// Styles
import styles from './Header.module.scss';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const Header = ({ levels, level, setLevel, unit, setUnit, topic, setTopic, postInfo }) => {
  const handleChangeInput = (setFunc, event) => {
    setFunc(event.target.value);
  };

  const style = {
    width: '100%',
    fontWeight: 400,
    fontSize: '20px',
    letterSpacing: 0,
    borderColor: '#797979',
    color: '#797979',
    borderRadius: '0.25rem',
  };

  return (
    <div className={styles.header}>
      <div className={styles.inputsContainer}>
        <div className={styles.itemContainer}>
          <div className={styles.inputContainer}>
            <FormControl
              size='small'
              fullWidth
              margin='normal'
              variant='outlined'
              error={postInfo && level === ''}
            >
              <InputLabel id='levels-select-label'>Level</InputLabel>
              <Select
                sx={{ marginBottom: '10px' }}
                labelId='levels-select-label'
                id='levels-select'
                autoFocus={level === '' && postInfo}
                value={level}
                onChange={(event) => handleChangeInput(setLevel, event)}
                label='Level'
              >
                {levels.map((level) => (
                  <MenuItem key={level} value={level}>
                    {level}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
        <div className={styles.itemContainer}>
          <div className={styles.inputContainer}>
            <TextField
              sx={style}
              variant='outlined'
              size='small'
              label='Unit'
              autoFocus={unit === '' && postInfo}
              error={postInfo && unit === ''}
              helperText={postInfo && unit === '' ? 'Empty field!' : ' '}
              value={unit}
              onChange={(event) => {
                if (!isRussianSymbols(event.target.value)) {
                  handleChangeInput(setUnit, event);
                }
              }}
            />
          </div>
        </div>
        <div>
          <div className={styles.inputContainer}>
            <TextField
              sx={style}
              variant='outlined'
              size='small'
              label='Topic'
              autoFocus={topic === '' && postInfo}
              error={postInfo && topic === ''}
              helperText={postInfo && topic === '' ? 'Empty field!' : ' '}
              value={topic}
              onChange={(event) => {
                if (!isRussianSymbols(event.target.value)) {
                  handleChangeInput(setTopic, event);
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

Header.propTypes = {
  test: PropTypes.object,
  levels: PropTypes.array,
  level: PropTypes.string,
  setLevel: PropTypes.func,
  unit: PropTypes.string,
  setUnit: PropTypes.func,
  topic: PropTypes.string,
  setTopic: PropTypes.func,
  postInfo: PropTypes.bool,
};
