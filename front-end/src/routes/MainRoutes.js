import React from 'react';
import { Route, Routes } from 'react-router-dom';

// pages
import Tests from 'pages/Tests/Tests';

const MainRoutes = () => {
  return (
    <Routes>
      <Route path='/tests' element={<Tests />} />
    </Routes>
  );
};

export default MainRoutes;
