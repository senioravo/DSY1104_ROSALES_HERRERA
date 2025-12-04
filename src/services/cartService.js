// cartService.js
// Servicio para manejar el carrito de compras con API REST

import API_CONFIG from '../config/api.config';

const API_URL = API_CONFIG.CARRITO_SERVICE;

/**
 * Obtiene el ID del usuario actual desde la sesión
 */
const getCurrentUserId = () => {
    try {
        const session = localStorage.getItem('mil_sabores_session');
        if (session) {
            const user = JSON.parse(session);
            return user.id;
        }
        return null;
    } catch (error) {
        console.error('Error al obtener usuario:', error);
        return null;
    }
};

export const cartService = {
    // Obtener el carrito del usuario
    getCart: async () => {
        try {
            const usuarioId = getCurrentUserId();
            if (!usuarioId) {
                console.warn('Usuario no autenticado');
                return [];
            }

            const response = await fetch(`${API_URL}/carritos/usuario/${usuarioId}`, {
                headers: API_CONFIG.HEADERS
            });

            if (!response.ok) {
                throw new Error('Error al obtener el carrito');
            }

            const data = await response.json();
            return data.items || [];
        } catch (error) {
            console.error('Error al obtener el carrito:', error);
            return [];
        }
    },

    // Agregar producto al carrito
    addToCart: async (product, quantity = 1) => {
        try {
            const usuarioId = getCurrentUserId();
            if (!usuarioId) {
                throw new Error('Usuario no autenticado');
            }

            const response = await fetch(`${API_URL}/carritos/agregar`, {
                method: 'POST',
                headers: API_CONFIG.HEADERS,
                body: JSON.stringify({
                    usuarioId,
                    productoCode: product.code,
                    productoNombre: product.nombre,
                    precioCLP: product.precioCLP,
                    productoImagen: product.imagen,
                    cantidad: quantity,
                    stockDisponible: product.stock
                })
            });

            if (!response.ok) {
                throw new Error('Error al agregar producto al carrito');
            }

            // Disparar evento de actualización del carrito
            window.dispatchEvent(new Event('cartUpdated'));

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error al agregar al carrito:', error);
            throw error;
        }
    },

    // Actualizar cantidad de un producto
    updateQuantity: async (itemId, quantity) => {
        try {
            const response = await fetch(`${API_URL}/carritos/item/${itemId}?cantidad=${quantity}`, {
                method: 'PUT',
                headers: API_CONFIG.HEADERS
            });

            if (!response.ok) {
                throw new Error('Error al actualizar cantidad');
            }

            // Disparar evento de actualización del carrito
            window.dispatchEvent(new Event('cartUpdated'));

            if (response.status === 204) {
                return null; // Item eliminado
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error al actualizar cantidad:', error);
            throw error;
        }
    },

    // Eliminar producto del carrito por ID de item
    removeFromCart: async (itemId) => {
        try {
            const response = await fetch(`${API_URL}/carritos/item/${itemId}`, {
                method: 'DELETE',
                headers: API_CONFIG.HEADERS
            });

            if (!response.ok) {
                throw new Error('Error al eliminar producto del carrito');
            }

            // Disparar evento de actualización del carrito
            window.dispatchEvent(new Event('cartUpdated'));
        } catch (error) {
            console.error('Error al eliminar del carrito:', error);
            throw error;
        }
    },

    // Limpiar todo el carrito
    clearCart: async () => {
        try {
            const usuarioId = getCurrentUserId();
            if (!usuarioId) {
                throw new Error('Usuario no autenticado');
            }

            const response = await fetch(`${API_URL}/carritos/usuario/${usuarioId}`, {
                method: 'DELETE',
                headers: API_CONFIG.HEADERS
            });

            if (!response.ok) {
                throw new Error('Error al limpiar el carrito');
            }

            // Disparar evento de actualización del carrito
            window.dispatchEvent(new Event('cartUpdated'));
        } catch (error) {
            console.error('Error al limpiar el carrito:', error);
            throw error;
        }
    },

    // Obtener total del carrito
    getCartTotal: async () => {
        try {
            const usuarioId = getCurrentUserId();
            if (!usuarioId) {
                return 0;
            }

            const response = await fetch(`${API_URL}/carritos/usuario/${usuarioId}/total`, {
                headers: API_CONFIG.HEADERS
            });

            if (!response.ok) {
                throw new Error('Error al obtener total del carrito');
            }

            const total = await response.json();
            return total;
        } catch (error) {
            console.error('Error al obtener total del carrito:', error);
            return 0;
        }
    },

    // Obtener cantidad total de items
    getCartItemCount: async () => {
        try {
            const usuarioId = getCurrentUserId();
            if (!usuarioId) {
                return 0;
            }

            const response = await fetch(`${API_URL}/carritos/usuario/${usuarioId}/cantidad`, {
                headers: API_CONFIG.HEADERS
            });

            if (!response.ok) {
                throw new Error('Error al obtener cantidad de items');
            }

            const cantidad = await response.json();
            return cantidad;
        } catch (error) {
            console.error('Error al obtener cantidad de items:', error);
            return 0;
        }
    }
};