import React from 'react';
import PropTypes from 'prop-types';

// MUI library
import { TextField, Box, Button } from '@mui/material';

// Components
import Loader from 'components/common/Loader/Loader';

// Hooks
import useInput from 'hooks/useInput';

// Helpers
import { REGEX_WORD, REGEX_TRANSLATION } from 'helpers/regex';
import { WORD_HELPER_TEXT, TRANSLATION_HELPER_TEXT } from 'helpers/text';

// Styles
import styles from './AddWord.module.scss';

const sx = {
  inputsBox: {
    '& .MuiTextField-root': {
      my: 1,
      ml: 0,
      mr: 1,
      width: '30ch',
      ['@media (max-width: 1100px)']: { width: '24ch' },
      ['@media (max-width: 550px)']: { width: '100%', mx: 1 },
    },
  },
  addBtn: {
    width: '100px',
    height: '40px',
    mb: 3,
    mx: 1,
    ['@media (max-width: 550px)']: { width: '100%' },
  },
};

const AddWord = ({ isLoading, createDictionary, selectError }) => {
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

  return isLoading ? (
    <Loader />
  ) : (
    <Box component='form' sx={sx.inputsBox} noValidate autoComplete='off'>
      <div className={styles.inputsWrap}>
        <TextField
          id='outlined-required'
          name='word'
          label='Word'
          value={enteredWord}
          onChange={wordChangeHandler}
          onBlur={wordBlurHandler}
          error={wordHasError}
          helperText={wordHasError ? WORD_HELPER_TEXT : ' '}
          size='small'
          align='center'
          disabled={selectError}
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
          disabled={selectError}
        />
        <Button
          variant='contained'
          size='small'
          sx={sx.addBtn}
          onClick={() => {
            createDictionary(enteredWord, enteredTranslation);
            resetWord();
            resetTranslation();
          }}
          disabled={!wordIsValid || !translationIsValid || selectError}
        >
          Add
        </Button>
      </div>
    </Box>
  );
};

AddWord.propTypes = {
  isLoading: PropTypes.bool,
  selectError: PropTypes.bool,
  createDictionary: PropTypes.func.isRequired,
};

AddWord.defaultProps = {
  isLoading: false,
  selectError: false,
};

export default AddWord;
