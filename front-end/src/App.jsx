import React from 'react';
import { ThemeProvider } from '@mui/material/styles';

// Router
import AppRouter from 'routes/AppRouter';

// Theme style
import theme from 'styles/customTheme';
import 'App.scss';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className='wrap'>
        <AppRouter />
      </div>
    </ThemeProvider>
  );
};

export default App;
