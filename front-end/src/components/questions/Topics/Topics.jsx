/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';

import LessonsHeader from 'components/Lessons/LessonsHeader/LessonsHeader';
import TopicsBody from '../TopicsBody/TopicsBody';

import { getTopicDataByUrl } from 'services/questions';

import styles from './Topics.module.scss';

const Topics = () => {
  const [unitData, setUnitData] = useState([]);
  const [topicsData, setTopicsData] = useState([]);

  const { url } = useParams();

  const fetchTopicsData = async (url) => {
    try {
      const { unitInfo, topicsInfo } = await getTopicDataByUrl(url);
      setUnitData(unitInfo);
      setTopicsData(topicsInfo);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  useEffect(() => {
    fetchTopicsData(url);
  }, [url]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.topics}>
        <LessonsHeader level={unitData.level} title={unitData.unit} />
        <TopicsBody topics={topicsData} />
      </div>
    </div>
  );
};

export default Topics;
