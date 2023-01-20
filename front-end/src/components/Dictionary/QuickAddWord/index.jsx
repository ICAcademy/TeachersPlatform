import React, { useState, useEffect, useCallback, useContext } from 'react';
import { Link } from 'react-router-dom';

// MUI library
import { Box, IconButton, TextField, Button } from '@mui/material';

// FontAwesome library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faBookBookmark } from '@fortawesome/free-solid-svg-icons';

// Context
import { CurrentUserContext } from 'context/AppProvider';

// Constants
import { TEACHER_ROLE } from 'constants/userRoles';

// Services
import { createDictionary } from 'services/dictionaryService';
import { getTeachersSubscription } from 'services/subscriptionService';

// Hooks
import useInput from 'hooks/useInput';

// HOC
import { withSnackbar } from 'components/withSnackbar/withSnackbar';

// Helpers
import { REGEX_WORD, REGEX_TRANSLATION } from 'helpers/regex';
import { WORD_HELPER_TEXT, TRANSLATION_HELPER_TEXT } from 'helpers/text';

// Components
import Loader from 'components/common/Loader/Loader';
import StudentsSelect from 'components/Dictionary/StudentsSelect';

// Styles
import styles from './QuickAddWord.module.scss';

const sx = {
  dictionaryBtn: {
    zIndex: 1000,
    width: '60px',
    height: '60px',
    bgcolor: '#b464a6',
    '&:hover': {
      bgcolor: '#b464a6',
      transform: 'translateY(-5px)',
    },
  },
  addBtn: {
    width: '100%',
    height: '40px',
    my: 0.5,
  },
  inputsBox: {
    '& .MuiTextField-root': {
      width: '19ch',
    },
  },
  formControl: {
    width: '100%',
  },
};

const QuickAddWord = ({ snackbarShowMessage }) => {
  const {
    currentUser: { roleId, role },
  } = useContext(CurrentUserContext);

  const [isClicked, setIsClicked] = useState(false);
  const [existWord, setExistWord] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [students, setStudents] = useState('');

  const isTeacher = role === TEACHER_ROLE;
  const selectHasError = isTeacher && selectedStudentId === '';

  const getId = useCallback(() => {
    if (isTeacher) return selectedStudentId;
    return roleId;
  }, [isTeacher, roleId, selectedStudentId]);

  const handleClose = () => {
    setIsClicked(false);
  };

  const {
    value: enteredWord,
    isValid: wordIsValid,
    hasError: wordHasError,
    valueChangeHandler: wordChangeHandler,
    valueOnBlurHandler: wordBlurHandler,
    resetValue: resetWord,
  } = useInput('word', '', REGEX_WORD);

  const {
    value: enteredTranslation,
    isValid: translationIsValid,
    hasError: translationHasError,
    valueChangeHandler: translationChangeHandler,
    valueOnBlurHandler: translationBlurHandler,
    resetValue: resetTranslation,
  } = useInput('translation', '', REGEX_TRANSLATION);

  const handleCreateDictionary = async (word, translation) => {
    try {
      setIsLoading(true);
      await createDictionary({ word, translation, studentId: getId() });
      setExistWord(false);
      snackbarShowMessage({
        message: 'Created word!',
        severity: 'success',
      });
    } catch (error) {
      if (error.response.data === 'This word already exist') {
        setExistWord(true);
      }
      snackbarShowMessage({
        message:
          error.response.data === 'This word already exist'
            ? error.response.data
            : 'Something went wrong!',
        severity: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSubscriptions = useCallback(async (id) => {
    try {
      const subscriptions = await getTeachersSubscription(id);
      setStudents(subscriptions);
    } catch (error) {
      return error;
    }
  }, []);

  useEffect(() => {
    if (isTeacher) {
      fetchSubscriptions(roleId);
    }
  }, [fetchSubscriptions, isTeacher, roleId]);

  const reset = () => {
    resetWord();
    resetTranslation();
    handleClose();
  };

  const getComponent = () => {
    if (isLoading) return <Loader />;
    if (isClicked)
      return (
        <div className={styles.contentWrap}>
          <div className={`${styles.wrap} ${isTeacher ? styles.mediumSize : styles.normalSize}`}>
            <div className={styles.blockHeader}>
              <h1>Add word</h1>
              <div className={styles.btnsWrap}>
                <Link to='/app/dictionary' onClick={handleClose}>
                  <FontAwesomeIcon icon={faBookBookmark} />
                </Link>
                <IconButton onClick={handleClose}>
                  <FontAwesomeIcon icon={faXmark} />
                </IconButton>
              </div>
            </div>
            {isTeacher ? (
              <StudentsSelect
                students={students}
                style={sx.formControl}
                selectError={selectHasError}
                studentId={selectedStudentId}
                handleStudentId={(student) => setSelectedStudentId(student)}
              />
            ) : (
              ''
            )}
            <Box component='form' sx={sx.inputsBox} autoComplete='off'>
              <div className={styles.inputsWrap}>
                <TextField
                  id='outlined-required'
                  label='Word'
                  name='word'
                  value={enteredWord}
                  onChange={wordChangeHandler}
                  onBlur={wordBlurHandler}
                  error={wordHasError}
                  helperText={wordHasError ? WORD_HELPER_TEXT : ' '}
                  size='small'
                  align='center'
                />
                <TextField
                  id='outlined-required'
                  name='translation'
                  label='Translation'
                  value={enteredTranslation}
                  onChange={translationChangeHandler}
                  onBlur={translationBlurHandler}
                  error={translationHasError}
                  helperText={translationHasError ? TRANSLATION_HELPER_TEXT : ' '}
                  size='small'
                  align='center'
                />
              </div>
              <Button
                variant='contained'
                size='small'
                disabled={!wordIsValid || !translationIsValid || selectHasError}
                sx={sx.addBtn}
                onClick={async () => {
                  handleCreateDictionary(enteredWord, enteredTranslation);
                  (await !existWord) ? reset() : null;
                }}
              >
                add
              </Button>
            </Box>
          </div>
        </div>
      );
    return (
      <div className={styles.buttonWrap}>
        <IconButton
          sx={sx.dictionaryBtn}
          onClick={() => (isClicked ? handleClose() : setIsClicked(true))}
          aria-label='add'
          className={`${styles.dictionaryIcon} ${isClicked ? styles.btnDisable : styles.btnActive}`}
        >
          <FontAwesomeIcon icon={faBookBookmark} />
        </IconButton>
      </div>
    );
  };

  return getComponent();
};

export default withSnackbar(QuickAddWord);
