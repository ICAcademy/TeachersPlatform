import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { NotFound } from 'components/NotFound/NotFound';
import { Content } from 'components/Content/Content';
import Main from 'pages/Main/Main';

// Pages
import { Content } from 'components/Content/Content';
import Main from 'pages/Main/Main';

// Pages
import Materials from 'pages/Materials/Materials';
import Material from 'pages/Material/Material';

const PublicRoutes = () => (
  <Routes>
    <Route path='/home' element={<Content />} />
    <Route path='/main' element={<Main />} />
    <Route path='/materials' element={<Materials />} />
    <Route path='/materials/:url' element={<Material />} />
  </Routes>
);

export default PublicRoutes;
