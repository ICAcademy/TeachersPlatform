import React from 'react';
import { Route, Routes } from 'react-router-dom';

// pages
import Main from 'pages/Main/Main';

const MainRoutes = () => {
  return (
    <Routes>
      <Route path='/main' element={<Main />} />
    </Routes>
  );
};

export default MainRoutes;

