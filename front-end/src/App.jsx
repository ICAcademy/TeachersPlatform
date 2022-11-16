import React from 'react';
import { ThemeProvider } from '@mui/material/styles';

// Components
import AppRouter from 'routes/AppRouter';

// theme style
import theme from './styles/customTheme';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppRouter />
    </ThemeProvider>
  );
};

export default App;
