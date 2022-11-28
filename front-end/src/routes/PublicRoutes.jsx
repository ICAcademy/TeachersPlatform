import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Pages
import { Content } from 'components/Content/Content';
import Main from 'pages/Main/Main';

// Pages
import Materials from 'pages/Materials/Materials';
import AdminMaterials from 'pages/Admin/AdminMaterials/AdminMaterials';

const PublicRoutes = () => (
  <Routes>
    <Route path='/home' element={<Content />} />
    <Route path='/materials' element={<Materials />} />
    <Route path='/main' element={<Main />} />
    <Route path='/materials/edit-:id' element={<AdminMaterials />} />
    <Route path='/materials' element={<Materials />} />
    <Route path='/materials/:url' element={<Material />} />
  </Routes>
);

export default PublicRoutes;
