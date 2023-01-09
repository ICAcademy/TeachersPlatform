import React from 'react';
import PropTypes from 'prop-types';

// Styles
import styles from './TeacherSelect.module.scss';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';

const TeacherSelect = ({ chooseTeacher, teacher, teachers }) => {
  const handleChange = (event) => {
    chooseTeacher(event.target.value);
  };

  return (
    <div className={styles.teacherSelector}>
      <FormControl sx={{ m: 1, minWidth: 200 }}>
        <InputLabel id='teacher-select-label'>Teacher</InputLabel>
        <Select
          labelId='teacher-select-label'
          id='teacher-select'
          value={teacher}
          label='Teacher'
          onChange={handleChange}
        >
          {teachers.map((teacher) => (
            <MenuItem key={teacher.teacherID._id} value={teacher.teacherID.fullName}>
              {teacher.teacherID.fullName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <h3 className={teacher === '' ? styles.noValue : ''}>
        Please choose the teacher you want to pay
      </h3>
    </div>
  );
};

//propTypes
TeacherSelect.propTypes = {
  teacher: PropTypes.string,
  teachers: PropTypes.array,
  chooseTeacher: PropTypes.func,
};
TeacherSelect.defaultProps = {
  teacher: '',
  teachers: [],
};

export default TeacherSelect;
