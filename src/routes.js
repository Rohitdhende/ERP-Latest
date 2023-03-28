import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import DashboardPage from './pages/DashboardPage';
import Page404 from './pages/Page404';
import LoginPage from './pages/Login';
import UnderGroupAdminLogin from './pages/UnderGroupAdminLogin';
import UnderGroupAdminDashboard from './pages/UnderGroupAdminDashboard'

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardPage /> },
      ],
    },
    {
      path: '/login',
      element: <LoginPage />,
    },
    {
      path: '/under-group-admin-login',
      element: <UnderGroupAdminLogin />,
    },
    {
      path: '/under-group-admin-dashboard',
      element: <UnderGroupAdminDashboard />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
