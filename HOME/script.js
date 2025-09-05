/**
 * Main application script
 */
document.addEventListener('DOMContentLoaded', () => {
    // Check if ShoppingCart is available
    if (typeof ShoppingCart !== 'undefined') {
        // Initialize cart with existing data
        ShoppingCart.init();
    } else {
        console.error('ShoppingCart module not found');
    }

    // Animate category tiles that already exist in HTML
    const categoriesGrid = document.querySelector('.categories-grid');
    if (categoriesGrid) {
        animateCategoryTiles();
    }

    // Destacados: manejo de cantidad y agregar al carrito
    document.querySelectorAll('.highlight-card').forEach(card => {
        const qtySpan = card.querySelector('.highlight-qty');
        let qty = 1;

        card.querySelectorAll('.qty-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                if (btn.dataset.action === 'increment') {
                    qty++;
                } else if (btn.dataset.action === 'decrement' && qty > 1) {
                    qty--;
                }
                qtySpan.textContent = qty;
            });
        });

        card.querySelector('.add-cart-btn').addEventListener('click', () => {
            const item = {
                code: card.dataset.code,
                name: card.dataset.name,
                priceCLP: parseInt(card.dataset.price, 10),
                opciones: {}
            };
            ShoppingCart.add(item, qty, {});
            qty = 1;
            qtySpan.textContent = qty;
        });
    });
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
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    // Observe all tiles
    const tiles = document.querySelectorAll('.tile');
    tiles.forEach(tile => {
        observer.observe(tile);

        // Add keyboard accessibility
        tile.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                window.location.href = this.href;
            }
        });
    });
}