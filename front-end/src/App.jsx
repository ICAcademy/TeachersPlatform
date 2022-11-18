import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';

// routes
import MainRoutes from 'routes/MainRoutes';

// components
import Header from 'components/common/Header/Header';
import Footer from 'components/common/Footer/Footer';

// theme style
import theme from './styles/customTheme';

// styles
import './App.scss';

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <div className='wrap'>
          <Header />
          <MainRoutes />
        </div>
        <Footer />
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
