import React, { useContext, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';

// Components
import RouterWrapper from 'routes/RouterWrapper';

// Context
import { CurrentUserContext } from 'context/AppProvider';

// Theme style
import theme from './styles/customTheme';

const App = () => {
  const { fetchUser } = useContext(CurrentUserContext);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      fetchUser();
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <RouterWrapper />
    </ThemeProvider>
  );
};

export default App;
