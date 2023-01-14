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
    '& .MuiTextField-root': { m: 1, width: '30ch' },
    '& svg': { fontSize: '14px' },
  },
};

const SearchWord = ({ word, handleInput }) => (
  <Box component='form' sx={sx.inputsBox} noValidate autoComplete='off'>
    <TextField
      id='outlined-required'
      name='Search'
      label='Search'
      value={word}
      onChange={handleInput}
      size='small'
      InputProps={{
        endAdornment: (
          <InputAdornment position='center'>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </InputAdornment>
        ),
      }}
    />
  </Box>
);

SearchWord.propTypes = {
  word: PropTypes.string,
  handleInput: PropTypes.func,
};

SearchWord.defaultProps = {
  word: '',
  handleInput: () => {},
};

export default SearchWord;
