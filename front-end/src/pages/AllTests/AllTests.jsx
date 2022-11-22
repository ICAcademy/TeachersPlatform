import axios from 'axios';
import React, { useEffect, useState } from 'react';

import styles from './AllTests.module.scss';

const AllTests = () => {
  const [questions, setQuestions] = useState([]);

  const getAllAdverts = async () => {
    try {
      const questions = await axios.get('http://localhost:5000/api/questions/');
      const res = questions.data;
      setQuestions(res);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getAllAdverts();
  }, []);

  console.log(questions);

  return (
    <div className={styles.content}>
      <div>All Tests</div>
    </div>
  );
};

export default AllTests;
