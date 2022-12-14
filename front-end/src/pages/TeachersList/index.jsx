/* eslint-disable react/jsx-indent */
/* eslint-disable indent */
import React, { useEffect, useState } from 'react';

// Service
import { teacherService } from 'services/teacherService';

// Components
import Card from 'components/TeachersList/Card';

// Styles
import styles from './TeachersList.module.scss';

const TeachersList = () => {
  const [teachers, setTeachers] = useState([]);
  console.log(teachers);

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
      <div className={styles.cardWrap}>
        {teachers.length
          ? teachers.map((teacher) => (
              <Card
                key={teacher?._id}
                link={`/app/teachers/${teacher?._id}/overview`}
                fullName={teacher?.fullName}
                activity='English teacher'
              />
            ))
          : ''}
      </div>
    </div>
  );
};

export default TeachersList;
