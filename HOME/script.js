import { ProductUtils } from './product_utils.js';
import { PRODUCTS_PS } from './productos_pasteleria.js';
import { CATEGORIES_PS } from './categorias_pasteleria.js';
import { addToCart, updateBadgeCount } from '../CARRITO/carrito.js';

// Featured products array
const FEATURED_PRODUCTS = ['TC001', 'TC002', 'PI001'];

// Check import paths are correct
console.log('Imports loaded:');
console.log('ProductUtils:', !!ProductUtils);
console.log('PRODUCTS_PS:', !!PRODUCTS_PS);
console.log('CATEGORIES_PS:', !!CATEGORIES_PS);

// Single DOMContentLoaded event listener for all initializations
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded triggered');

    // Debug check for grid containers
    const categoriesGrid = document.getElementById('categories-grid');
    const highlightsGrid = document.getElementById('highlights-grid');

    console.log('Categories grid found:', !!categoriesGrid);
    console.log('Highlights grid found:', !!highlightsGrid);

    // Debug check for data
    console.log('CATEGORIES_PS:', CATEGORIES_PS);
    console.log('PRODUCTS_PS:', PRODUCTS_PS);
    console.log('FEATURED_PRODUCTS:', FEATURED_PRODUCTS);

    // Initialize sections
    renderCategories();
    renderHighlights();
});



// Helper function for price formatting
function formatPrice(price) {
    return new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP'
    }).format(price);
}

function renderHighlights() {
    console.log('Rendering highlights...');
    const highlightsGrid = document.getElementById('highlights-grid');
    if (!highlightsGrid) {
        console.error('Highlights grid not found');
        return;
    }

    highlightsGrid.innerHTML = '';

    FEATURED_PRODUCTS.forEach(code => {
        const product = PRODUCTS_PS.find(p => p.code === code);
        if (!product) return;

        const card = document.createElement('div');
        card.className = 'highlight-card';

        card.innerHTML = `
            <div class="highlight-image-container">
                <img src="assets/${product.code}.png" alt="${product.nombre}" class="highlight-image">
            </div>
            <div class="highlight-content">
                <h3 class="highlight-title">${product.nombre}</h3>
                <p class="highlight-description">${product.descripcion}</p>
                <div class="highlight-price">
                    ${formatPrice(product.precioCLP)}
                </div>
                <div class="highlight-controls">
                    <div class="quantity-controls">
                        <button class="qty-btn minus" data-action="decrement">-</button>
                        <span class="highlight-qty">1</span>
                        <button class="qty-btn plus" data-action="increment">+</button>
                    </div>
                    <button class="add-to-cart-btn" data-product-code="${product.code}">
                        Agregar al Carrito
                    </button>
                </div>
            </div>
        `;

        highlightsGrid.appendChild(card);
    });
}

function renderCategories() {
    console.log('Rendering categories...');
    const categoriesGrid = document.getElementById('categories-grid');
    if (!categoriesGrid) {
        console.error('Categories grid not found');
        return;
    }

    categoriesGrid.innerHTML = '';

    CATEGORIES_PS.forEach(category => {
        const tile = document.createElement('a');
        tile.href = `#${category.id}`;
        tile.className = 'tile';
        tile.dataset.category = category.id;

        tile.innerHTML = `
            <img src="assets/categories/${category.id}.png" 
                alt="${category.nombre}" 
                class="tile-image">
            <span class="tile-text">${category.nombre}</span>
            <p class="tile-description">${category.descripcion}</p>
        `;
        categoriesGrid.appendChild(tile);
    });

    initializeCategoryAnimations();
}

function initializeCategoryAnimations() {
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

// Add event delegation for quantity controls and add to cart
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('qty-btn')) {
        const card = e.target.closest('.highlight-card');
        if (!card) return;

        const quantityDisplay = card.querySelector('.highlight-qty');
        let quantity = parseInt(quantityDisplay.textContent);

        if (e.target.dataset.action === 'increment') {
            quantity++;
        } else if (e.target.dataset.action === 'decrement' && quantity > 1) {
            quantity--;
        }

        quantityDisplay.textContent = quantity;
    }

    if (e.target.classList.contains('add-to-cart-btn')) {
        const card = e.target.closest('.highlight-card');
        if (!card) return;

        const productCode = e.target.dataset.productCode;
        const quantity = parseInt(card.querySelector('.highlight-qty').textContent);

        addToCart(productCode, quantity);
        updateBadgeCount();
    }
});