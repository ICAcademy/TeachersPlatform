import React from 'react';
import { Route, Routes } from 'react-router-dom';

// pages
import Guest from 'pages/Guest/Guest';

const MainRoutes = () => {
  return (
    <Routes>
      <Route path='/guest' element={<Guest />} />
    </Routes>
  );
};

export default MainRoutes;

