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
import { regexDictionaryWord, regexDictionaryTranslation } from 'helpers/regex';

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

const wordHelperText = 'Enter word in english without numbers';
const translationHelperText = 'Enter word in ukrainian without numbers';

const EditModal = ({ dictionary, updateDictionary, isLoading }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {
    value: enteredWord,
    isValid: wordIsValid,
    hasError: wordHasError,
    valueChangeHandler: wordChangeHandler,
    valueOnBlurHandler: wordBlurHandler,
  } = useInput('word', dictionary?.word, regexDictionaryWord);

  const {
    value: enteredTranslation,
    isValid: translationIsValid,
    hasError: translationHasError,
    valueChangeHandler: translationChangeHandler,
    valueOnBlurHandler: translationBlurHandler,
  } = useInput('translation', dictionary?.translation, regexDictionaryTranslation);

  const formIsValid = wordIsValid && translationIsValid;

  return (
    <div className={styles.wrapper}>
      <IconButton onClick={handleOpen} aria-label='update'>
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
                <Button
                  variant='contained'
                  size='small'
                  disabled={!formIsValid}
                  sx={{ width: 100, height: 40, my: 1.5 }}
                  onClick={() => {
                    updateDictionary(dictionary?._id, {
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
  dictionary: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object])
    .isRequired,
  updateDictionary: PropTypes.func,
  isLoading: PropTypes.bool,
};

EditModal.defaultProps = {
  updateDictionary: () => {},
  isLoading: false,
};

export default EditModal;
