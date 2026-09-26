/**
 * Perfil de usuario en Neon (id numérico para carrito) tras login Entra.
 */
import API_CONFIG from '../config/api.config';
import { acquireApiAccessToken, msalApiFetch } from './msalApiFetch';

const NEON_PROFILE_KEY = 'mil_sabores_neon_profile';

export function getNeonProfile() {
    try {
        const raw = sessionStorage.getItem(NEON_PROFILE_KEY);
        if (!raw) return null;
        return JSON.parse(raw);
    } catch {
        sessionStorage.removeItem(NEON_PROFILE_KEY);
        return null;
    }
}

export function clearNeonProfile() {
    sessionStorage.removeItem(NEON_PROFILE_KEY);
    window.dispatchEvent(new Event('sessionUpdated'));
}

function mapSyncFailure(status) {
    if (status === 401) {
        return 'El gateway rechazó el token. Cerrá sesión, volvé a entrar con Microsoft y probá de nuevo.';
    }
    if (status === 400) {
        return 'El backend no recibió identidad Entra. Verificá que api-gateway y usuario-service estén activos.';
    }
    if (status >= 500) {
        return 'Error del servidor al vincular perfil Neon. Revisá usuario-service en consola.';
    }
    return `No se pudo vincular perfil (HTTP ${status}).`;
}

/**
 * GET /api/usuarios/me vía gateway (Bearer Entra). Crea o enlaza fila Neon.
 */
export async function syncNeonProfileFromApi() {
    const token = await acquireApiAccessToken();
    if (!token) {
        throw new Error(
            'No hay token de API (access_as_user). Cerrá sesión con Microsoft y volvé a iniciar sesión.',
        );
    }

    const base = API_CONFIG.USUARIO_SERVICE;
    const response = await msalApiFetch(`${base}/usuarios/me`);

    if (!response.ok) {
        const bodyText = await response.text().catch(() => '');
        console.warn('[Neon] /usuarios/me falló:', response.status, bodyText);
        throw new Error(mapSyncFailure(response.status));
    }

    const profile = await response.json();
    sessionStorage.setItem(NEON_PROFILE_KEY, JSON.stringify(profile));
    window.dispatchEvent(new Event('sessionUpdated'));
    return profile;
}

/** Id Long de Neon para carrito/checkout (MSAL o legacy). */
export function getNeonUserId() {
    const id = getNeonProfile()?.id;
    return id != null ? id : null;
}

export function toCartUserMessage(error) {
    if (error instanceof Error && error.message) {
        return error.message;
    }
    return 'No pudimos vincular tu perfil. Iniciá sesión con Microsoft y verificá que el backend esté activo.';
}
