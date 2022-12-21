/* eslint-disable react/jsx-indent */
/* eslint-disable indent */
import React, { useEffect, useState } from 'react';

// Service
import { teacherService } from 'services/teacherService';

// Components
import Card from 'components/TeachersList/Card';
import Loader from 'components/common/Loader/Loader';

// Styles
import styles from './TeachersList.module.scss';

const TeachersList = () => {
  const [teachers, setTeachers] = useState([]);

  const fetchTeachers = async () => {
    try {
      const data = await teacherService.getAllTeacher();
      setTeachers(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  return (
    <div className={styles.wrapper}>
      <h1>Teachers</h1>
      {teachers.length ? (
        <div className={styles.cardWrap}>
          {teachers.length
            ? teachers.map((teacher) => (
                <Card
                  key={teacher?._id}
                  link={teacher?._id}
                  fullName={teacher?.fullName}
                  activity='English teacher'
                />
              ))
            : ''}
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default TeachersList;
