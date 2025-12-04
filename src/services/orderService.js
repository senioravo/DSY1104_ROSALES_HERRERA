// orderService.js
// Servicio para manejar las órdenes de compra con API REST

import API_CONFIG from '../config/api.config';

const API_URL = 'http://localhost:8084/api'; // Puerto 8084 para ventas-service
const ORDERS_KEY = 'mil_sabores_orders';

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

export const orderService = {
    // Guardar una nueva orden (envía al backend de ventas)
    saveOrder: async (orderData) => {
        try {
            const usuarioId = getCurrentUserId();
            
            if (!usuarioId) {
                console.warn('Usuario no autenticado, guardando localmente');
                return orderService.saveOrderLocally(orderData);
            }

            // Preparar detalles con subtotales
            const detalles = orderData.items.map(item => ({
                productoCode: item.productoCode,
                productoNombre: item.productoNombre,
                productoImagen: item.productoImagen || '',
                cantidad: item.cantidad,
                precioUnitario: item.precioCLP,
                subtotal: item.cantidad * item.precioCLP
            }));

            // Calcular totales
            const subtotal = detalles.reduce((sum, detalle) => sum + detalle.subtotal, 0);
            const iva = Math.round(subtotal * 0.19); // 19% IVA
            const total = subtotal + iva;

            // Preparar datos para la API de ventas (formato VentaRequestDTO)
            const ventaData = {
                usuarioId: usuarioId,
                usuarioNombre: orderData.customer.fullName,
                usuarioEmail: orderData.customer.email,
                detalles: detalles,
                subtotal: subtotal,
                iva: iva,
                total: total
            };

            console.log('Enviando venta al backend:', ventaData);
            console.log('URL:', `${API_URL}/ventas`);

            // Enviar al backend con timeout
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 segundos timeout

            const response = await fetch(`${API_URL}/ventas`, {
                method: 'POST',
                headers: {
                    ...API_CONFIG.HEADERS,
                    'Accept': 'application/json'
                },
                body: JSON.stringify(ventaData),
                signal: controller.signal
            });

            clearTimeout(timeoutId);
            console.log('Response status:', response.status);
            console.log('Response ok:', response.ok);

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error response:', errorText);
                throw new Error(`Error ${response.status}: ${errorText}`);
            }

            const venta = await response.json();
            console.log('Venta creada exitosamente:', venta);

            // También guardar localmente como respaldo
            orderService.saveOrderLocally({
                ...orderData,
                ventaId: venta.id,
                backendSync: true
            });

            return venta;
        } catch (error) {
            console.error('Error al guardar orden en backend:', error);
            
            // Si falla el backend, guardar localmente
            console.warn('Guardando orden localmente como fallback');
            return orderService.saveOrderLocally({
                ...orderData,
                backendSync: false,
                error: error.message
            });
        }
    },

    // Guardar orden localmente (backup)
    saveOrderLocally: (orderData) => {
        try {
            const orders = orderService.getOrdersLocally();

            // Crear orden con ID único y timestamp
            const newOrder = {
                id: `ORD-${Date.now()}`,
                ...orderData,
                createdAt: new Date().toISOString(),
                status: 'pending'
            };

            orders.push(newOrder);
            localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));

            return newOrder;
        } catch (error) {
            console.error('Error al guardar orden localmente:', error);
            throw error;
        }
    },

    // Obtener todas las órdenes locales
    getOrdersLocally: () => {
        try {
            const orders = localStorage.getItem(ORDERS_KEY);
            return orders ? JSON.parse(orders) : [];
        } catch (error) {
            console.error('Error al obtener órdenes locales:', error);
            return [];
        }
    },

    // Obtener todas las órdenes (del backend si está disponible)
    getOrders: async () => {
        try {
            const usuarioId = getCurrentUserId();
            
            if (!usuarioId) {
                console.warn('Usuario no autenticado, obteniendo órdenes locales');
                return orderService.getOrdersLocally();
            }

            const response = await fetch(`${API_URL}/ventas/usuario/${usuarioId}`, {
                headers: API_CONFIG.HEADERS
            });

            if (!response.ok) {
                throw new Error('Error al obtener ventas');
            }

            const ventas = await response.json();
            return ventas;
        } catch (error) {
            console.error('Error al obtener órdenes del backend:', error);
            // Fallback a local
            return orderService.getOrdersLocally();
        }
    },

    // Obtener orden por ID
    getOrderById: async (orderId) => {
        try {
            const response = await fetch(`${API_URL}/ventas/${orderId}`, {
                headers: API_CONFIG.HEADERS
            });

            if (!response.ok) {
                throw new Error('Venta no encontrada');
            }

            const venta = await response.json();
            return venta;
        } catch (error) {
            console.error('Error al obtener orden:', error);
            // Fallback a local
            const orders = orderService.getOrdersLocally();
            return orders.find(order => order.id === orderId);
        }
    },

    // Actualizar estado de orden
    updateOrderStatus: async (orderId, status) => {
        try {
            const response = await fetch(`${API_URL}/ventas/${orderId}/estado?estado=${status}`, {
                method: 'PATCH',
                headers: API_CONFIG.HEADERS
            });

            if (!response.ok) {
                throw new Error('Error al actualizar estado');
            }

            const venta = await response.json();
            return venta;
        } catch (error) {
            console.error('Error al actualizar orden:', error);
            // Fallback a local
            const orders = orderService.getOrdersLocally();
            const orderIndex = orders.findIndex(order => order.id === orderId);

            if (orderIndex > -1) {
                orders[orderIndex].status = status;
                orders[orderIndex].updatedAt = new Date().toISOString();
                localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
                return orders[orderIndex];
            }

            return null;
        }
    }
};