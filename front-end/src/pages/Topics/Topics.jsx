import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';

import LessonsHeader from 'components/Lessons/LessonsHeader/LessonsHeader';
import TopicsBody from 'components/questions/TopicsBody/TopicsBody';
import Quiz from 'components/questions/Quiz/Quiz';

import { getTopicDataByUnitAndLevel } from 'services/questionService';
import { socket } from 'services/socketService';

// Constants
import { TEACHER_ROLE } from 'constants/userRoles';
import { APPROVED } from 'constants/subscriptionStatuses';

import styles from './Topics.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsLeftRightToLine } from '@fortawesome/free-solid-svg-icons';
import { CurrentUserContext } from 'context/AppProvider';
import { getSubscriptionByStatus } from 'services/subscriptionService';

const sx = {
  startLessonBtn: {
    ['@media (max-width: 768px)']: { width: '175px', fontSize: '13px', height: '40px' },
  },
  noTopic: {
    display: 'flex',
    justifyContent: 'center',
    mt: '20%',
    color: '#888',
  },
};

const Topics = () => {
  const [topicsData, setTopicsData] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState({});
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [students, setStudents] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState('');

  const navigate = useNavigate();

  const {
    state: { level, unit },
  } = useLocation();

  const {
    currentUser: { roleId, role },
  } = useContext(CurrentUserContext);

  const canStartLesson = Object.keys(selectedTopic).length && selectedStudentId;

  const studentSelectHandler = (e) => setSelectedStudentId(e.target.value);

  const fetchTopicsData = async (unit, level) => {
    try {
      const topicsInfo = await getTopicDataByUnitAndLevel({ unit, level });
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

  const fetchStudents = async (role, id) => {
    try {
      const students = await getSubscriptionByStatus({ statusName: APPROVED, id });
      setStudents(students);
    } catch (error) {
      console.log(error);
    }
  };

  const startLessonHandler = () => {
    const body = {
      topic: selectedTopic.topic,
      level: level,
      teacherId: roleId,
      studentId: selectedStudentId,
      questions: selectedTopic.questions,
    };

    socket.emit('lesson:add', body);
  };

  useEffect(() => {
    fetchStudents(role, roleId);
  }, [role, roleId]);

  useEffect(() => {
    fetchTopicsData(unit, level);
  }, [level, unit]);

  useEffect(() => {
    socket.on('lesson:added', (lesson) => navigate(`/app/lessons/${lesson._id}`));
  }, [navigate]);

  const quiz = Object.keys(selectedTopic).length ? (
    <Box className={`${styles.lesson__quiz} ${isFullscreen ? styles.quiz__full : ''}`}>
      <Quiz questions={selectedTopic.questions} />
    </Box>
  ) : (
    <Typography variant='h5' sx={sx.noTopic}>{`You don't select topic any topic yet.`}</Typography>
  );

  return (
    <Box className={styles.wrapper}>
      <Box className={`${styles.topics} ${isFullscreen ? styles.topics__shrink : ''}`}>
        {!isFullscreen && <LessonsHeader level={level} title={unit} />}
        <TopicsBody topics={topicsData} selectHandler={selectTopic} fullscreen={isFullscreen} />
      </Box>
      <Box className={`${styles.lesson} ${isFullscreen ? styles.lesson__full : ''}`}>
        <Box className={styles.fullScreen} onClick={fullscreenHandler}>
          <FontAwesomeIcon icon={faArrowsLeftRightToLine} />
        </Box>
        {role === TEACHER_ROLE && (
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
            <Button
              sx={sx.startLessonBtn}
              variant='contained'
              onClick={startLessonHandler}
              disabled={!canStartLesson}
            >
              Start lesson
            </Button>
          </Box>
        )}
        {quiz}
      </Box>
    </Box>
  );
};

export default Topics;
