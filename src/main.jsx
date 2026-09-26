import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { MsalProvider } from '@azure/msal-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { router } from './routes.jsx';
import RootErrorBoundary from './components/common/RootErrorBoundary.jsx';
import { getMsalInstance } from './config/msalInstance';

const rootEl = document.getElementById('root');
if (!rootEl) {
  throw new Error('No se encontró #root');
}

createRoot(rootEl).render(
  <RootErrorBoundary>
    <MsalProvider instance={getMsalInstance()}>
      <RouterProvider router={router} />
    </MsalProvider>
  </RootErrorBoundary>,
);
