import React, { useContext, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';

// Router
import AppRouter from 'routes/AppRouter';

// Context
import { CurrentUserContext } from 'context/AppProvider';

// Store
import store from 'store';

// Theme style
import theme from 'styles/customTheme';
import 'App.scss';

const App = () => {
  const { fetchUser } = useContext(CurrentUserContext);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <div className='wrap'>
          <AppRouter />
        </div>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
