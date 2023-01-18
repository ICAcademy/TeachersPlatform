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
    } catch (error) {
      return error;
    }
  };

  console.log(teacher);

  useEffect(() => {
    fetchTeacher(id);
  }, [id]);

  return <SelectedTeacher teacher={teacher} />;
};

export default Teacher;
