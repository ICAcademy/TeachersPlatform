import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from './styles/customTheme';
import AppRouter from 'routes/AppRouter';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppRouter />
    </ThemeProvider>
  );
};

export default App;
