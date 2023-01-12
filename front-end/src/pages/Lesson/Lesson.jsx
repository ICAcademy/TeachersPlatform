import React from 'react';
import { useParams } from 'react-router';

const Lesson = () => {
  const { id } = useParams();

  return <div>{`Lesson ${id}`}</div>;
};

export default Lesson;
