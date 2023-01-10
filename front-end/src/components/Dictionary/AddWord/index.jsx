import React, { useState } from 'react';
import PropTypes from 'prop-types';

// MUI library
import { TextField, Box, Button } from '@mui/material';

// Components
import Loader from 'components/common/Loader/Loader';

// Styles
import styles from './AddWord.module.scss';

const AddWord = ({ isLoading, handleAddWord }) => {
  const [translation, setTranslation] = useState('');

  const [word, setWord] = useState('');

  const handleWordChange = (e) => {
    setWord(e.target.value);
  };

  const handleTranslationChange = (e) => {
    setTranslation(e.target.value);
  };

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
                required
                id='outlined-required'
                name='word'
                value={word}
                onChange={handleWordChange}
                label='Word'
                size='small'
                align='center'
              />
              <TextField
                required
                id='outlined-required'
                name='translation'
                value={translation}
                onChange={handleTranslationChange}
                label='Translation'
                size='small'
                align='center'
              />
              <Button
                variant='contained'
                size='small'
                sx={{ width: 100, height: 40 }}
                onClick={() => {
                  handleAddWord(word, translation);
                  setWord('');
                  setTranslation('');
                }}
                type='submit'
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
  roleId: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
  handleAddWord: PropTypes.func.isRequired,
};

AddWord.defaultProps = {
  isLoading: false,
};

export default AddWord;
