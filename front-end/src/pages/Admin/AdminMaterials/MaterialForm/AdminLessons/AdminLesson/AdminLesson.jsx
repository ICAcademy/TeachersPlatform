import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SunEditor, { buttonList } from 'suneditor-react';

// Functions
import { isPigSymbol } from 'hooks/useInput';

//Styles
import styles from './AdminLesson.module.scss';
import 'suneditor/dist/css/suneditor.min.css';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

const AdminLesson = ({ lesson, onSave, onDelete, index }) => {
  const [lessonTitle, setLessonTitle] = useState(lesson.title);
  const [editorContent, setEditorContent] = useState(lesson.layout);
  const [expanded, setExpanded] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLessonTitle(lessonTitle);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [lessonTitle]);

  const lessonData = {
    ...lesson,
    title: lessonTitle,
    layout: editorContent,
  };

  const changeTitleHandler = (event) => {
    if (!isPigSymbol(event.target.value)) {
      setLessonTitle(event.target.value);
    }
  };

  const changeExpandedHandler = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : '');
  };

  const editorChangeHandler = (content) => {
    setEditorContent(content);
  };

  const saveLessonHandler = () => {
    if (!lessonTitle.length) {
      setError(true);
      return;
    }
    onSave(index, lessonData);
  };

  const deleteLessonHandler = () => {
    onDelete(index);
  };

  return (
    <div className={styles.accordionContent}>
      <Accordion
        className={styles.lessonItem}
        expanded={expanded === `item_${index}`}
        onChange={changeExpandedHandler(`item_${index}`)}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`item_${index}-content`}
          id={`item_${index}-header`}
        >
          <div className={styles.lessonNumber}>{index + 1}</div>
          <Typography>{lessonTitle}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormControl fullWidth className={styles.inputWrapper}>
            <TextField
              id={`item_${index}-input`}
              size='small'
              label='Lesson title'
              variant='outlined'
              value={lessonTitle}
              onChange={changeTitleHandler}
              margin='normal'
              error={error}
              helperText={error ? 'Please fill this field' : ''}
            />
          </FormControl>
          <SunEditor
            defaultValue={lesson.layout}
            setOptions={{
              height: 200,
              buttonList: buttonList.complex,
            }}
            onChange={editorChangeHandler}
          />
          <Button className={styles.lessonSubmit} variant='contained' onClick={saveLessonHandler}>
            Save lesson
          </Button>
        </AccordionDetails>
      </Accordion>
      <DeleteIcon className={styles.deleteLesson} onClick={deleteLessonHandler} />
    </div>
  );
};

//propTypes
AdminLesson.propTypes = {
  lesson: PropTypes.object,
  onChange: PropTypes.func,
  expanded: PropTypes.string,
  index: PropTypes.number,
  onSave: PropTypes.func,
  onDelete: PropTypes.func,
  newLesson: PropTypes.object,
};

AdminLesson.defaultProps = {
  lesson: {},
  expanded: '',
  index: 0,
  newLesson: {},
};

export default AdminLesson;
