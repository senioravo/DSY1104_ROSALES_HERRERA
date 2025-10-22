// cartService.js
// Servicio para manejar el carrito de compras con localStorage

const CART_KEY = 'mil_sabores_cart';

export const cartService = {
    // Obtener el carrito del localStorage
    getCart: () => {
        try {
            const cart = localStorage.getItem(CART_KEY);
            return cart ? JSON.parse(cart) : [];
        } catch (error) {
            console.error('Error al obtener el carrito:', error);
            return [];
        }
    },

    // Guardar el carrito en localStorage
    saveCart: (cart) => {
        try {
            localStorage.setItem(CART_KEY, JSON.stringify(cart));
            // Disparar evento personalizado para notificar cambios
            window.dispatchEvent(new Event('cartUpdated'));
        } catch (error) {
            console.error('Error al guardar el carrito:', error);
        }
    },

    // Agregar producto al carrito
    addToCart: (product, quantity = 1) => {
        const cart = cartService.getCart();
        const existingItemIndex = cart.findIndex(item => item.code === product.code);

        if (existingItemIndex > -1) {
            // Si el producto ya existe, actualizar la cantidad
            cart[existingItemIndex].quantity += quantity;
        } else {
            // Si es nuevo, agregarlo
            cart.push({
                code: product.code,
                nombre: product.nombre,
                precioCLP: product.precioCLP,
                imagen: product.imagen,
                quantity: quantity,
                stock: product.stock
            });
        }

        cartService.saveCart(cart);
        return cart;
    },

    // Actualizar cantidad de un producto
    updateQuantity: (productCode, quantity) => {
        const cart = cartService.getCart();
        const itemIndex = cart.findIndex(item => item.code === productCode);

        if (itemIndex > -1) {
            if (quantity <= 0) {
                // Si la cantidad es 0 o menos, eliminar el producto
                cart.splice(itemIndex, 1);
            } else {
                cart[itemIndex].quantity = quantity;
            }
        }

        cartService.saveCart(cart);
        return cart;
    },

    // Eliminar producto del carrito
    removeFromCart: (productCode) => {
        let cart = cartService.getCart();
        cart = cart.filter(item => item.code !== productCode);
        cartService.saveCart(cart);
        return cart;
    },

    // Limpiar todo el carrito
    clearCart: () => {
        localStorage.removeItem(CART_KEY);
        window.dispatchEvent(new Event('cartUpdated'));
    },

    // Obtener total del carrito
    getCartTotal: () => {
        const cart = cartService.getCart();
        return cart.reduce((total, item) => total + (item.precioCLP * item.quantity), 0);
    },

    // Obtener cantidad total de items
    getCartItemCount: () => {
        const cart = cartService.getCart();
        return cart.reduce((total, item) => total + item.quantity, 0);
    }
};