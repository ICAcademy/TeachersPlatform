import React from 'react';
import PropTypes from 'prop-types';

// MUI library
import { TextField, Box, InputAdornment } from '@mui/material';

// FontAwesome library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

// Styles
const sx = {
  inputsBox: {
    display: 'flex',
    alignItems: 'flex-start',
    ['@media (max-width: 550px)']: { width: '100%' },
    '& .MuiTextField-root': {
      my: 1,
      ml: 0,
      mr: 1,
      width: '30ch',
      ['@media (max-width: 840px)']: { mb: 3 },
      ['@media (max-width: 768px)']: { width: '24ch' },
      ['@media (max-width: 550px)']: { width: '97%', mx: 1 },
    },
    '& svg': {
      fontSize: '14px',
    },
  },
};

const SearchWord = ({ word, handleInput, selectError }) => (
  <Box component='form' sx={sx.inputsBox} noValidate autoComplete='off'>
    <TextField
      id='outlined-required'
      name='Search'
      label='Search'
      value={word}
      onChange={handleInput}
      size='small'
      disabled={selectError}
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </InputAdornment>
        ),
      }}
    />
  </Box>
);

SearchWord.propTypes = {
  word: PropTypes.string,
  selectError: PropTypes.bool,
  handleInput: PropTypes.func,
};

SearchWord.defaultProps = {
  word: '',
  selectError: false,
  handleInput: () => {},
};

export default SearchWord;
