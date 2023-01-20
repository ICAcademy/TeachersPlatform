import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// Services
import { getTeacherById } from 'services/teacherService';

// Components
import SelectedTeacher from 'components/Teacher';

const Teacher = () => {
  const [teacher, setTeacher] = useState({});
  const { id } = useParams();

  const fetchTeacher = async (teacherId) => {
    try {
      const data = await getTeacherById(teacherId);
      if (data) {
        setTeacher(data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchTeacher(id);
  }, [id]);

  return (
    <SelectedTeacher
      id={teacher?._id}
      fullName={teacher?.fullName}
      activity='English teacher'
      overview='Overview ;)'
      courses='Courses ;)'
      image={teacher?.url}
    />
  );
};

export default Teacher;
