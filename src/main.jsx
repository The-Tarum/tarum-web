
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import ErrorBoundary from './components/ErrorBoundary';
import './index.css';
import routes from './routes';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <AppProvider>
        <RouterProvider router={routes} />
      </AppProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
