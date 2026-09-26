/**
 * Servicio de ventas — API vía gateway/BFF con Bearer Entra (MSAL).
 */

import API_CONFIG from '../config/api.config';
import { msalApiFetch } from './msalApiFetch';

const API_URL = API_CONFIG.VENTAS_SERVICE;

async function parseError(response) {
    try {
        const data = await response.json();
        if (data.message) return data.message;
        if (data.error) return data.error;
        if (data.validationErrors && typeof data.validationErrors === 'object') {
            return Object.entries(data.validationErrors)
                .map(([k, v]) => `${k}: ${v}`)
                .join('; ');
        }
        return JSON.stringify(data);
    } catch {
        const text = await response.text().catch(() => '');
        return text || `HTTP ${response.status}`;
    }
}

export const ventasService = {
    crearVenta: async (ventaData) => {
        const response = await msalApiFetch(`${API_URL}/ventas`, {
            method: 'POST',
            body: JSON.stringify(ventaData),
        });

        if (!response.ok) {
            throw new Error(await parseError(response));
        }

        return response.json();
    },

    obtenerTodas: async () => {
        const response = await msalApiFetch(`${API_URL}/ventas`);
        if (!response.ok) {
            throw new Error(await parseError(response));
        }
        return response.json();
    },

    obtenerPorId: async (id) => {
        const response = await msalApiFetch(`${API_URL}/ventas/${id}`);
        if (!response.ok) {
            throw new Error(await parseError(response));
        }
        return response.json();
    },

    obtenerPorUsuario: async (usuarioId) => {
        const response = await msalApiFetch(`${API_URL}/ventas/usuario/${usuarioId}`);
        if (!response.ok) {
            throw new Error(await parseError(response));
        }
        return response.json();
    },

    obtenerPorEstado: async (estado) => {
        const response = await msalApiFetch(`${API_URL}/ventas/estado/${estado}`);
        if (!response.ok) {
            throw new Error(await parseError(response));
        }
        return response.json();
    },

    actualizarEstado: async (id, estado) => {
        const response = await msalApiFetch(
            `${API_URL}/ventas/${id}/estado?estado=${encodeURIComponent(estado)}`,
            { method: 'PATCH' },
        );
        if (!response.ok) {
            throw new Error(await parseError(response));
        }
        return response.json();
    },

    eliminar: async (id) => {
        const response = await msalApiFetch(`${API_URL}/ventas/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error(await parseError(response));
        }
    },
};
