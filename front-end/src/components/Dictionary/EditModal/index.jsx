import React, { useState } from 'react';
import PropTypes from 'prop-types';

// MUI library
import { Box, Typography, Modal, IconButton, TextField, Button } from '@mui/material';

// FontAwesome library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faXmark } from '@fortawesome/free-solid-svg-icons';

// Hooks
import useInput from 'hooks/useInput';

// Helpers
import { REGEX_WORD, REGEX_TRANSLATION } from 'helpers/regex';
import { WORD_HELPER_TEXT, TRANSLATION_HELPER_TEXT } from 'helpers/text';

// Components
import Loader from 'components/common/Loader/Loader';

// Styles
import styles from './EditModal.module.scss';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '450px',
  height: '350px',
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  borderRadius: 4,
};

const sx = {
  inputsBox: {
    '& .MuiTextField-root': {
      m: 1,
      width: '45ch',
    },
  },
  updateBtn: {
    width: '100px',
    height: '40px',
    my: 1.5,
  },
};

const EditModal = ({ dictionary, updateDictionary, isLoading }) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const {
    value: enteredWord,
    isValid: wordIsValid,
    hasError: wordHasError,
    valueChangeHandler: wordChangeHandler,
    valueOnBlurHandler: wordBlurHandler,
  } = useInput('word', dictionary.word, REGEX_WORD);

  const {
    value: enteredTranslation,
    isValid: translationIsValid,
    hasError: translationHasError,
    valueChangeHandler: translationChangeHandler,
    valueOnBlurHandler: translationBlurHandler,
  } = useInput('translation', dictionary.translation, REGEX_TRANSLATION);

  return (
    <div className={styles.wrapper}>
      <IconButton onClick={() => setOpen(true)} aria-label='update'>
        <FontAwesomeIcon icon={faPen} />
      </IconButton>
      {isLoading ? (
        <Loader />
      ) : (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box sx={style}>
            <div className={styles.headOfModal}>
              <Typography id='modal-modal-title' variant='h6' component='h2'>
                Edit word
              </Typography>
              <IconButton onClick={handleClose}>
                <FontAwesomeIcon icon={faXmark} />
              </IconButton>
            </div>
            <Box component='form' sx={sx.inputsBox} noValidate autoComplete='off'>
              <div className={styles.block}>
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
                <Button
                  variant='contained'
                  size='small'
                  disabled={!wordIsValid || !translationIsValid}
                  sx={sx.updateBtn}
                  onClick={() => {
                    updateDictionary(dictionary._id, {
                      word: enteredWord,
                      translation: enteredTranslation,
                    });
                    handleClose();
                  }}
                >
                  Update
                </Button>
              </div>
            </Box>
          </Box>
        </Modal>
      )}
    </div>
  );
};

EditModal.propTypes = {
  dictionary: PropTypes.shape({
    _id: PropTypes.string,
    studentId: PropTypes.string,
    word: PropTypes.string,
    translation: PropTypes.string,
  }).isRequired,
  updateDictionary: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

EditModal.defaultProps = {
  isLoading: false,
};

export default EditModal;
