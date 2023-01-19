import React, { useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import PropTypes from 'prop-types';

import { socket } from 'services/socketService';

const AnswerPicker = ({ id, roomId, options, selected, isLesson }) => {
  const [answer, setAnswer] = useState('');

  const handleChange = (e) => {
    setAnswer(e.target.value);
  };

  const selectAnswerHandler = (e) => {
    socket.emit('lesson:select-answer', roomId, id, e.target.value);
  };

  const answersSelect = isLesson ? (
    <Select label='Answer' labelId={id} value={selected} onChange={selectAnswerHandler}>
      {options.map((option, i) => (
        <MenuItem key={i} value={option}>
          {option}
        </MenuItem>
      ))}
    </Select>
  ) : (
    <Select label='Answer' labelId={id} value={answer} onChange={handleChange}>
      {options.map((option, i) => (
        <MenuItem key={i} value={option}>
          {option}
        </MenuItem>
      ))}
    </Select>
  );

  return (
    <FormControl sx={{ minWidth: '120px' }} size='small'>
      <InputLabel id={id}>Answer</InputLabel>
      {answersSelect}
    </FormControl>
  );
};

AnswerPicker.propTypes = {
  id: PropTypes.string,
  roomId: PropTypes.string,
  options: PropTypes.array,
  selected: PropTypes.string,
  isLesson: PropTypes.bool,
};

AnswerPicker.defaultProps = {
  id: '',
  roomId: '',
  options: [],
  selected: '',
  isLesson: false,
};

export default AnswerPicker;
