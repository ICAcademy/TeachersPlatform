/* import { Button, Checkbox, Input } from '@mui/material'; */
import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import axios from 'axios';

// components
import Header from 'components/Tests/Header/Header';
import Question from 'components/Tests/Question/Question';
import { Button } from '@mui/material';

// styles
import styles from './Tests.module.scss';

const Tests = () => {
  const [tests, setTests] = useState({
    level: 'Beginer',
    unit: 'Unit 5',
    topic: 'Present Perfect',
    questions: [],
  });

  const [level, setLevel] = useState('level');
  const [unit, setUnit] = useState('unit');
  const [topic, setTopic] = useState('topic');
  const [questions, setQuestions] = useState([]);

  console.log('level', level);
  console.log('unit', unit);
  console.log('topic', topic);
  console.log('questions', questions);
  console.log('tests', tests);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { id: nanoid(), title: 'title', answers: [{ id: nanoid(), answer: 'answer', right: false }] },
    ]);
  };

  const addAnswer = (id) => {
    const questionsCopy = JSON.parse(JSON.stringify(questions));
    setQuestions(
      questionsCopy.map((question) => {
        if (question.id === id) {
          return {
            ...question,
            answers: [...question.answers, { id: nanoid(), answer: 'answer', right: false }],
          };
        } else {
          return { ...question };
        }
      }),
    );
  };

  const changeTitleForQuestion = (idQuestion, event) => {
    const questionsCopy = JSON.parse(JSON.stringify(questions));
    setQuestions(
      questionsCopy.map((question) => {
        if (question.id === idQuestion) {
          return {
            ...question,
            title: event.target.value,
          };
        } else {
          return { ...question };
        }
      }),
    );
  };

  const changeRightAnswerForQuestion = (idQuestion, idAnswer) => {
    const questionsCopy = JSON.parse(JSON.stringify(questions));
    setQuestions(
      questionsCopy.map((question) => {
        if (question.id === idQuestion) {
          return {
            ...question,
            answers: [
              ...question.answers.map((answer) => {
                if (answer.id === idAnswer) {
                  return { ...answer, right: !answer.right };
                } else {
                  return { ...answer, right: false };
                }
              }),
            ],
          };
        } else {
          return { ...question };
        }
      }),
    );
  };

  const changeAnswerForQuestion = (idQuestion, idAnswer, event) => {
    const questionsCopy = JSON.parse(JSON.stringify(questions));
    setQuestions(
      questionsCopy.map((question) => {
        if (question.id === idQuestion) {
          return {
            ...question,
            answers: [
              ...question.answers.map((answer) => {
                if (answer.id === idAnswer) {
                  return { ...answer, answer: event.target.value };
                } else {
                  return { ...answer };
                }
              }),
            ],
          };
        } else {
          return { ...question };
        }
      }),
    );
  };

  const deleteAnwerForQuestion = (idQuestion, idAnswer) => {
    const questionsCopy = JSON.parse(JSON.stringify(questions));
    setQuestions(
      questionsCopy.map((question) => {
        if (question.id === idQuestion) {
          return {
            ...question,
            answers: question.answers.filter((answer) => answer.id !== idAnswer),
          };
        } else {
          return { ...question };
        }
      }),
    );
  };

  const save = () => {
    const questionsCopy = JSON.parse(JSON.stringify(questions));

    const data = {
      ...tests,
      level: level,
      unit: unit,
      topic: topic,
      questions: questionsCopy.map((question) => {
        return {
          title: question.title,
          answers: question.answers.map((answer) => {
            return answer.answer;
          }),
          correct: question.answers.reduce((acc, current) => {
            if (current.right) {
              return current.answer;
            } else {
              return acc;
            }
          }, ''),
        };
      }),
    };

    setTests({
      ...tests,
      level: level,
      unit: unit,
      topic: topic,
      questions: questionsCopy.map((question) => {
        return {
          title: question.title,
          answers: question.answers.map((answer) => {
            return answer.answer;
          }),
          correct: question.answers.reduce((acc, current) => {
            if (current.right) {
              return current.answer;
            } else {
              return acc;
            }
          }, ''),
        };
      }),
    });

    postData(data);
  };

  const postData = (tests) => axios.post('http://localhost:5000/api/questions/', tests);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.headerContainer}>
          <Header
            level={level}
            setLevel={setLevel}
            unit={unit}
            setUnit={setUnit}
            topic={topic}
            setTopic={setTopic}
          />
        </div>
        <div className={styles.questionsContainer}>
          {questions.map((question) => {
            return (
              <Question
                key={question.id}
                question={question}
                setQuestions={setQuestions}
                addAnswer={addAnswer}
                changeTitleForQuestion={changeTitleForQuestion}
                changeRightAnswerForQuestion={changeRightAnswerForQuestion}
                changeAnswerForQuestion={changeAnswerForQuestion}
                deleteAnwerForQuestion={deleteAnwerForQuestion}
              />
            );
          })}
        </div>
        <div className={styles.buttonsContainer}>
          <div className={styles.addQuestionContainer}>
            <Button variant='contained' onClick={addQuestion}>
              Add Question
            </Button>
          </div>
          <div className={styles.saveTestsContainer}>
            <Button variant='contained' onClick={save}>
              Save Test
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tests;
