import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { NotFound } from 'components/NotFound/NotFound';
import { Content } from 'components/Content/Content';

// Pages
import Materials from 'pages/Materials/Materials';

const AppRouter = () => (
  <Routes>
    <Route path='/home' element={<Content />} />
    <Route path='/materials' element={<Materials />} />
    <Route path='*' element={<NotFound />} />
  </Routes>
);

export default AppRouter;
