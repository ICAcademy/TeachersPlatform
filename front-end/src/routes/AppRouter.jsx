import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Sidebar } from 'components/sidebar/Sidebar';

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path='/dashboard' element={<Sidebar />} />
    </Routes>
  </Router>
);

export default AppRouter;
