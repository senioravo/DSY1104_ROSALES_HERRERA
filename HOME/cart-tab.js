import { PRODUCTS_PS } from './productos_pasteleria.js';
import { updateBadgeCount } from '../CARRITO/carrito.js';

export class CartTab {
    constructor() {
        this.cartTab = document.getElementById('cart-tab');
        this.cartItems = document.getElementById('cart-items');
        this.closeCartBtn = document.getElementById('close-cart');
        this.cartToggleBtn = document.getElementById('cart-toggle');

        this.initializeEventListeners();
        this.updateCartDisplay();
    }

    initializeEventListeners() {
        if (!this.cartToggleBtn || !this.cartTab || !this.closeCartBtn) {
            console.error('Cart elements not found');
            return;
        }

        this.cartToggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.cartTab.classList.add('active');
            this.updateCartDisplay();
        });

        this.closeCartBtn.addEventListener('click', () => {
            this.cartTab.classList.remove('active');
        });

        // Handle quantity changes
        if (this.cartItems) {
            this.cartItems.addEventListener('click', (e) => {
                if (e.target.classList.contains('quantity-btn')) {
                    const code = e.target.dataset.code;
                    const isIncrease = e.target.classList.contains('plus');
                    this.updateQuantity(code, isIncrease);
                }
            });
        }
    }

    updateCartDisplay() {
        if (!this.cartItems) {
            console.error('Cart items container not found');
            return;
        }



        const cartData = this.getCartFromStorage();
        this.cartItems.innerHTML = '';

        // Add profile section first
        const profileSection = document.createElement('div');
        profileSection.className = 'cart-profile-section';
        profileSection.innerHTML = `
            <div class="profile-container">
                <img src="../HOME/assets/default-profile.png" alt="Profile" class="profile-image">
                <div class="profile-buttons">
                    <a href="../LOGIN/login.html" class="profile-btn login-btn">Ir al Login</a>
                    <a href="../REGISTRO/registro.html" class="profile-btn register-btn">Registrarse</a>
                </div>
            </div>
        `;
        this.cartItems.appendChild(profileSection);

        if (!cartData || cartData.length === 0) {
            this.cartItems.innerHTML = '<p class="empty-cart">Tu carrito está vacío</p>';
            return;
        }

        // Create main layout
        const cartLayout = document.createElement('div');
        cartLayout.className = 'cart-layout';

        // Create items container
        const itemsContainer = document.createElement('div');
        itemsContainer.className = 'cart-items-list';

        let total = 0;

        cartData.forEach(item => {
            const product = PRODUCTS_PS.find(p => p.code === item.code);
            if (!product) return;

            const itemSubtotal = product.precioCLP * item.quantity;
            total += itemSubtotal;

            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <img src="../HOME/assets/${product.code}.png" alt="${product.nombre}" class="cart-item-img">
                <div class="cart-item-details">
                    <div class="cart-item-title">${product.nombre}</div>
                    <div class="cart-item-price">${this.formatPrice(product.precioCLP)} × ${item.quantity}</div>
                    <div class="cart-item-subtotal">${this.formatPrice(itemSubtotal)}</div>
                    <div class="quantity-controls">
                        <button class="quantity-btn minus" data-code="${product.code}">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn plus" data-code="${product.code}">+</button>
                    </div>
                </div>
            `;
            itemsContainer.appendChild(itemElement);
        });

        cartLayout.appendChild(itemsContainer);

        // Create footer with total, clear cart and checkout buttons
        const footerContainer = document.createElement('div');
        footerContainer.className = 'cart-footer';
        footerContainer.innerHTML = `
            <div class="cart-actions">
                <div class="cart-total">Total: ${this.formatPrice(total)}</div>
                <button class="clear-cart-btn">Vaciar carrito</button>
            </div>
            <button class="checkout-btn">Ir a Pagar</button>
        `;

        // Add clear cart functionality
        const clearCartBtn = footerContainer.querySelector('.clear-cart-btn');
        clearCartBtn.addEventListener('click', () => this.clearCart());

        // Add checkout functionality (you can add the proper handler later)
        const checkoutBtn = footerContainer.querySelector('.checkout-btn');
        checkoutBtn.addEventListener('click', () => {
            console.log('Proceeding to checkout...');
            // Add checkout logic here
        });

        cartLayout.appendChild(footerContainer);
        this.cartItems.appendChild(cartLayout);
        updateBadgeCount();
    }

    updateQuantity(code, isIncrease) {
        const cart = this.getCartFromStorage();
        const item = cart.find(item => item.code === code);

        if (item) {
            if (isIncrease) {
                item.quantity += 1;
            } else if (item.quantity > 1) {
                item.quantity -= 1;
            } else {
                const index = cart.indexOf(item);
                cart.splice(index, 1);
            }

            this.saveCartToStorage(cart);
            this.updateCartDisplay();
        }
    }

    clearCart() {
        if (confirm('¿Estás seguro que deseas vaciar el carrito?')) {
            localStorage.removeItem('cart');
            this.updateCartDisplay();
            updateBadgeCount();
        }
    }

    getCartFromStorage() {
        const cartData = localStorage.getItem('cart');
        try {
            return cartData ? JSON.parse(cartData) : [];
        } catch (e) {
            console.error('Error parsing cart data:', e);
            return [];
        }
    }

    saveCartToStorage(cart) {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    formatPrice(price) {
        return new Intl.NumberFormat('es-CL', {
            style: 'currency',
            currency: 'CLP'
        }).format(price);
    }
}

// Initialize cart tab when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CartTab();
});