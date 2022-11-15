import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from './styles/customTheme';
import { Sidebar } from 'components/sidebar/Sidebar';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Sidebar />
    </ThemeProvider>
  );
};

export default App;
