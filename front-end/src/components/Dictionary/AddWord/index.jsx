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
    '& .MuiTextField-root': { m: 1, width: '30ch' },
  },
  addBtn: {
    width: '100px',
    height: '40px',
    mb: 3,
    mx: 1,
  },
};

const AddWord = ({ isLoading, createDictionary }) => {
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
        <Button
          variant='contained'
          size='small'
          sx={sx.addBtn}
          onClick={() => {
            createDictionary(enteredWord, enteredTranslation);
            resetWord();
            resetTranslation();
          }}
          type='submit'
          disabled={!wordIsValid || !translationIsValid}
        >
          Add
        </Button>
      </div>
    </Box>
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
