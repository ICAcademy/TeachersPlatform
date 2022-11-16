import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

// Pages
import Registration from 'pages/Registration';

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/registration" element={<Registration />} />
    </Routes>
  </Router>
);

export default AppRouter;
