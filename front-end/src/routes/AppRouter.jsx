import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import Materials from 'pages/Materials/Materials';

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path='/materials' element={<Materials />} />
    </Routes>
  </Router>
);

export default AppRouter;
