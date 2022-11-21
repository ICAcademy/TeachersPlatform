import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Routes
import AppRoutes from './AppRoutes';
import AuthRoutes from './AuthRoutes';
import PublicRoutes from './PublicRoutes';

// Pages
import { NotFound } from 'components/NotFound/NotFound';

const RouterWrapper = () => (
  <>
    <AppRoutes />
    <AuthRoutes />
    <PublicRoutes />
    <Routes>
      <Route path='*' element={<NotFound />} />
    </Routes>
  </>
);

export default RouterWrapper;
