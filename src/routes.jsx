import { createBrowserRouter } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import Layout from "./components/Layout"

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Layout />, // Use the Layout component here
    children: [
      {
        path: '/',
        element: <LoginPage />, // Home page content
      },
      {
        path: '/home',
        element: <HomePage />, // Login page content
      },
      // Add more routes as needed
    ],
  },
]);

export default routes;
