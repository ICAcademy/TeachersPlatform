import React from 'react';
import { ThemeProvider } from '@mui/material/styles';

// Components
import RouterWrapper from 'routes/RouterWrapper';

// theme style
import theme from './styles/customTheme';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <RouterWrapper />
    </ThemeProvider>
  );
};

export default App;

