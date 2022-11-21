import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Pages
import Registration from 'pages/Registration';
import Login from 'pages/Login';

const AuthRoutes = () => (
  <Routes>
    <Route path='/registration' element={<Registration />} />
    <Route path='/login' element={<Login />} />
  </Routes>
);

export default AuthRoutes;
