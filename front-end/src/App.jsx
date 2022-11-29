import React, { useContext, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';

// Router
import AppRouter from 'routes/AppRouter';

// Context
import { CurrentUserContext } from 'context/AppProvider';

// Theme style
import theme from 'styles/customTheme';

const App = () => {
  const { fetchUser } = useContext(CurrentUserContext);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      fetchUser();
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <AppRouter />
    </ThemeProvider>
  );
};

export default App;
