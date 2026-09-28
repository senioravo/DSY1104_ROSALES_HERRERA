// cartService.js
// Carrito: invitado en localStorage; con sesión Entra → API REST (carrito-service)

import API_CONFIG from '../config/api.config';
import { authService } from './authService';
import { getNeonUserId } from './neonProfileService';

const API_URL = API_CONFIG.CARRITO_SERVICE;
const GUEST_CART_KEY = 'mil_sabores_guest_cart';

function getLocalUsuarioId() {
    return getNeonUserId() ?? authService.getCurrentUser()?.id ?? null;
}

function isGuestItemId(itemId) {
    return String(itemId).startsWith('guest-');
}

function readGuestCart() {
    try {
        const raw = localStorage.getItem(GUEST_CART_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch {
        localStorage.removeItem(GUEST_CART_KEY);
        return [];
    }
}

function writeGuestCart(items) {
    localStorage.setItem(GUEST_CART_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event('cartUpdated'));
}

function guestCartTotals(items) {
    const total = items.reduce(
        (sum, item) => sum + (item.precioCLP || 0) * (item.cantidad || 0),
        0,
    );
    const count = items.reduce((sum, item) => sum + (item.cantidad || 0), 0);
    return { total, count };
}

function addToGuestCart(product, quantity) {
    const items = readGuestCart();
    const existing = items.find((i) => i.productoCode === product.code);
    if (existing) {
        existing.cantidad = Math.min(
            existing.cantidad + quantity,
            product.stock ?? existing.stockDisponible ?? 999,
        );
    } else {
        items.push({
            id: `guest-${product.code}`,
            productoCode: product.code,
            productoNombre: product.nombre,
            precioCLP: product.precioCLP,
            productoImagen: product.imagen,
            cantidad: quantity,
            stockDisponible: product.stock,
        });
    }
    writeGuestCart(items);
    return existing ?? items[items.length - 1];
}

export const cartService = {
    getCart: async () => {
        try {
            const usuarioId = getLocalUsuarioId();
            if (!usuarioId) {
                return readGuestCart();
            }

            const response = await fetch(`${API_URL}/carritos/usuario/${usuarioId}`, {
                headers: await authService.getAuthHeadersAsync(),
            });

            if (!response.ok) {
                throw new Error('Error al obtener el carrito');
            }

            const data = await response.json();
            return data.items || [];
        } catch (error) {
            console.error('Error al obtener el carrito:', error);
            return readGuestCart();
        }
    },

    addToCart: async (product, quantity = 1) => {
        const usuarioId = getLocalUsuarioId();
        if (!usuarioId) {
            return addToGuestCart(product, quantity);
        }

        try {
            const response = await fetch(`${API_URL}/carritos/agregar`, {
                method: 'POST',
                headers: await authService.getAuthHeadersAsync(),
                body: JSON.stringify({
                    usuarioId,
                    productoCode: product.code,
                    productoNombre: product.nombre,
                    precioCLP: product.precioCLP,
                    productoImagen: product.imagen,
                    cantidad: quantity,
                    stockDisponible: product.stock,
                }),
            });

            if (!response.ok) {
                throw new Error('Error al agregar producto al carrito');
            }

            window.dispatchEvent(new Event('cartUpdated'));
            return await response.json();
        } catch (error) {
            console.error('Error al agregar al carrito:', error);
            throw new Error('No se pudo agregar al carrito. Intentá de nuevo.');
        }
    },

    updateQuantity: async (itemId, quantity) => {
        if (isGuestItemId(itemId)) {
            const items = readGuestCart();
            const item = items.find((i) => i.id === itemId);
            if (!item) return null;
            if (quantity <= 0) {
                writeGuestCart(items.filter((i) => i.id !== itemId));
                return null;
            }
            item.cantidad = Math.min(quantity, item.stockDisponible ?? quantity);
            writeGuestCart(items);
            return item;
        }

        try {
            const response = await fetch(`${API_URL}/carritos/item/${itemId}?cantidad=${quantity}`, {
                method: 'PUT',
                headers: await authService.getAuthHeadersAsync(),
            });

            if (!response.ok) {
                throw new Error('Error al actualizar cantidad');
            }

            window.dispatchEvent(new Event('cartUpdated'));

            if (response.status === 204) {
                return null;
            }

            return await response.json();
        } catch (error) {
            console.error('Error al actualizar cantidad:', error);
            throw error;
        }
    },

    removeFromCart: async (itemId) => {
        if (isGuestItemId(itemId)) {
            writeGuestCart(readGuestCart().filter((i) => i.id !== itemId));
            return;
        }

        try {
            const response = await fetch(`${API_URL}/carritos/item/${itemId}`, {
                method: 'DELETE',
                headers: await authService.getAuthHeadersAsync(),
            });

            if (!response.ok) {
                throw new Error('Error al eliminar producto del carrito');
            }

            window.dispatchEvent(new Event('cartUpdated'));
        } catch (error) {
            console.error('Error al eliminar del carrito:', error);
            throw error;
        }
    },

    clearCart: async () => {
        const usuarioId = getLocalUsuarioId();
        if (!usuarioId) {
            writeGuestCart([]);
            return;
        }

        try {
            const response = await fetch(`${API_URL}/carritos/usuario/${usuarioId}`, {
                method: 'DELETE',
                headers: await authService.getAuthHeadersAsync(),
            });

            if (!response.ok) {
                throw new Error('Error al limpiar el carrito');
            }

            window.dispatchEvent(new Event('cartUpdated'));
        } catch (error) {
            console.error('Error al limpiar el carrito:', error);
            throw error;
        }
    },

    getCartTotal: async () => {
        const usuarioId = getLocalUsuarioId();
        if (!usuarioId) {
            return guestCartTotals(readGuestCart()).total;
        }

        try {
            const response = await fetch(`${API_URL}/carritos/usuario/${usuarioId}/total`, {
                headers: await authService.getAuthHeadersAsync(),
            });

            if (!response.ok) {
                throw new Error('Error al obtener total del carrito');
            }

            return await response.json();
        } catch (error) {
            console.error('Error al obtener total del carrito:', error);
            return guestCartTotals(readGuestCart()).total;
        }
    },

    getCartItemCount: async () => {
        const usuarioId = getLocalUsuarioId();
        if (!usuarioId) {
            return guestCartTotals(readGuestCart()).count;
        }

        try {
            const response = await fetch(`${API_URL}/carritos/usuario/${usuarioId}/cantidad`, {
                headers: await authService.getAuthHeadersAsync(),
            });

            if (!response.ok) {
                throw new Error('Error al obtener cantidad de items');
            }

            return await response.json();
        } catch (error) {
            console.error('Error al obtener cantidad de items:', error);
            return guestCartTotals(readGuestCart()).count;
        }
    },

    /** Tras login: sube ítems del carrito invitado al backend. */
    mergeGuestCartToServer: async () => {
        const guestItems = readGuestCart();
        if (!guestItems.length) {
            return;
        }

        const usuarioId = getLocalUsuarioId();
        if (!usuarioId) {
            return;
        }

        const headers = await authService.getAuthHeadersAsync();
        for (const item of guestItems) {
            await fetch(`${API_URL}/carritos/agregar`, {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    usuarioId,
                    productoCode: item.productoCode,
                    productoNombre: item.productoNombre,
                    precioCLP: item.precioCLP,
                    productoImagen: item.productoImagen,
                    cantidad: item.cantidad,
                    stockDisponible: item.stockDisponible,
                }),
            });
        }

        localStorage.removeItem(GUEST_CART_KEY);
        window.dispatchEvent(new Event('cartUpdated'));
    },
};
