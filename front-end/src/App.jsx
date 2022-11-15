import React from 'react';
import { ThemeProvider } from '@mui/material/styles';

// components
import Header from 'components/common/Header/Header';
import Footer from 'components/common/Footer/Footer';
import './App.scss';

// theme style
import theme from './styles/customTheme';
import { Button } from '@mui/material';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className="wrap">
        <Header />
        <div>Teachers platform</div>
        <Button
          onClick={() => console.log('you clicked me')}
          color="primary"
          variant="contained"
        >
          Button
        </Button>
      </div>
      <Footer />
    </ThemeProvider>
  );
};

export default App;
