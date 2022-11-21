import React from 'react';
import { ThemeProvider } from '@mui/material/styles';

// theme style
import theme from './styles/customTheme';
import { Button } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import MainRoutes from 'routes/MainRoutes';

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <MainRoutes />
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;

