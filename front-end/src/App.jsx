import React, { useContext, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';

// Components
// Router
import AppRouter from 'routes/AppRouter';

// Context
import { CurrentUserContext } from 'context/AppProvider';

// Theme style
import theme from 'styles/customTheme';
import 'App.scss';

const App = () => {
  const { fetchUser } = useContext(CurrentUserContext);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <ThemeProvider theme={theme}>
      <div className='wrap'>
        <AppRouter />
      </div>
    </ThemeProvider>
  );
};

export default App;
