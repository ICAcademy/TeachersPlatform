import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';

// routes
import AppRouter from 'routes/AppRouter';

// components
import Header from 'components/common/Header/Header';
import Footer from 'components/common/Footer/Footer';

// theme style
import theme from './styles/customTheme';
import 'App.scss';

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <div className='wrap'>
          <Header />
          <AppRouter />
        </div>
        <Footer />
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
