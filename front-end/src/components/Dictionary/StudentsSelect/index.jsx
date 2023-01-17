import React, { useState } from 'react';
import PropTypes from 'prop-types';

// MUI library
import { MenuItem, InputLabel, FormControl, Select } from '@mui/material';

const StudentsSelect = ({ handleStudentId, studentId, students, style, selectError }) => {
  const [isClicked, setIsClicked] = useState(false);
  const hasError = isClicked && selectError;

  return (
    <div>
      <FormControl sx={style} size='small' error={hasError} disabled={students === []}>
        <InputLabel id='demo-select-small'>Student</InputLabel>
        <Select
          labelId='demo-select-small'
          id='demo-select-small'
          value={studentId}
          label='Student'
          onChange={(e) => handleStudentId(e.target.value)}
          onClick={() => {
            selectError ? setIsClicked(true) : setIsClicked(false);
          }}
        >
          {students.map((item) => (
            <MenuItem key={item.studentID._id} value={item.studentID._id}>
              {item.studentID.fullName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

StudentsSelect.propTypes = {
  style: PropTypes.shape(),
  students: PropTypes.array,
  studentId: PropTypes.string,
  selectError: PropTypes.bool,
  handleStudentId: PropTypes.func,
};

StudentsSelect.defaultProps = {
  style: {},
  students: [],
  studentId: '',
  selectError: false,
  handleStudentId: () => {},
};

export default StudentsSelect;
