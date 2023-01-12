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

const wordHelperText = 'Wrong! Example: you'; // TODO: rename
const translationHelperText = 'Wrong! Example: ти'; // TODO: rename

const QuickAddWord = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleCreateDictionary = async (word, translation) => {
    try {
      setIsLoading(true);
      await createDictionary({ word, translation, studentId: '63bbeee8fcd9c7f8a838b749' });
    } catch (error) {
      return error;
    } finally {
      setIsLoading(false);
    }
  };

  const getComponent = () => {
    if (isLoading) return <Loader />;
    if (isClicked)
      return (
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
                disabled={!wordIsValid || !translationIsValid}
                sx={sx.addBtn}
                onClick={() => {
                  handleCreateDictionary(enteredWord, enteredTranslation);
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

export default QuickAddWord;
