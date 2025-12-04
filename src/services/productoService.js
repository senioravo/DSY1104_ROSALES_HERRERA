/**
 * Servicio de productos para Mil Sabores
 * Maneja las operaciones CRUD de productos mediante API REST
 */

import API_CONFIG from '../config/api.config';

const API_URL = API_CONFIG.PRODUCTO_SERVICE;

export const productoService = {
    /**
     * Obtiene todos los productos activos
     */
    getAll: async () => {
        try {
            const response = await fetch(`${API_URL}/productos`, {
                headers: API_CONFIG.HEADERS
            });

            if (!response.ok) {
                throw new Error('Error al obtener productos');
            }

            const productos = await response.json();
            return productos;
        } catch (error) {
            console.error('Error al obtener productos:', error);
            throw error;
        }
    },

    /**
     * Obtiene un producto por su código
     */
    getByCode: async (code) => {
        try {
            const response = await fetch(`${API_URL}/productos/${code}`, {
                headers: API_CONFIG.HEADERS
            });

            if (!response.ok) {
                throw new Error('Producto no encontrado');
            }

            const producto = await response.json();
            return producto;
        } catch (error) {
            console.error('Error al obtener producto:', error);
            throw error;
        }
    },

    /**
     * Obtiene productos por categoría
     */
    getByCategory: async (categoriaId) => {
        try {
            const response = await fetch(`${API_URL}/productos/categoria/${categoriaId}`, {
                headers: API_CONFIG.HEADERS
            });

            if (!response.ok) {
                throw new Error('Error al obtener productos por categoría');
            }

            const productos = await response.json();
            return productos;
        } catch (error) {
            console.error('Error al obtener productos por categoría:', error);
            throw error;
        }
    },

    /**
     * Obtiene productos destacados
     */
    getFeatured: async (limit = 3) => {
        try {
            const url = limit ? `${API_URL}/productos/destacados?limit=${limit}` : `${API_URL}/productos/destacados`;
            const response = await fetch(url, {
                headers: API_CONFIG.HEADERS
            });

            if (!response.ok) {
                throw new Error('Error al obtener productos destacados');
            }

            const productos = await response.json();
            return productos;
        } catch (error) {
            console.error('Error al obtener productos destacados:', error);
            throw error;
        }
    },

    /**
     * Busca productos por nombre
     */
    searchByName: async (nombre) => {
        try {
            const response = await fetch(`${API_URL}/productos/buscar?nombre=${encodeURIComponent(nombre)}`, {
                headers: API_CONFIG.HEADERS
            });

            if (!response.ok) {
                throw new Error('Error al buscar productos');
            }

            const productos = await response.json();
            return productos;
        } catch (error) {
            console.error('Error al buscar productos:', error);
            throw error;
        }
    },

    /**
     * Crea un nuevo producto
     */
    create: async (productoData) => {
        try {
            const response = await fetch(`${API_URL}/productos`, {
                method: 'POST',
                headers: API_CONFIG.HEADERS,
                body: JSON.stringify(productoData)
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Error al crear producto');
            }

            const producto = await response.json();
            return producto;
        } catch (error) {
            console.error('Error al crear producto:', error);
            throw error;
        }
    },

    /**
     * Actualiza un producto existente
     */
    update: async (code, productoData) => {
        try {
            const response = await fetch(`${API_URL}/productos/${code}`, {
                method: 'PUT',
                headers: API_CONFIG.HEADERS,
                body: JSON.stringify(productoData)
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Error al actualizar producto');
            }

            const producto = await response.json();
            return producto;
        } catch (error) {
            console.error('Error al actualizar producto:', error);
            throw error;
        }
    },

    /**
     * Actualiza el stock de un producto
     */
    updateStock: async (code, nuevoStock) => {
        try {
            const response = await fetch(`${API_URL}/productos/${code}/stock?stock=${nuevoStock}`, {
                method: 'PATCH',
                headers: API_CONFIG.HEADERS
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Error al actualizar stock');
            }

            const producto = await response.json();
            return producto;
        } catch (error) {
            console.error('Error al actualizar stock:', error);
            throw error;
        }
    },

    /**
     * Elimina (desactiva) un producto
     */
    delete: async (code) => {
        try {
            const response = await fetch(`${API_URL}/productos/${code}`, {
                method: 'DELETE',
                headers: API_CONFIG.HEADERS
            });

            if (!response.ok) {
                throw new Error('Error al eliminar producto');
            }
        } catch (error) {
            console.error('Error al eliminar producto:', error);
            throw error;
        }
    }
};

// Función helper para mantener compatibilidad con código existente
export const getProductsByCategory = async (categoryId) => {
    return await productoService.getByCategory(categoryId);
};

export const getProductByCode = async (code) => {
    return await productoService.getByCode(code);
};

export const getFeaturedProducts = async (limit = 3) => {
    return await productoService.getFeatured(limit);
};
