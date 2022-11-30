import React from 'react';
import { ThemeProvider } from '@mui/material/styles';

// Components
import PublicRoutes from 'routes/PublicRoutes';
import { Sidebar } from 'components/Sidebar/Sidebar';
import Header from 'components/common/Header/Header';
import Footer from 'components/common/Footer/Footer';

// Router
import AppRouter from 'routes/AppRouter';

// Theme style
import theme from 'styles/customTheme';
import 'App.scss';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className='wrap'>
        <Header />
        <Sidebar />
        <PublicRoutes />
        <AppRouter />
      </div>
      <Footer />
    </ThemeProvider>
  );
};

export default App;
