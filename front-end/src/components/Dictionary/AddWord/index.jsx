import React, { useState } from 'react';
import PropTypes from 'prop-types';

// MUI library
import { TextField, Box, Button } from '@mui/material';

// Components
import Loader from 'components/common/Loader/Loader';

// Hooks
import useInput from 'hooks/useInput';

// Helpers
import { regexDictionaryWord, regexDictionaryTranslation } from 'helpers/regex';

// Styles
import styles from './AddWord.module.scss';

const wordHelperText = 'Please enter word in english without numbers';
const translationHelperText = 'Please enter word in ukrainian without numbers';

const AddWord = ({ isLoading, createDictionary }) => {
  const {
    value: enteredWord,
    isValid: wordIsValid,
    hasError: wordHasError,
    valueChangeHandler: wordChangeHandler,
    valueOnBlurHandler: wordBlurHandler,
  } = useInput('word', '', regexDictionaryWord);

  const {
    value: enteredTranslation,
    isValid: translationIsValid,
    hasError: translationHasError,
    valueChangeHandler: translationChangeHandler,
    valueOnBlurHandler: translationBlurHandler,
  } = useInput('translation', '', regexDictionaryTranslation);

  const formIsValid = wordIsValid && translationIsValid;

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.wrapper}>
          <Box
            component='form'
            sx={{
              '& .MuiTextField-root': { m: 1, width: '45ch' },
            }}
            noValidate
            autoComplete='off'
          >
            <div className={styles.block}>
              <TextField
                id='outlined-required'
                name='word'
                label='Word'
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
              <Button
                variant='contained'
                size='small'
                sx={{ width: 100, height: 40, mb: 3 }}
                onClick={() => createDictionary(enteredWord, enteredTranslation)}
                type='submit'
                disabled={!formIsValid}
              >
                Add
              </Button>
            </div>
          </Box>
        </div>
      )}
    </>
  );
};

AddWord.propTypes = {
  isLoading: PropTypes.bool,
  createDictionary: PropTypes.func.isRequired,
};

AddWord.defaultProps = {
  isLoading: false,
};

export default AddWord;
