import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from './styles/customTheme';
import AppRouter from 'routes/AppRouter';
import { Sidebar } from 'components/Sidebar/Sidebar';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Sidebar />
      <AppRouter />
    </ThemeProvider>
  );
};

export default App;

