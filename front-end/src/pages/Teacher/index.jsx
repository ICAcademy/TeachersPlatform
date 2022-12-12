import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// Services
import { teacherService } from 'services/teacherService';

// Components
import Teacher1 from 'components/Teacher';

const Teacher = () => {
  const [teacher, setTeacher] = useState({});
  const { id } = useParams();

  const fetchTeacher = async (teacherId) => {
    try {
      const data = await teacherService.getTeacherById(teacherId);
      console.log(data);
      if (data) {
        setTeacher(data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchTeacher(id);
  }, []);

  return (
    <Teacher1
      id={teacher?._id}
      fullName={teacher?.fullName}
      activity='English teacher'
      overview='Overview ;)'
      courses='Courses ;)'
    />
  );
};

export default Teacher;
