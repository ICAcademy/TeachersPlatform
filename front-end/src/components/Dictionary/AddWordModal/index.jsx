import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// MUI library
import { Box, Typography, Modal, IconButton, TextField, Button } from '@mui/material';

// FontAwesome library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faBookBookmark } from '@fortawesome/free-solid-svg-icons';

// Hooks
import useInput from 'hooks/useInput';

// Helpers
import { regexDictionaryWord, regexDictionaryTranslation } from 'helpers/regex';

// Components
import Loader from 'components/common/Loader/Loader';

// Styles
import styles from './AddWordModal.module.scss';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  height: 350,
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
  dictionaryBtn: {
    width: '60px',
    height: '60px',
    bgcolor: '#a968a3',
    '&:hover': {
      bgcolor: '#a968a3',
      transform: 'translateY(-5px)',
    },
  },
};

const wordHelperText = 'Please enter word in english without numbers';
const translationHelperText = 'Please enter word in ukrainian without numbers';

const AddWordModal = ({ createDictionary, isLoading }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
    <div className={styles.wrapper}>
      <IconButton
        sx={sx.dictionaryBtn}
        onClick={handleOpen}
        aria-label='add'
        className={styles.icon}
      >
        <FontAwesomeIcon icon={faBookBookmark} width={15} height={15} />
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
                Add word
              </Typography>
              <div className={styles.btnWrapper}>
                <Link to='/app/dictionary' className={styles.linkBtn} onClick={handleClose}>
                  <FontAwesomeIcon icon={faBookBookmark} />
                </Link>
                <IconButton onClick={handleClose}>
                  <FontAwesomeIcon icon={faXmark} />
                </IconButton>
              </div>
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
                    console.log(enteredWord, enteredTranslation);
                    createDictionary(enteredWord, enteredTranslation);
                    handleClose();
                  }}
                >
                  Add
                </Button>
              </div>
            </Box>
          </Box>
        </Modal>
      )}
    </div>
  );
};

AddWordModal.propTypes = {
  createDictionary: PropTypes.func,
  isLoading: PropTypes.bool,
};

AddWordModal.defaultProps = {
  createDictionary: () => {},
  isLoading: false,
};

export default AddWordModal;
