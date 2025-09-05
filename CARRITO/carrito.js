/**
 * Shopping Cart Module
 * Manages cart operations using localStorage
 */

const ShoppingCart = {
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

        /**
         * Clear entire cart
         */
        clear() {
            this.saveCart([]);
            this.updateUI();
        },

        /**
         * Get cart from localStorage
         * @returns {Array} Cart items
         */
        getCart() {
            const cartJSON = localStorage.getItem('cart');
            return cartJSON ? JSON.parse(cartJSON) : [];
        },

        /**
         * Save cart to localStorage
         * @param {Array} cart - Cart items
         */
        saveCart(cart) {
            localStorage.setItem('cart', JSON.stringify(cart));
        },

        /**
         * Update UI elements
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