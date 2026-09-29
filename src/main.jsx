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

const msalInstance = getMsalInstance();

function renderApp() {
  createRoot(rootEl).render(
    <RootErrorBoundary>
      <MsalProvider instance={msalInstance}>
        <RouterProvider router={router} />
      </MsalProvider>
    </RootErrorBoundary>,
  );
}

// MSAL v5 lanza uninitialized_public_client_application si se leen cuentas
// (getActiveAccount/getAllAccounts) antes de initialize(). Con sesión iniciada
// eso rompía toda carga completa de página (F5, retorno de Webpay).
msalInstance
  .initialize()
  .then(() => {
    if (!msalInstance.getActiveAccount()) {
      const [account] = msalInstance.getAllAccounts();
      if (account) {
        msalInstance.setActiveAccount(account);
      }
    }
  })
  .catch((error) => {
    console.error('[MSAL] initialize falló:', error);
  })
  .finally(renderApp);
