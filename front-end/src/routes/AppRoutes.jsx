import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Components
import { Sidebar } from 'components/Sidebar/Sidebar';

const AppRoutes = () => (
  <>
    <Sidebar />
    <Routes>
      <Route path='/app' element={<h1>App</h1>} />
    </Routes>
  </>
);

export default AppRoutes;
