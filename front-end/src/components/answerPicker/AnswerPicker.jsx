import React, { useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import PropTypes from 'prop-types';

const AnswerPicker = ({ id, options }) => {
  const [answer, setAnswer] = useState('');

  const handleChange = (e) => {
    setAnswer(e.target.value);
  };

  return (
    <FormControl sx={{ minWidth: '120px' }} size='small'>
      <InputLabel id={id}>Answer</InputLabel>
      <Select label='Answer' labelId={id} value={answer} onChange={handleChange}>
        {options.map((option, i) => (
          <MenuItem key={i} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

AnswerPicker.propTypes = {
  id: PropTypes.string,
  options: PropTypes.array,
};

export default AnswerPicker;
