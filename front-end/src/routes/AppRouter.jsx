import React, { useContext, Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Private route
import PrivateRoute from 'routes/PrivateRoute';

// Context
import { CurrentUserContext } from 'context/AppProvider';

// Components
import { Sidebar } from 'components/Sidebar/Sidebar';
import Loader from 'components/common/Loader/Loader';

// Pages
const Login = lazy(() => import('pages/Login'));
const Registration = lazy(() => import('pages/Registration'));
const Main = lazy(() => import('pages/Main/Main'));
const Material = lazy(() => import('pages/Material/Material'));
const Materials = lazy(() => import('pages/Materials/Materials'));
const NotFound = lazy(() => import('pages/NotFound'));
const Tests = lazy(() => import('pages/Tests/Tests'));
const Questions = lazy(() => import('pages/Questions/Questions'));
const Topics = lazy(() => import('pages/Topics/Topics'));
const AdminMaterials= lazy(() => import ('pages/Admin/AdminMaterials/AdminMaterial');

const RouterWrapper = () => {
  const { isAuthenticated } = useContext(CurrentUserContext);
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route index element={isAuthenticated ? <Navigate to='/app' /> : <Main />} />
        <Route
          path='/app'
          element={
            <PrivateRoute>
              <Sidebar />
            </PrivateRoute>
          }
        >
          <Route
            path='/app/materials'
            element={
              <PrivateRoute>
                <Materials />
              </PrivateRoute>
            }
          />
          <Route
            path='/app/materials/:url'
            element={
              <PrivateRoute>
                <Material />
              </PrivateRoute>
            }
          />
          <Route
        path='/app/materials/edit/:url'
        element={
          <PrivateRoute>
            <AdminMaterials />
          </PrivateRoute>
        }
      />
          <Route
            path='/app/questions'
            element={
              <PrivateRoute>
                <Questions />
              </PrivateRoute>
            }
          />
          <Route
            path='/app/questions/:url'
            element={
              <PrivateRoute>
                <Topics />
              </PrivateRoute>
            }
          />
        </Route>
        <Route
          path='/app/tests'
          element={
            <PrivateRoute>
              <Tests />
            </PrivateRoute>
          }
        />
        <Route path='/login' element={<Login />} />
        <Route path='/registration' element={<Registration />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default RouterWrapper;
