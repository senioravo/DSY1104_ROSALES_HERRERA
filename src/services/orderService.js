// orderService.js
// Servicio para manejar las órdenes de compra

const ORDERS_KEY = 'mil_sabores_orders';

export const orderService = {
    // Obtener todas las órdenes
    getOrders: () => {
        try {
            const orders = localStorage.getItem(ORDERS_KEY);
            return orders ? JSON.parse(orders) : [];
        } catch (error) {
            console.error('Error al obtener órdenes:', error);
            return [];
        }
    },

    // Guardar una nueva orden
    saveOrder: (orderData) => {
        try {
            const orders = orderService.getOrders();

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
            console.error('Error al guardar orden:', error);
            throw error;
        }
    },

    // Obtener orden por ID
    getOrderById: (orderId) => {
        const orders = orderService.getOrders();
        return orders.find(order => order.id === orderId);
    },

    // Actualizar estado de orden
    updateOrderStatus: (orderId, status) => {
        try {
            const orders = orderService.getOrders();
            const orderIndex = orders.findIndex(order => order.id === orderId);

            if (orderIndex > -1) {
                orders[orderIndex].status = status;
                orders[orderIndex].updatedAt = new Date().toISOString();
                localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
                return orders[orderIndex];
            }

            return null;
        } catch (error) {
            console.error('Error al actualizar orden:', error);
            throw error;
        }
    }
};