/**
 * Servicio para gestionar solicitudes de personalización de productos
 * Almacena las solicitudes en localStorage
 */

const ORDERS_KEY = 'mil_sabores_custom_orders';

/**
 * Obtiene todas las solicitudes de personalización
 */
const getOrders = () => {
    try {
        const orders = localStorage.getItem(ORDERS_KEY);
        return orders ? JSON.parse(orders) : [];
    } catch (error) {
        console.error('Error al obtener solicitudes:', error);
        return [];
    }
};

/**
 * Guarda las solicitudes en localStorage
 */
const saveOrders = (orders) => {
    try {
        localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    } catch (error) {
        console.error('Error al guardar solicitudes:', error);
    }
};

/**
 * Crea una nueva solicitud de personalización
 * @param {Object} orderData - Datos de la solicitud
 * @returns {Object} - { success: boolean, message: string, order?: Object }
 */
const createOrder = (orderData) => {
    try {
        // Validaciones básicas
        if (!orderData.nombre || !orderData.telefono || !orderData.email || !orderData.descripcion) {
            return { success: false, message: 'Todos los campos son obligatorios' };
        }

        if (!orderData.productoCode) {
            return { success: false, message: 'Debe seleccionar un producto' };
        }

        const orders = getOrders();

        // Crear nueva solicitud
        const newOrder = {
            id: Date.now().toString(),
            ...orderData,
            estado: 'pendiente', // pendiente, en_proceso, completado, cancelado
            fechaCreacion: new Date().toISOString(),
            fechaActualizacion: new Date().toISOString()
        };

        orders.push(newOrder);
        saveOrders(orders);

        // Disparar evento de actualización
        window.dispatchEvent(new Event('customOrdersUpdated'));

        return {
            success: true,
            message: 'Solicitud creada exitosamente',
            order: newOrder
        };
    } catch (error) {
        console.error('Error al crear solicitud:', error);
        return { success: false, message: 'Error al crear la solicitud' };
    }
};

/**
 * Obtiene una solicitud por ID
 */
const getOrderById = (id) => {
    const orders = getOrders();
    return orders.find(order => order.id === id);
};

/**
 * Obtiene solicitudes por email
 */
const getOrdersByEmail = (email) => {
    const orders = getOrders();
    return orders.filter(order => order.email === email);
};

/**
 * Actualiza el estado de una solicitud
 */
const updateOrderStatus = (id, newStatus) => {
    try {
        const orders = getOrders();
        const orderIndex = orders.findIndex(order => order.id === id);

        if (orderIndex === -1) {
            return { success: false, message: 'Solicitud no encontrada' };
        }

        orders[orderIndex].estado = newStatus;
        orders[orderIndex].fechaActualizacion = new Date().toISOString();

        saveOrders(orders);
        window.dispatchEvent(new Event('customOrdersUpdated'));

        return { success: true, message: 'Estado actualizado exitosamente' };
    } catch (error) {
        console.error('Error al actualizar estado:', error);
        return { success: false, message: 'Error al actualizar el estado' };
    }
};

/**
 * Elimina una solicitud
 */
const deleteOrder = (id) => {
    try {
        const orders = getOrders();
        const filteredOrders = orders.filter(order => order.id !== id);

        saveOrders(filteredOrders);
        window.dispatchEvent(new Event('customOrdersUpdated'));

        return { success: true, message: 'Solicitud eliminada exitosamente' };
    } catch (error) {
        console.error('Error al eliminar solicitud:', error);
        return { success: false, message: 'Error al eliminar la solicitud' };
    }
};

/**
 * Obtiene el conteo total de solicitudes
 */
const getOrdersCount = () => {
    return getOrders().length;
};

/**
 * Obtiene solicitudes por estado
 */
const getOrdersByStatus = (status) => {
    const orders = getOrders();
    return orders.filter(order => order.estado === status);
};

export const customOrderService = {
    getOrders,
    createOrder,
    getOrderById,
    getOrdersByEmail,
    updateOrderStatus,
    deleteOrder,
    getOrdersCount,
    getOrdersByStatus
};