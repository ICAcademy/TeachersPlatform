import React, { useContext } from 'react';

// context
import { CurrentUserContext } from 'context/AppProvider';

const TeacherInfo = () => {
  const { currentUser } = useContext(CurrentUserContext);
  console.log('currentUser', currentUser);
  return <div>Teacher Info</div>;
};

export default TeacherInfo;
