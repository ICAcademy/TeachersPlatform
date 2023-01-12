import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Box, Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

import LessonsHeader from 'components/Lessons/LessonsHeader/LessonsHeader';
import TopicsBody from 'components/questions/TopicsBody/TopicsBody';
import Quiz from 'components/questions/Quiz/Quiz';

import { getTopicDataByUrl } from 'services/questionService';

import styles from './Topics.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsLeftRightToLine } from '@fortawesome/free-solid-svg-icons';
import { CurrentUserContext } from 'context/AppProvider';
import { getTeachersSubscription } from 'services/subscriptionService';
import { starNewLesson } from 'services/lessonService';

const Topics = () => {
  const [unitData, setUnitData] = useState([]);
  const [topicsData, setTopicsData] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState({});
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [students, setStudents] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const params = useParams();
  const navigate = useNavigate();

  const {
    currentUser: { roleId },
  } = useContext(CurrentUserContext);

  const canStartLesson = Object.keys(selectedTopic).length && selectedStudentId;

  const studentSelectHandler = (e) => setSelectedStudentId(e.target.value);

  const fetchTopicsData = async (url) => {
    try {
      const { unitInfo, topicsInfo } = await getTopicDataByUrl(url);
      setUnitData(unitInfo);
      setTopicsData(topicsInfo);
    } catch (error) {
      console.log(error);
    }
  };

  const selectTopic = (id) => {
    const topic = topicsData.find((item) => item._id === id);
    setSelectedTopic(topic);
  };

  const fullscreenHandler = () => {
    setIsFullscreen((prev) => !prev);
  };

  const fetchStudents = async (id) => {
    try {
      const students = await getTeachersSubscription(id);
      setStudents(students);
    } catch (error) {
      console.log(error);
    }
  };

  const startLessonHandler = async () => {
    try {
      const body = {
        topic: selectedTopic.topic,
        teacherId: roleId,
        studentId: selectedStudentId,
        questions: selectedTopic.questions,
      };

      const lesson = await starNewLesson(body);
      navigate(`/app/lessons/${lesson._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStudents(roleId);
  }, [roleId]);

  useEffect(() => {
    fetchTopicsData(params.url);
  }, [params.url]);

  const quiz = Object.keys(selectedTopic).length ? (
    <div className={`${styles.lesson__quiz} ${isFullscreen ? styles.quiz__full : ''}`}>
      <Quiz questions={selectedTopic.questions} />
    </div>
  ) : (
    ''
  );

  return (
    <Box className={styles.wrapper}>
      <Box className={`${styles.topics} ${isFullscreen ? styles.topics__shrink : ''}`}>
        {!isFullscreen && <LessonsHeader level={unitData.level} title={unitData.unit} />}
        <TopicsBody topics={topicsData} selectHandler={selectTopic} fullscreen={isFullscreen} />
      </Box>
      <Box className={`${styles.lesson} ${isFullscreen ? styles.lesson__full : ''}`}>
        <Box className={styles.fullScreen} onClick={fullscreenHandler}>
          <FontAwesomeIcon icon={faArrowsLeftRightToLine} />
        </Box>
        <Box className={styles.lesson__form}>
          <FormControl sx={{ maxWidth: '200px' }} fullWidth size='small'>
            <InputLabel id='select student'>Select student</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              label='select student'
              value={selectedStudentId}
              onChange={studentSelectHandler}
            >
              {students.map((student) => (
                <MenuItem key={student._id} value={student.studentID._id}>
                  {student.studentID.fullName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button variant='contained' onClick={startLessonHandler} disabled={!canStartLesson}>
            Start lesson
          </Button>
        </Box>
        {quiz}
      </Box>
    </Box>
  );
};

export default Topics;
