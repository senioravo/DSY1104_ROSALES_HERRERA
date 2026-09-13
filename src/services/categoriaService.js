/**
 * Servicio de categorías para Mil Sabores
 * Maneja las operaciones CRUD de categorías mediante API REST
 */

import API_CONFIG from '../config/api.config';

const API_URL = API_CONFIG.PRODUCTO_SERVICE;

export const categoriaService = {
    /**
     * Obtiene todas las categorías
     */
    getAll: async () => {
        try {
            const response = await fetch(`${API_URL}/categorias`, {
                headers: API_CONFIG.HEADERS
            });

            if (!response.ok) {
                throw new Error('Error al obtener categorías');
            }

            const categorias = await response.json();
            return categorias;
        } catch (error) {
            console.error('Error al obtener categorías:', error);
            throw error;
        }
    },

    /**
     * Obtiene una categoría por ID
     */
    getById: async (id) => {
        try {
            const response = await fetch(`${API_URL}/categorias/${id}`, {
                headers: API_CONFIG.HEADERS
            });

            if (!response.ok) {
                throw new Error('Categoría no encontrada');
            }

            const categoria = await response.json();
            return categoria;
        } catch (error) {
            console.error('Error al obtener categoría:', error);
            throw error;
        }
    },

    /**
     * Crea una nueva categoría
     */
    create: async (categoriaData) => {
        try {
            const response = await fetch(`${API_URL}/categorias`, {
                method: 'POST',
                headers: API_CONFIG.HEADERS,
                body: JSON.stringify(categoriaData)
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Error al crear categoría');
            }

            const categoria = await response.json();
            return categoria;
        } catch (error) {
            console.error('Error al crear categoría:', error);
            throw error;
        }
    },

    /**
     * Actualiza una categoría existente
     */
    update: async (id, categoriaData) => {
        try {
            const response = await fetch(`${API_URL}/categorias/${id}`, {
                method: 'PUT',
                headers: API_CONFIG.HEADERS,
                body: JSON.stringify(categoriaData)
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Error al actualizar categoría');
            }

            const categoria = await response.json();
            return categoria;
        } catch (error) {
            console.error('Error al actualizar categoría:', error);
            throw error;
        }
    },

    /**
     * Elimina una categoría
     */
    delete: async (id) => {
        try {
            const response = await fetch(`${API_URL}/categorias/${id}`, {
                method: 'DELETE',
                headers: API_CONFIG.HEADERS
            });

            if (!response.ok) {
                throw new Error('Error al eliminar categoría');
            }
        } catch (error) {
            console.error('Error al eliminar categoría:', error);
            throw error;
        }
    }
};

// Función helper para mantener compatibilidad con código existente
export const getCategoryById = async (id) => {
    return await categoriaService.getById(id);
};

export const getFeaturedCategories = async (limit = 3) => {
    const categorias = await categoriaService.getAll();
    return categorias.slice(0, limit);
};
