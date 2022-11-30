import React from 'react';
import { ThemeProvider } from '@mui/material/styles';

// Router
import AppRouter from 'routes/AppRouter';

// Theme style
import theme from 'styles/customTheme';

const App = () => (
  <ThemeProvider theme={theme}>
    <AppRouter />
  </ThemeProvider>
);

export default App;
