import React, { useState } from 'react';
import PropTypes from 'prop-types';

//Styles
import styles from './AdminLessons.module.scss';
import Button from '@mui/material/Button';
import Add from '@mui/icons-material/Add';

//Components
import AdminLesson from './AdminLesson/AdminLesson';

const AdminLessons = ({
  lessons,
  onSaveLesson,
  onDeleteLesson,
  onCreateLesson,
  onSaveMaterial,
  onLoading,
  showSaveBtn,
}) => {
  const [newLesson, setNewLesson] = useState({
    title: '',
    layout: '',
  });

  const createLessonHandler = () => {
    onCreateLesson(newLesson);

    setNewLesson({
      title: '',
      layout: '',
    });
  };

  const saveLessonHandler = (index, lesson) => {
    onSaveLesson(index, {
      title: lesson.title,
      layout: lesson.layout,
    });
    setNewLesson({
      title: '',
      layout: '',
    });
  };

  const saveMaterialHandler = () => {
    onSaveMaterial();
  };

  const deleteLessonHandler = (index) => {
    onDeleteLesson(index);
  };

  return (
    <div className={styles.lessonsWrapper}>
      <div className={styles.row}>
        <h3>Lessons</h3>
        <Button variant='contained' endIcon={<Add />} onClick={createLessonHandler}>
          Create lesson
        </Button>
      </div>
      {lessons.map((lesson, index) => (
        <AdminLesson
          key={Math.random().toString()}
          index={index}
          lesson={lesson}
          onSave={saveLessonHandler}
          onDelete={deleteLessonHandler}
        />
      ))}

      {showSaveBtn && (
        <Button
          className={styles.materialSubmit}
          variant='contained'
          color='success'
          onClick={saveMaterialHandler}
          disabled={onLoading}
        >
          {onLoading ? 'Loading...' : 'Save material'}
        </Button>
      )}
    </div>
  );
};

//propTypes
AdminLessons.propTypes = {
  lessons: PropTypes.array,
  onCreateLesson: PropTypes.func,
  onSaveLesson: PropTypes.func,
  onDeleteLesson: PropTypes.func,
  onSaveMaterial: PropTypes.func,
  onLoading: PropTypes.bool,
  showSaveBtn: PropTypes.bool,
};

AdminLessons.defaultProps = {
  lessons: [],
  onLoading: false,
  showSaveBtn: false,
};

export default AdminLessons;
