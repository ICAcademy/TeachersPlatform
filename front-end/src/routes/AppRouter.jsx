import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { NotFound } from 'components/NotFound/NotFound';
import { Content } from 'components/Content/Content';

// Pages
import Login from 'pages/Login';

const AppRouter = () => (
  <Routes>
    <Route path='/login' element={<Login />} />
    <Route path='/home' element={<Content />} />
    <Route path='*' element={<NotFound />} />
  </Routes>
);

export default AppRouter;
