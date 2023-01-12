import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// MUI library
import { Box, IconButton, TextField, Button } from '@mui/material';

// FontAwesome library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faBookBookmark } from '@fortawesome/free-solid-svg-icons';

// Services
import { createDictionary } from 'services/dictionaryService';

// Hooks
import useInput from 'hooks/useInput';

// Helpers
import { regexDictionaryWord, regexDictionaryTranslation } from 'helpers/regex';

// Components
import Loader from 'components/common/Loader/Loader';

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
    '& .MuiTextField-root': { width: '19ch' },
  },
};

const wordHelperText = 'Wrong! Example: you';
const translationHelperText = 'Wrong! Example: ти';

const QuickAddWord = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleOpen = () => {
    setIsClicked(true);
  };
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
  } = useInput('word', '', regexDictionaryWord);

  const {
    value: enteredTranslation,
    isValid: translationIsValid,
    hasError: translationHasError,
    valueChangeHandler: translationChangeHandler,
    valueOnBlurHandler: translationBlurHandler,
    resetValue: resetTranslation,
  } = useInput('translation', '', regexDictionaryTranslation);

  const formIsValid = wordIsValid && translationIsValid;

  const fetchCreateDictionary = async (word, translation) => {
    try {
      setIsLoading(true);
      await createDictionary({ studentId: '63bbeee8fcd9c7f8a838b749', word, translation });
    } catch (error) {
      setIsLoading(false);
      return error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : isClicked ? (
        <div className={styles.contentWrap}>
          <div className={styles.wrap}>
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
                  helperText={wordHasError ? wordHelperText : ' '}
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
                  helperText={translationHasError ? translationHelperText : ' '}
                  size='small'
                  align='center'
                />
              </div>
              <Button
                variant='contained'
                size='small'
                disabled={!formIsValid}
                sx={sx.addBtn}
                onClick={() => {
                  fetchCreateDictionary(enteredWord, enteredTranslation);
                  handleClose();
                  resetWord();
                  resetTranslation();
                }}
              >
                add
              </Button>
            </Box>
          </div>
        </div>
      ) : (
        <div className={styles.buttonWrap}>
          <IconButton
            sx={sx.dictionaryBtn}
            onClick={() => (isClicked ? handleClose() : handleOpen())}
            aria-label='add'
            className={`${styles.dictionaryIcon} ${
              isClicked ? styles.btnDisable : styles.btnActive
            }`}
          >
            <FontAwesomeIcon icon={faBookBookmark} />
          </IconButton>
        </div>
      )}
    </>
  );
};

export default QuickAddWord;
