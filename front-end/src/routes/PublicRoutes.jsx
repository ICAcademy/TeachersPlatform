import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Pages
import { Content } from 'components/Content/Content';
import Main from 'pages/Main/Main';

// Pages
import Materials from 'pages/Materials/Materials';
import Material from 'pages/Material/Material';
import Tests from 'pages/Tests/Tests';

const PublicRoutes = () => (
  <Routes>
    <Route path='/home' element={<Content />} />
    <Route path='/main' element={<Main />} />
    <Route path='/materials' element={<Materials />} />
    <Route path='/materials/:url' element={<Material />} />
    <Route path='/tests' element={<Tests />} />
  </Routes>
);

export default PublicRoutes;
