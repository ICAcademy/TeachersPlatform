import React from 'react';
import { ThemeProvider } from '@mui/material/styles';

// pages
import Main from 'pages/Main/Main';

// components
import Header from 'components/common/Header/Header';
import Footer from 'components/common/Footer/Footer';

// theme style
import theme from './styles/customTheme';

// styles
import './App.scss';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className='wrap'>
        <Header />
        <Main />
      </div>
      <Footer />
    </ThemeProvider>
  );
};

export default App;
