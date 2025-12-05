// orderService.js
// Servicio para manejar las órdenes de compra con API REST

import API_CONFIG from '../config/api.config';

const API_URL = API_CONFIG.VENTAS_SERVICE; // Usa la configuración de entorno (Vercel o local)
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
    // Guardar una nueva orden y procesar pago con Transbank
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

            // 1. Crear venta en backend
            const ventaResponse = await fetch(`${API_URL}/ventas`, {
                method: 'POST',
                headers: {
                    ...API_CONFIG.HEADERS,
                    'Accept': 'application/json'
                },
                body: JSON.stringify(ventaData)
            });

            if (!ventaResponse.ok) {
                const errorText = await ventaResponse.text();
                console.error('Error al crear venta:', errorText);
                throw new Error(`Error ${ventaResponse.status}: ${errorText}`);
            }

            const venta = await ventaResponse.json();
            console.log('Venta creada exitosamente:', venta);

            // 2. Iniciar pago con Transbank
            return await orderService.procesarPagoTransbank(venta.id, orderData);
            
        } catch (error) {
            console.error('Error al guardar orden:', error);
            // Fallback: guardar orden localmente
            console.warn('Guardando orden localmente como fallback');
            return orderService.saveOrderLocally({
                ...orderData,
                backendSync: false,
                error: error.message
            });
        }
    },

    // Procesar pago con Transbank (API real)
    procesarPagoTransbank: async (ventaId, orderData) => {
        try {
            console.log('Procesando pago Transbank para venta:', ventaId);
            
            const response = await fetch(`${API_URL}/ventas/${ventaId}/pagar`, {
                method: 'POST',
                headers: API_CONFIG.HEADERS
            });
            
            if (!response.ok) {
                throw new Error('Error al procesar pago con Transbank');
            }
            
            const transbankResponse = await response.json();
            console.log('Respuesta Transbank:', transbankResponse);
            
            if (transbankResponse.exitoso && transbankResponse.url && transbankResponse.token) {
                // Guardar datos localmente antes de redirigir
                orderService.saveOrderLocally({
                    ...orderData,
                    ventaId: ventaId,
                    transbankToken: transbankResponse.token,
                    backendSync: true
                });
                
                // Retornar datos para redirección a Webpay
                return {
                    success: true,
                    ventaId: ventaId,
                    redirectToWebpay: true,
                    token: transbankResponse.token,
                    url: transbankResponse.url,
                    mensaje: transbankResponse.mensaje
                };
            } else {
                throw new Error(transbankResponse.mensaje || 'Error al iniciar pago');
            }
            
        } catch (error) {
            console.error('Error en procesarPagoTransbank:', error);
            throw error;
        }
    },

    // Redirigir a Webpay con el token
    redirectToWebpay: (token, url) => {
        console.log('Redirigiendo a Webpay:', { token, url });
        
        // Crear formulario HTML para POST a Webpay
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = url;
        
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = 'token_ws';
        input.value = token;
        
        form.appendChild(input);
        document.body.appendChild(form);
        
        // Enviar formulario (redirige a Webpay)
        form.submit();
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