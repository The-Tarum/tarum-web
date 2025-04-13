import { createBrowserRouter } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import Layout from './components/Layout';
import PrivateRoute from './PrivateRoute'

const routes = createBrowserRouter([
    {
      path: '/',
      element: <LoginPage />, // Only login page has no layout
    },
    {
      path: '/',
      element: <PrivateRoute />, // check if user is logged in
      children: [
        {
          path: '/',
          element: <Layout />, // Layout (Header/Footer)
          children: [
            {
              path: 'home',
              element: <HomePage />,
            },
            // Add more routes here later
          ],
        },
      ],
    },
  ]);
  
  export default routes;