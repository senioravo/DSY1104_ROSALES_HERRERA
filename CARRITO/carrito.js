/**
 * Shopping Cart Module
 * Manages cart operations using localStorage
 */

const ShoppingCart = {
        // --- CRUD: ADD ---
        /**
         * Add item to cart
         * @param {Object} item - Product object
         * @param {number} qty - Quantity to add
         * @param {Object} opciones - Options like size and message
         */
        add(item, qty, opciones = {}) {
            const cart = this.getCart();
            // Check if item already exists in cart
            const existingIndex = cart.findIndex(cartItem => cartItem.code === item.code);

            if (existingIndex >= 0) {
                // If item exists, update quantity and options
                cart[existingIndex].qty += qty;
                cart[existingIndex].opciones = {...cart[existingIndex].opciones, ...opciones };
            } else {
                // Add new item to cart
                cart.push({
                    code: item.code,
                    name: item.nombre || item.name, // Support both naming conventions
                    priceCLP: item.precioCLP || item.priceCLP, // Support both naming conventions
                    qty: qty,
                    opciones: opciones
                });
            }

            this.saveCart(cart);
            this.updateUI();
        },

        // --- CRUD: UPDATE ---
        /**
         * Update item quantity
         * @param {string} code - Product code
         * @param {number} qty - New quantity
         */
        update(code, qty) {
            const cart = this.getCart();
            const index = cart.findIndex(item => item.code === code);

            if (index >= 0) {
                cart[index].qty = qty;
                // Remove item if quantity is zero or less
                if (qty <= 0) {
                    cart.splice(index, 1);
                }
                this.saveCart(cart);
                this.updateUI();
            }
        },

        // --- CRUD: REMOVE ---
        /**
         * Remove item from cart
         * @param {string} code - Product code
         */
        remove(code) {
            const cart = this.getCart();
            const index = cart.findIndex(item => item.code === code);

            if (index >= 0) {
                cart.splice(index, 1);
                this.saveCart(cart);
                this.updateUI();
            }
        },

        // --- CRUD: CLEAR ---
        /**
         * Clear entire cart
         */
        clear() {
            this.saveCart([]);
            this.updateUI();
        },

        // --- UTIL: GET CART ---
        /**
         * Get cart from localStorage
         * @returns {Array} Cart items
         */
        getCart() {
            const cartJSON = localStorage.getItem('cart');
            return cartJSON ? JSON.parse(cartJSON) : [];
        },

        // --- UTIL: SAVE CART ---
        /**
         * Save cart to localStorage
         * @param {Array} cart - Cart items
         */
        saveCart(cart) {
            localStorage.setItem('cart', JSON.stringify(cart));
        },

        // --- UI: UPDATE BADGE & PAGE ---
        /**
         * Update UI elements (badge and cart page)
         */
        updateUI() {
            // Update cart badge
            const cart = this.getCart();
            const totalItems = cart.reduce((total, item) => total + item.qty, 0);

            const badge = document.getElementById('cart-badge');
            if (badge) {
                badge.textContent = totalItems;
            }

            // Update cart page if we're on it
            if (window.location.pathname.includes('carrito.html')) {
                this.renderCartPage();
            }
        },

        // --- UI: RENDER CART PAGE ---
        /**
         * Render cart items on cart page
         */
        renderCartPage() {
            const cartContainer = document.getElementById('cart-items');
            if (!cartContainer) return;

            const cart = this.getCart();

            if (cart.length === 0) {
                cartContainer.innerHTML = '<p>Tu carrito está vacío</p>';
                return;
            }

            let html = '';
            let total = 0;

            cart.forEach(item => {
                        const itemTotal = item.priceCLP * item.qty;
                        total += itemTotal;

                        html += `
                <div class="cart-item">
                    <div class="item-details">
                        <h3>${item.name}</h3>
                        <p>Código: ${item.code}</p>
                        ${item.opciones.tamano ? `<p>Tamaño: ${item.opciones.tamano}</p>` : ''}
                        ${item.opciones.mensaje ? `<p>Mensaje: ${item.opciones.mensaje}</p>` : ''}
                    </div>
                    <div class="item-price">
                        $${item.priceCLP.toLocaleString('es-CL')}
                    </div>
                    <div class="item-quantity">
                        <button class="qty-btn" onclick="ShoppingCart.update('${item.code}', ${item.qty - 1})">-</button>
                        <span>${item.qty}</span>
                        <button class="qty-btn" onclick="ShoppingCart.update('${item.code}', ${item.qty + 1})">+</button>
                    </div>
                    <div class="item-total">
                        $${itemTotal.toLocaleString('es-CL')}
                    </div>
                    <button class="remove-btn" onclick="ShoppingCart.remove('${item.code}')">✕</button>
                </div>
            `;
        });

        html += `
            <div class="cart-summary">
                <div class="cart-total">
                    <span>Total:</span>
                    <span>$${total.toLocaleString('es-CL')}</span>
                </div>
                <button class="clear-btn" onclick="ShoppingCart.clear()">Vaciar carrito</button>
                <button class="checkout-btn">Proceder al pago</button>
            </div>
        `;

        cartContainer.innerHTML = html;
    },

    // --- INIT: CART ---
    /**
     * Initialize cart
     */
    init() {
        // Initialize cart if it doesn't exist
        if (!localStorage.getItem('cart')) {
            localStorage.setItem('cart', JSON.stringify([]));
        }
        // Update UI based on current cart state
        this.updateUI();
    }
};

// Initialize cart on page load
document.addEventListener('DOMContentLoaded', () => {
    ShoppingCart.init();
});

// Make ShoppingCart accessible globally
window.ShoppingCart = ShoppingCart;

function initializeCart() {
    if (!localStorage.getItem('cart')) {
        localStorage.setItem('cart', JSON.stringify([]));
    }
    updateBadgeCount(); // Add this to update badge on initialization
}

export function addToCart(productCode, quantity = 1) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.code === productCode);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            code: productCode,
            quantity: quantity
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateBadgeCount();
}

function removeFromCart(productId) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    updateBadgeCount();
    return updatedCart;
}

function updateCartItemQuantity(productId, newQuantity) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart.find(item => item.id === productId);
    
    if (item) {
        if (newQuantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = newQuantity;
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    }
    updateBadgeCount();
}

function getCartTotal() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

export function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (!cartItems) return;
    
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Tu carrito está vacío</p>';
        return;
    }

    // ...rest of updateCartDisplay function
}

export function updateBadgeCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badge = document.getElementById('cart-badge');
    if (badge) {
        badge.textContent = totalItems;
    }
}

// Add this debug function
export function getCartContents() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    console.log('Current cart contents:', cart);
    return cart;
}

// Initialize cart when script loads
initializeCart();