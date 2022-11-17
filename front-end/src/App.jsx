import React from 'react';
import { ThemeProvider } from '@mui/material/styles';

// theme style
import theme from 'styles/customTheme';
import Router from 'routes/Router';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router />
    </ThemeProvider>
  );
};

export default App;
