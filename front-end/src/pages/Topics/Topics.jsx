import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsLeftRightToLine } from '@fortawesome/free-solid-svg-icons';

import LessonsHeader from 'components/Lessons/LessonsHeader/LessonsHeader';
import TopicsBody from 'components/questions/TopicsBody/TopicsBody';
import Quiz from 'components/questions/Quiz/Quiz';

import { getTopicDataByUrl } from 'services/questionService';

import styles from './Topics.module.scss';

const Topics = () => {
  const [unitData, setUnitData] = useState([]);
  const [topicsData, setTopicsData] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState({});
  const [isFullscreen, setIsFullscreen] = useState(false);

  const params = useParams();

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

  const quiz = Object.keys(selectedTopic).length ? (
    <div className={`${styles.quiz} ${isFullscreen ? styles.quiz__full : ''}`}>
      <div className={styles.fullScreen} onClick={fullscreenHandler}>
        <FontAwesomeIcon icon={faArrowsLeftRightToLine} />
      </div>
      <Quiz questions={selectedTopic.questions} />
    </div>
  ) : (
    ''
  );

  useEffect(() => {
    fetchTopicsData(params.url);
  }, [params.url]);

  return (
    <div className={styles.wrapper}>
      <div className={`${styles.topics} ${isFullscreen ? styles.topics__shrink : ''}`}>
        {!isFullscreen && <LessonsHeader level={unitData.level} title={unitData.unit} />}
        <TopicsBody topics={topicsData} selectHandler={selectTopic} fullscreen={isFullscreen} />
      </div>
      {quiz}
    </div>
  );
};

export default Topics;
