import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container } from 'components/container/Container';
import { NotFound } from 'components/notFound/NotFound';

const AppRouter = () => (
  <Routes>
    <Route path='/home' element={<Container />} />
    <Route path='*' element={<NotFound />} />
  </Routes>
);

export default AppRouter;
