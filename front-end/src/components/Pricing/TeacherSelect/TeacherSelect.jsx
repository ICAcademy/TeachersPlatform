import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Services
import { getStudentSubscription } from 'services/subscriptionService';

// Styles
import styles from './TeacherSelect.module.scss';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';

const TeacherSelect = ({ user, chooseTeacher, teacher }) => {
  const [teachers, setTeachers] = useState([]);

  const fetchSubscriptions = async (id) => {
    try {
      const subscriptions = await getStudentSubscription(id);
      setTeachers(subscriptions);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchSubscriptions(user.roleId);
  }, [user]);

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
  user: PropTypes.object,
  teacher: PropTypes.string,
  chooseTeacher: PropTypes.func,
};
TeacherSelect.defaultProps = {
  user: {},
  teacher: '',
};

export default TeacherSelect;
