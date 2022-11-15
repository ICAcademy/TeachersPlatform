import React from 'react';
import { ThemeProvider } from '@mui/material/styles';

// theme style
import theme from './styles/customTheme';
import { Button } from '@mui/material';
import Header from 'components/common/Header';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <div>Teachers platform</div>
      <Button
        onClick={() => console.log('you clicked me')}
        color="primary" 
        variant="contained"
        >
        Button
      </Button>
    </ThemeProvider>
  );
};

export default App;
