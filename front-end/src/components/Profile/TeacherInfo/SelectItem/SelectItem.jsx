import React from 'react';
import PropTypes from 'prop-types';

// components
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

// styles
import styles from './SelectItem.module.scss';

const SelectItem = ({ nameSelect, value, setValue, selectArray }) => {
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <div className={styles.container}>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id='demo-simple-select-label'>{nameSelect}</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={value}
            label='language'
            size='small'
            onChange={handleChange}
          >
            {selectArray.map((language) => {
              return (
                <MenuItem key={language} value={language}>
                  {language}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
    </div>
  );
};

SelectItem.propTypes = {
  nameSelect: PropTypes.string,
  value: PropTypes.string,
  setValue: PropTypes.func,
  selectArray: PropTypes.array,
};

export default SelectItem;
