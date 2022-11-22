import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Routes
import AppRoutes from './AppRoutes';
import AuthRoutes from './AuthRoutes';
import PublicRoutes from './PublicRoutes';

// Pages
import { NotFound } from 'components/NotFound/NotFound';
import Tests from 'pages/Tests/Tests';
import AllTests from 'pages/AllTests/AllTests';

const RouterWrapper = () => (
  <>
    <AppRoutes />
    <AuthRoutes />
    <PublicRoutes />
    <Routes>
      <Route path='/tests' element={<Tests />} />
      <Route path='/all-tests' element={<AllTests />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  </>
);

export default RouterWrapper;
