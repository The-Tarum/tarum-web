import { createBrowserRouter } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import Layout from './components/Layout';
import PrivateRoute from './PrivateRoute'
import CategoryPage from './pages/CategoryPage'
import ProductPage from './pages/ProductPage'

const routes = createBrowserRouter([
    {
      path: '/',
      element: <LoginPage />, 
    },
    {
      path: '/signup',
      element: <SignupPage />, 
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
            {
              path: 'categories',
              element: <CategoryPage />,
            },
            {
              path: 'products',
              element: <ProductPage />,
            },
            {
              path: 'products/:categoryId/:subCategoryId',
              element: <ProductPage />,
            },
            
          ],
        },
      ],
    },
  ]);
  
  export default routes;