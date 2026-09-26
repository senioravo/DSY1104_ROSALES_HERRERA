/**
 * Equivalente en React al MsalInterceptor (Angular):
 * obtiene access_token de Entra (scope access_as_user) y lo envía como Bearer al API Gateway.
 */
import { InteractionRequiredAuthError } from '@azure/msal-browser';
import { getMsalInstance } from '../config/msalInstance';
import { apiTokenRequest } from '../config/msalConfig';
import API_CONFIG from '../config/api.config';

let msalInitPromise;

async function ensureMsalInitialized() {
    const instance = getMsalInstance();
    if (!msalInitPromise) {
        msalInitPromise =
            typeof instance.initialize === 'function'
                ? instance.initialize()
                : Promise.resolve();
    }
    await msalInitPromise;
    return instance;
}

/**
 * Access token para la API expuesta en Entra (VITE_AZURE_API_SCOPE).
 * @returns {Promise<string|null>}
 */
export async function acquireApiAccessToken() {
    if (!apiTokenRequest.scopes?.length) {
        console.warn('[MSAL] Falta VITE_AZURE_API_SCOPE en .env.local');
        return null;
    }

    const instance = await ensureMsalInitialized();
    const account = instance.getActiveAccount() ?? instance.getAllAccounts()[0];
    if (!account) {
        return null;
    }

    if (!instance.getActiveAccount()) {
        instance.setActiveAccount(account);
    }

    try {
        const result = await instance.acquireTokenSilent({
            ...apiTokenRequest,
            account,
        });
        return result.accessToken;
    } catch (error) {
        if (error instanceof InteractionRequiredAuthError) {
            await instance.acquireTokenRedirect({
                ...apiTokenRequest,
                account,
            });
            return null;
        }
        console.error('[MSAL] acquireTokenSilent falló:', error);
        throw error;
    }
}

/** Headers JSON con Authorization: Bearer <access_token> si hay sesión Entra. */
export async function getMsalAuthHeaders() {
    const token = await acquireApiAccessToken();
    return token ? API_CONFIG.getAuthHeaders(token) : API_CONFIG.HEADERS;
}

/**
 * fetch envuelto: adjunta Bearer Entra a peticiones al gateway (salvo attachToken: false).
 * @param {RequestInfo | URL} input
 * @param {RequestInit} [init]
 * @param {{ attachToken?: boolean }} [options]
 */
export async function msalApiFetch(input, init = {}, options = {}) {
    const { attachToken = true } = options;
    const headers = new Headers(init.headers ?? {});

    if (!headers.has('Accept')) {
        headers.set('Accept', 'application/json');
    }
    if (init.body && typeof init.body === 'string' && !headers.has('Content-Type')) {
        headers.set('Content-Type', 'application/json');
    }

    if (attachToken) {
        const token = await acquireApiAccessToken();
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
    }

    return fetch(input, { ...init, headers });
}
