import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import API, { API_URL } from 'API';

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

  const [level, setLevel] = useState('');
  const [unit, setUnit] = useState('');
  const [topic, setTopic] = useState('');
  const [questions, setQuestions] = useState([
    {
      id: nanoid(),
      title: '',
      answers: [
        { id: nanoid(), answer: '', right: true },
        { id: nanoid(), answer: '', right: false },
      ],
    },
  ]);
  const [postInfo, setPostInfo] = useState(false);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: nanoid(),
        title: '',
        answers: [
          { id: nanoid(), answer: '', right: true },
          { id: nanoid(), answer: '', right: false },
        ],
      },
    ]);
  };

  const addAnswer = (id) => {
    const questionsCopy = JSON.parse(JSON.stringify(questions));
    setQuestions(
      questionsCopy.map((question) => {
        if (question.id === id) {
          return {
            ...question,
            answers: [...question.answers, { id: nanoid(), answer: '', right: false }],
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

    setPostInfo(true);

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
    if (
      level !== '' &&
      unit !== '' &&
      questions.every(
        (question) =>
          question.title !== '' && question.answers.every((answer) => answer.answer !== ''),
      )
    ) {
      postData(data);
    }
  };

  const postData = (tests) => API.post(`${API_URL}/api/questions/`, tests);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.editTestContainer}>
            <h2>Edit Test</h2>
          </div>
          <div className={styles.headerContainer}>
            <Header
              level={level}
              setLevel={setLevel}
              unit={unit}
              setUnit={setUnit}
              topic={topic}
              setTopic={setTopic}
              postInfo={postInfo}
            />
          </div>
          {questions.length > 0 && (
            <div className={styles.questionsContainer}>
              {questions.map((question, index) => {
                return (
                  <Question
                    key={question.id}
                    index={index}
                    question={question}
                    setQuestions={setQuestions}
                    addAnswer={addAnswer}
                    changeTitleForQuestion={changeTitleForQuestion}
                    changeRightAnswerForQuestion={changeRightAnswerForQuestion}
                    changeAnswerForQuestion={changeAnswerForQuestion}
                    deleteAnwerForQuestion={deleteAnwerForQuestion}
                    postInfo={postInfo}
                  />
                );
              })}
              <div className={styles.buttonsContainer}>
                <div className={styles.addQuestionContainer}>
                  <Button
                    className={styles.button}
                    sx={{ borderRadius: 50 }}
                    variant='contained'
                    onClick={addQuestion}
                  >
                    Add Question
                  </Button>
                </div>
                <div className={styles.saveTestsContainer}>
                  <Button
                    className={styles.button}
                    sx={{ borderRadius: 100 }}
                    variant='contained'
                    onClick={save}
                  >
                    Save Test
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tests;
