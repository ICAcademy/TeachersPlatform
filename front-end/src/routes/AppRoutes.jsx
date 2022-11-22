import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Components
import { Sidebar } from 'components/Sidebar/Sidebar';

const AppRoutes = () => (
  <>
    <Sidebar />
    <Routes>
      <Route path='/admin' element={<h1>Admin</h1>} />
    </Routes>
  </>
);

export default AppRoutes;
