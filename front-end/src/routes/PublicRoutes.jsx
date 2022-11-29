import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Pages
import { Content } from 'components/Content/Content';
import Main from 'pages/Main/Main';

// Pages
import Materials from 'pages/Materials/Materials';
import Material from 'pages/Material/Material';
import AdminMaterial from 'pages/Admin/AdminMaterials/AdminMaterial';

const PublicRoutes = () => (
  <Routes>
    <Route path='/home' element={<Content />} />
    <Route path='/materials' element={<Materials />} />
    <Route path='/main' element={<Main />} />
    <Route path='/materials' element={<Materials />} />
    <Route path='/materials/:url' element={<Material />} />
    <Route path='/materials/edit-:url' element={<AdminMaterial />} />
  </Routes>
);

export default PublicRoutes;
