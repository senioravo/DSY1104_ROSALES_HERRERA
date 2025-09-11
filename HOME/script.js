import { ProductUtils } from './product_utils.js';
import { PRODUCTS_PS } from './productos_pasteleria.js';
import { CATEGORIES_PS } from './categorias_pasteleria.js';

/**
 * Main application script
 */
document.addEventListener('DOMContentLoaded', () => {
    // Cart functionality
    const cartTab = document.getElementById('cart-tab');
    const cartToggle = document.getElementById('cart-toggle');
    const closeCart = document.getElementById('close-cart');

    if (cartToggle && cartTab && closeCart) {
        cartToggle.addEventListener('click', (e) => {
            e.preventDefault();
            cartTab.classList.add('active');
            updateCartDisplay();
        });

        closeCart.addEventListener('click', () => {
            cartTab.classList.remove('active');
        });

        // Close cart when clicking outside
        document.addEventListener('click', (e) => {
            if (cartTab.classList.contains('active') &&
                !cartTab.contains(e.target) &&
                !cartToggle.contains(e.target)) {
                cartTab.classList.remove('active');
            }
        });
    }

    // Initialize other components
    renderHighlights();
    renderCategories();
});

// Featured products array
const FEATURED_PRODUCTS = ['TC001', 'TC002', 'PI001'];

function renderHighlights() {
    const highlightsGrid = document.getElementById('highlights-grid');
    if (!highlightsGrid) {
        console.error('Highlights grid not found');
        return;
    }

    highlightsGrid.innerHTML = '';

    FEATURED_PRODUCTS.forEach(code => {
        const product = PRODUCTS_PS.find(p => p.code === code);
        if (!product) {
            console.error(`Product ${code} not found`);
            return;
        }

        const card = document.createElement('div');
        card.className = 'highlight-card';

        // Update image path to match your folder structure
        const imagePath = `./assets/${product.code}.png`;

        card.innerHTML = `
            <div class="highlight-image-container">
                <img src="${imagePath}" alt="${product.nombre}" class="highlight-image">
            </div>
            <div class="highlight-content">
                <h3 class="highlight-title">${product.nombre}</h3>
                <p class="highlight-description">${product.descripcion}</p>
                <div class="highlight-price">
                    ${new Intl.NumberFormat('es-CL', {
                        style: 'currency',
                        currency: 'CLP'
                    }).format(product.precioCLP)}
                </div>
                <button class="add-to-cart-btn" data-product-code="${product.code}">
                    Agregar al Carrito
                </button>
            </div>
        `;

        highlightsGrid.appendChild(card);
    });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing highlights...');
    renderHighlights();
});

/**
 * Add animation to category tiles
 */
function animateCategoryTiles() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('reveal');
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });

    // Observe all category tiles
    document.querySelectorAll('.tile').forEach(tile => {
        observer.observe(tile);
    });
}

// Cart Tab Functionality
document.addEventListener('DOMContentLoaded', function() {
    const cartTab = document.getElementById('cart-tab');
    const cartToggle = document.getElementById('cart-toggle');
    const closeCart = document.getElementById('close-cart');
    const cartItems = document.getElementById('cart-items');

    // Debug cart contents when page loads
    console.log('Initial cart check:', getCartContents());

    cartToggle.addEventListener('click', (e) => {
        e.preventDefault();
        cartTab.classList.add('active');
        updateCartDisplay();
    });

    closeCart.addEventListener('click', () => {
        cartTab.classList.remove('active');
        document.body.classList.remove('cart-active');
    });

    function updateCartDisplay() {
        const cart = getCartContents();
        cartItems.innerHTML = '';

        if (cart.length === 0) {
            cartItems.innerHTML = '<p class="empty-cart">Tu carrito está vacío</p>';
            return;
        }

        cart.forEach(item => {
            // Construct image path based on product ID
            const imagePath = `./imgs/${item.id}.png`;

            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <img src="${imagePath}" 
                     alt="${item.name}" 
                     class="cart-item-img"/>
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">$${(item.price || 0).toFixed(2)}</div>
                </div>
                <div class="quantity-controls">
                    <button class="quantity-btn minus" data-id="${item.id}">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn plus" data-id="${item.id}">+</button>
                </div>
            `;
            cartItems.appendChild(itemElement);
        });

        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        document.getElementById('cart-total-amount').textContent = `$${total.toFixed(2)}`;
    }

    // Handle quantity changes in cart tab
    document.getElementById('cart-items').addEventListener('click', (e) => {
        if (e.target.classList.contains('quantity-btn')) {
            const productId = e.target.dataset.id;
            const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
            const item = currentCart.find(item => item.id === productId);

            if (item) {
                const newQuantity = e.target.classList.contains('plus') ?
                    item.quantity + 1 :
                    item.quantity - 1;

                updateCartItemQuantity(productId, newQuantity);
                updateCartDisplay();
            }
        }
    });

    // Update cart display when tab is opened
    document.getElementById('cart-toggle').addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('cart-tab').classList.add('active');
        updateCartDisplay();
    });
});

// Add event delegation for quantity controls
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('qty-btn')) {
        const card = e.target.closest('.product-card');
        const qtySpan = card.querySelector('.highlight-qty');
        let qty = parseInt(qtySpan.textContent);

        if (e.target.dataset.action === 'increment') {
            qty++;
        } else if (e.target.dataset.action === 'decrement' && qty > 1) {
            qty--;
        }
        qtySpan.textContent = qty;
    }

    if (e.target.classList.contains('add-to-cart')) {
        const card = e.target.closest('.product-card');
        const qty = parseInt(card.querySelector('.highlight-qty').textContent);
        const productCode = e.target.dataset.productCode;
        const product = ProductUtils.getProductByCode(productCode);

        if (product) {
            addToCart({
                code: product.code,
                name: product.nombre,
                price: product.precioCLP,
                image: product.imagen,
                quantity: qty
            });
        }
    }
});

// Add this function to render categories
function renderCategories() {
    const categoriesGrid = document.getElementById('categories-grid');
    if (!categoriesGrid) return;

    categoriesGrid.innerHTML = '';

    CATEGORIES_PS.forEach(category => {
        const tile = document.createElement('a');
        tile.href = `#${category.id}`;
        tile.className = 'tile';
        tile.dataset.category = category.id;

        // Convert category ID to image filename
        const imageFilename = category.id.toLowerCase().replace(/[^a-z]/g, '_');

        tile.innerHTML = `
            <img src="assets/categories/${imageFilename}.png" 
                alt="${category.nombre}" 
                class="tile-image">
            <span class="tile-text">${category.nombre}</span>
            <p class="tile-description">${category.descripcion}</p>
        `;
        categoriesGrid.appendChild(tile);
    });

    // Observe tiles for animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('reveal');
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.tile').forEach(tile => {
        observer.observe(tile);
    });
}