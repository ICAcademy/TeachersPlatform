import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Pages
import Registration from 'pages/Registration';

const AuthRoutes = () => (
  <Routes>
    <Route path='/registration' element={<Registration />} />
  </Routes>
);

export default AuthRoutes;
