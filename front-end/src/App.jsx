import React from 'react';
import { ThemeProvider } from '@mui/material/styles';

// Components
import PublicRoutes from 'routes/PublicRoutes';

// theme style
import theme from './styles/customTheme';
import { Sidebar } from 'components/Sidebar/Sidebar';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Sidebar />
      <PublicRoutes />
    </ThemeProvider>
  );
};

export default App;
