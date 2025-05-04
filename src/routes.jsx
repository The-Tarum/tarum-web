import { createBrowserRouter } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import Layout from './components/Layout';
import PrivateRoute from './PrivateRoute'
import CategoryPage from './pages/CategoryPage'
import ProductPage from './pages/marketplace/ProductPage'
import ProfilePage  from './pages/ProfilePage'
import OrdersPage from './pages/OrdersPage';
import ChatsPage from './pages/ChatsPage';
import ContectsPage from './pages/ContectsPage';
import EmailPage from './pages/EmailPage';
import GroupsPage from './pages/GroupsPage';
import MarketplacePage from './pages/marketplace/MarketplacePage';
import SettingsPage from './pages/SettingsPage';
import  SupplierPage from "./pages/marketplace/SupplierPage";
import TabView  from './components/TabView';


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
              path: 'email',
              element: <EmailPage />,
            },
            {
              path: 'contents',
              element: <ContectsPage />,
            },

            {
              path: 'marketplace',
              element: <TabView /> , 
              children: [
                {
                  path: 'home',
                  element: <HomePage />,
                },
                {
                  path: 'products',
                  element: <ProductPage/>,
                },
                {
                  path: 'supplier',
                  element: <SupplierPage />,
                },
                {
                  path: 'categories',
                  element: <CategoryPage />,
                },
              ]
            },
            {
              path: 'chats',
              element: <ChatsPage />,
            },
            {
              path: 'groups',
              element: <GroupsPage />,
            },
            {
              path: 'settings',
              element: <SettingsPage />,
            },
  
            
          ],
        },
      ],
    },
  ]);
  
  export default routes;

