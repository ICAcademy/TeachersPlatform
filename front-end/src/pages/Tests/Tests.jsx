import React, { useState, useEffect, useCallback } from 'react';
import { nanoid } from 'nanoid';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// components
import Header from 'components/Tests/Header/Header';
import Question from 'components/Tests/Question/Question';
import { Button } from '@mui/material';
import Loader from 'components/common/Loader/Loader';
import { withSnackbar } from 'components/withSnackbar/withSnackbar';

//services
import { getTestById } from 'services/TestsService';
import { getLevels, updateQuestion, createQuestion } from 'services/questionService';

// styles
import styles from './Tests.module.scss';

const Tests = ({ snackbarShowMessage }) => {
  const [tests, setTests] = useState({
    level: '',
    unit: '',
    topic: '',
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
  const [levels, setLevels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams();

  const getData = useCallback(async (id) => {
    try {
      setIsLoading(true);
      const fetchTest = await getTestById(id);
      const newQuestions = transform(fetchTest.questions);
      setQuestions(newQuestions);
      setTests(fetchTest);
      setTopic(fetchTest.topic);
      setUnit(fetchTest.unit);
      setLevel(fetchTest.level);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const getLevel = useCallback(async () => {
    const levels = await getLevels();
    setLevels(levels);
  }, []);

  useEffect(() => {
    if (id) {
      getData(id);
    }
    getLevel();
  }, [getData, getLevel, id]);

  const transform = (questions) => {
    const newQuestions = questions.map((question) => {
      return {
        id: question._id,
        title: question.title,
        answers: question.answers.map((answer) => {
          if (question.correct === answer) {
            return {
              id: nanoid(),
              answer: answer,
              right: true,
            };
          }
          return {
            id: nanoid(),
            answer: answer,
            right: false,
          };
        }),
      };
    });
    return newQuestions;
  };

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

  const deleteQuestion = (idQuestion) => {
    const questionsCopy = JSON.parse(JSON.stringify(questions));
    const newQuestions = questionsCopy.filter((question) => idQuestion !== question.id);
    setQuestions(newQuestions);
    snackbarShowMessage({
      message: 'Question deleted',
      severity: 'success',
    });
  };

  const save = async () => {
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
      await updateOrCreate(id, data);
    }
  };

  const updateOrCreate = async (id, data) => {
    try {
      if (id) {
        snackbarShowMessage({
          message: 'Test updated',
          severity: 'success',
        });
        return await updateQuestion(id, data);
      }
      snackbarShowMessage({
        message: 'Test saved',
        severity: 'success',
      });
      return await createQuestion(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.pageContainer}>
          <div className={styles.container}>
            <div className={styles.content}>
              <div className={styles.editTestContainer}>
                <h2>Edit Test</h2>
              </div>
              <div className={styles.headerContainer}>
                <Header
                  levels={levels}
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
                        id={question.id}
                        index={index}
                        question={question}
                        setQuestions={setQuestions}
                        addAnswer={addAnswer}
                        deleteQuestion={deleteQuestion}
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
                        component={Link}
                        to='/app/questions/'
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
      )}
    </>
  );
};

Tests.propTypes = {
  snackbarShowMessage: PropTypes.func,
};

export default withSnackbar(Tests);
