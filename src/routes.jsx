import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import PrivateRoute from './PrivateRoute';
import LoadingSpinner from './components/LoadingSpinner';

const LoginPage = lazy(() => import('./pages/LoginPage'));
const SignupPage = lazy(() => import('./pages/SignupPage'));
const HomePage = lazy(() => import('./pages/marketplace/HomePage'));
const ProductPage = lazy(() => import('./pages/marketplace/ProductPage'));
const SupplierPage = lazy(() => import('./pages/marketplace/SupplierPage'));
const ProductDetailPage = lazy(() => import('./pages/marketplace/ProductDetailPage'));
const RequestQuotaPage = lazy(() => import('./pages/marketplace/RequestQuotaPage'));
const CategoryPage = lazy(() => import('./pages/CategoryPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const OrdersPage = lazy(() => import('./pages/OrdersPage'));
const ChatsPage = lazy(() => import('./pages/ChatsPage'));
const ContectsPage = lazy(() => import('./pages/ContectsPage'));
const EmailPage = lazy(() => import('./pages/EmailPage'));
const GroupsPage = lazy(() => import('./pages/GroupsPage'));
const SettingsPage = lazy(() => import('./pages/SettingsPage'));
const TabView = lazy(() => import('./components/TabView'));


const router = createBrowserRouter([
  {
    path: '/auth',
    children: [
      { path: 'login', element: <LoginPage /> },
      { path: 'signup', element: <SignupPage /> }
    ]
  },
  {
    path: '/',
    element: <PrivateRoute />,
    children: [
      {
        element: <Layout />,
        children: [
          {
            path: 'marketplace',
            element: <TabView />,
            children: [
              { path: '', element: <HomePage /> },
              { path: 'products', element: <ProductPage /> },
              { path: 'supplier', element: <SupplierPage /> },
              { path: 'product/:id', element: <ProductDetailPage /> },
              { path: 'categories', element: <CategoryPage /> },
              { path: 'quota', element: <RequestQuotaPage /> }
            ]
          },
          { path: 'profile', element: <ProfilePage /> },
          { path: 'orders', element: <OrdersPage /> },
          { path: 'chats', element: <ChatsPage /> },
          { path: 'groups', element: <GroupsPage /> },
          { path: 'settings', element: <SettingsPage /> },
          { path: 'email', element: <EmailPage /> },
          { path: 'contents', element: <ContectsPage /> }

        ]
      }
    ]
  }
]);

export default router;