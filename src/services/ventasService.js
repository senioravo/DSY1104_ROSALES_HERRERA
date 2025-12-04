/**
 * Servicio de ventas para Mil Sabores
 * Maneja las operaciones de ventas mediante API REST
 */

import API_CONFIG from '../config/api.config';

const API_URL = API_CONFIG.VENTAS_SERVICE;

export const ventasService = {
    /**
     * Crear una nueva venta
     */
    crearVenta: async (ventaData) => {
        try {
            const response = await fetch(`${API_URL}/ventas`, {
                method: 'POST',
                headers: API_CONFIG.HEADERS,
                body: JSON.stringify(ventaData)
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Error al crear venta');
            }

            const venta = await response.json();
            return venta;
        } catch (error) {
            console.error('Error al crear venta:', error);
            throw error;
        }
    },

    /**
     * Obtener todas las ventas
     */
    obtenerTodas: async () => {
        try {
            const response = await fetch(`${API_URL}/ventas`, {
                headers: API_CONFIG.HEADERS
            });

            if (!response.ok) {
                throw new Error('Error al obtener ventas');
            }

            const ventas = await response.json();
            return ventas;
        } catch (error) {
            console.error('Error al obtener ventas:', error);
            throw error;
        }
    },

    /**
     * Obtener venta por ID
     */
    obtenerPorId: async (id) => {
        try {
            const response = await fetch(`${API_URL}/ventas/${id}`, {
                headers: API_CONFIG.HEADERS
            });

            if (!response.ok) {
                throw new Error('Venta no encontrada');
            }

            const venta = await response.json();
            return venta;
        } catch (error) {
            console.error('Error al obtener venta:', error);
            throw error;
        }
    },

    /**
     * Obtener ventas por usuario
     */
    obtenerPorUsuario: async (usuarioId) => {
        try {
            const response = await fetch(`${API_URL}/ventas/usuario/${usuarioId}`, {
                headers: API_CONFIG.HEADERS
            });

            if (!response.ok) {
                throw new Error('Error al obtener ventas del usuario');
            }

            const ventas = await response.json();
            return ventas;
        } catch (error) {
            console.error('Error al obtener ventas por usuario:', error);
            throw error;
        }
    },

    /**
     * Obtener ventas por estado
     */
    obtenerPorEstado: async (estado) => {
        try {
            const response = await fetch(`${API_URL}/ventas/estado/${estado}`, {
                headers: API_CONFIG.HEADERS
            });

            if (!response.ok) {
                throw new Error('Error al obtener ventas por estado');
            }

            const ventas = await response.json();
            return ventas;
        } catch (error) {
            console.error('Error al obtener ventas por estado:', error);
            throw error;
        }
    },

    /**
     * Actualizar estado de venta
     */
    actualizarEstado: async (id, estado) => {
        try {
            const response = await fetch(`${API_URL}/ventas/${id}/estado?estado=${estado}`, {
                method: 'PATCH',
                headers: API_CONFIG.HEADERS
            });

            if (!response.ok) {
                throw new Error('Error al actualizar estado');
            }

            const venta = await response.json();
            return venta;
        } catch (error) {
            console.error('Error al actualizar estado:', error);
            throw error;
        }
    },

    /**
     * Eliminar venta
     */
    eliminar: async (id) => {
        try {
            const response = await fetch(`${API_URL}/ventas/${id}`, {
                method: 'DELETE',
                headers: API_CONFIG.HEADERS
            });

            if (!response.ok) {
                throw new Error('Error al eliminar venta');
            }
        } catch (error) {
            console.error('Error al eliminar venta:', error);
            throw error;
        }
    }
};
