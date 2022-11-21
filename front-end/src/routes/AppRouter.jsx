import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { NotFound } from 'components/NotFound/NotFound';
import { Content } from 'components/Content/Content';
import Main from 'pages/Main/Main';

const AppRouter = () => {
  return (
    <Routes>
      <Route path='/main' element={<Main />} />
      <Route path='/home' element={<Content />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
