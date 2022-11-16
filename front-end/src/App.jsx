import React from 'react';
import { ThemeProvider } from '@mui/material/styles';

// components
import Header from 'components/common/Header/Header';
import Footer from 'components/common/Footer/Footer';
import './App.scss';

// theme style
import theme from './styles/customTheme';
import { Button } from '@mui/material';
import Main from 'pages/Main/Main';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className="wrap">
        <Header />
        <Main />
      </div>
      <Footer />
    </ThemeProvider>
  );
};

export default App;
