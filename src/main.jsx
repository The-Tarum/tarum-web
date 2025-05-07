import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import routes from './routes';
import { AppProvider } from './context/AppContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
       <AppProvider>
       <RouterProvider router={routes} />
       </AppProvider>

  </React.StrictMode>
);


