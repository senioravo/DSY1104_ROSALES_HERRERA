/**
 * Configuración MSAL ↔ app registrada en Azure Entra ID (SPA).
 * Valores desde .env.local — nombres definidos en .env.example
 */

const tenantId = import.meta.env.VITE_AZURE_TENANT_ID;
const clientId = import.meta.env.VITE_AZURE_CLIENT_ID;
const authority = import.meta.env.VITE_AZURE_AUTHORITY;
const apiScope = import.meta.env.VITE_AZURE_API_SCOPE;

/** Objeto que MSAL pasa a PublicClientApplication (paso 3). */
export const msalConfig = {
    auth: {
        // Application (client) ID de "Mil Sabores frontend" en Entra
        clientId: clientId ?? '',
        // URL del tenant: login.microsoftonline.com/{tenant-id}
        authority: authority ?? `https://login.microsoftonline.com/${tenantId ?? 'common'}`,
        // Debe coincidir con Redirect URI SPA en Azure (ej. http://localhost:5173)
        redirectUri: typeof window !== 'undefined' ? window.location.origin : '/',
        postLogoutRedirectUri: typeof window !== 'undefined' ? window.location.origin : '/',
    },
    cache: {
        cacheLocation: 'localStorage',
        storeAuthStateInCookie: false,
    },
};

/**
 * Scopes del login (id token + perfil básico).
 * User.Read = Microsoft Graph; openid/profile/email = OIDC estándar.
 */
export const loginRequest = {
    scopes: [
        'openid',
        'profile',
        'email',
        'User.Read',
        ...(apiScope ? [apiScope] : []),
    ],
};

/**
 * Token para tu API expuesta en Entra (scope access_as_user).
 * Se usará con Gateway/BFF en pasos posteriores (EP1).
 */
export const apiTokenRequest = {
    scopes: apiScope ? [apiScope] : [],
};

/** Útil para avisos en UI si falta .env.local. */
export const isMsalConfigured = () =>
    Boolean(clientId && authority && tenantId && !String(clientId).includes('tu-client-id'));
