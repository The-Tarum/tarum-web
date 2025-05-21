import { createBrowserRouter } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/marketplace/HomePage';
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
import SupplierPage from "./pages/marketplace/SupplierPage";
import TabView  from './components/TabView';
import WebTabView  from './components/WebTabView';
import ProductDetailPage from "./pages/marketplace/ProductDetailPage"
import RequestQuotaPage from './pages/marketplace/RequestQuotaPage';
import { useIsMobile } from "./hooks/use-mobile" // Fixed path

// Create a wrapper component for responsive tabs
const ResponsiveTabView = () => {
  const isMobile = useIsMobile();
  console.log("Is Mobile",isMobile)
  return isMobile ? <TabView /> : <WebTabView />;
};

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
    element: <PrivateRoute />,
    children: [
      {
        path: '/',
        element: <Layout />,
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
            element: <ResponsiveTabView />, // Use the wrapper component here
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
              {
                path: 'product/:id',
                element: <ProductDetailPage />,
              },
              {
                path: 'quota',
                element: <RequestQuotaPage/>
              }
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