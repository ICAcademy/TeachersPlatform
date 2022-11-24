import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { NotFound } from 'components/NotFound/NotFound';
import { Content } from 'components/Content/Content';

// Pages
import Materials from 'pages/Materials/Materials';
import Material from 'pages/Material/Material';

const AppRouter = () => (
  <Routes>
    <Route path='/home' element={<Content />} />
    <Route path='/materials' element={<Materials />} />
    <Route path='/materials/:url' element={<Material />} />
    <Route path='*' element={<NotFound />} />
  </Routes>
);

export default AppRouter;
